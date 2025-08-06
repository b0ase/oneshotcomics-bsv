#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// API Configuration
const API_KEYS = {
  AIML: '4eb9b8daee9d4fa28c726860c37f86a1',
  STABILITY_AI: 'sk-CD8RJ7DR7WyaAIBkT4knZGQ8kjOlAv92ZmBgAeZmhQ8elRGG',
  GOOGLE_AI_STUDIO: 'AIzaSyCRYIAbeNx0pkqU-HSsv6-aj6vX9PiqOFY'
};

// Character directories structure
const CHARACTER_DIRS = [
  'character-images/cypherpunk-chronicles',
  'character-images/mystic-realms', 
  'character-images/quantum-paradox',
  'character-images/street-justice',
  'character-images/ninja-punk-girls'
];

// Expected image files for each character
const EXPECTED_IMAGES = {
  'main': ['{character}-main.jpg'],
  'pose-1': ['{character}-pose-1-main.jpg', '{character}-pose-1-variant-1.jpg', '{character}-pose-1-variant-2.jpg', '{character}-pose-1-variant-3.jpg', '{character}-pose-1-variant-4.jpg'],
  'pose-2': ['{character}-pose-2-main.jpg', '{character}-pose-2-variant-1.jpg', '{character}-pose-2-variant-2.jpg'],
  'pose-3': ['{character}-pose-3-main.jpg', '{character}-pose-3-variant-1.jpg', '{character}-pose-3-variant-2.jpg'],
  'variants': ['{character}-variant-1.jpg', '{character}-variant-2.jpg']
};

// Function to read prompt file
function readPromptFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8').trim();
  } catch (error) {
    console.error(`Error reading prompt file ${filePath}:`, error.message);
    return null;
  }
}

// Function to check if image exists
function imageExists(imagePath) {
  return fs.existsSync(imagePath);
}

// Function to generate API call for AIML
function generateAIMLAPICall(prompt, outputPath, characterName) {
  return `curl -X POST "https://api.aiml.com/v1/images/generations" \\
  -H "Authorization: Bearer ${API_KEYS.AIML}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "${prompt.replace(/"/g, '\\"')}",
    "n": 1,
    "size": "1024x1024",
    "response_format": "url"
  }' \\
  -o "${outputPath}.json" \\
  && curl -o "${outputPath}" \$(cat "${outputPath}.json" | jq -r '.data[0].url') \\
  && rm "${outputPath}.json"`;
}

// Function to generate API call for Stability AI
function generateStabilityAIAPICall(prompt, outputPath, characterName) {
  return `curl -X POST "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image" \\
  -H "Authorization: Bearer ${API_KEYS.STABILITY_AI}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text_prompts": [
      {
        "text": "${prompt.replace(/"/g, '\\"')}",
        "weight": 1
      }
    ],
    "cfg_scale": 7,
    "height": 1024,
    "width": 1024,
    "samples": 1,
    "steps": 30
  }' \\
  -o "${outputPath}.json" \\
  && curl -o "${outputPath}" \$(cat "${outputPath}.json" | jq -r '.artifacts[0].base64' | base64 -d) \\
  && rm "${outputPath}.json"`;
}

// Function to generate API call for Google AI Studio
function generateGoogleAIStudioAPICall(prompt, outputPath, characterName) {
  return `curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0:generateContent?key=${API_KEYS.GOOGLE_AI_STUDIO}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "${prompt.replace(/"/g, '\\"')}"
          }
        ]
      }
    ],
    "generationConfig": {
      "temperature": 0.4,
      "topK": 32,
      "topP": 1,
      "maxOutputTokens": 2048
    }
  }' \\
  -o "${outputPath}.json" \\
  && curl -o "${outputPath}" \$(cat "${outputPath}.json" | jq -r '.candidates[0].content.parts[0].inlineData.data' | base64 -d) \\
  && rm "${outputPath}.json"`;
}

// Function to scan for missing images
function scanForMissingImages() {
  const missingImages = [];
  
  CHARACTER_DIRS.forEach(seriesDir => {
    if (!fs.existsSync(seriesDir)) return;
    
    const characters = fs.readdirSync(seriesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    characters.forEach(character => {
      const characterDir = path.join(seriesDir, character);
      
      // Check main image
      const mainImagePath = path.join(characterDir, `${character}-main.jpg`);
      if (!imageExists(mainImagePath)) {
        const imagePromptPath = path.join(characterDir, 'image-prompt.txt');
        const prompt = readPromptFile(imagePromptPath);
        if (prompt) {
          missingImages.push({
            type: 'main',
            character,
            series: path.basename(seriesDir),
            prompt,
            outputPath: mainImagePath,
            promptPath: imagePromptPath
          });
        }
      }
      
      // Check pose directories
      ['pose-1', 'pose-2', 'pose-3'].forEach(poseDir => {
        const posePath = path.join(characterDir, poseDir);
        if (fs.existsSync(posePath)) {
          const actionPromptPath = path.join(posePath, 'action-prompt.txt');
          const actionPrompt = readPromptFile(actionPromptPath);
          
          EXPECTED_IMAGES[poseDir].forEach(imageTemplate => {
            const imageName = imageTemplate.replace('{character}', character);
            const imagePath = path.join(posePath, imageName);
            
            if (!imageExists(imagePath)) {
              // Combine character prompt with action prompt
              const imagePromptPath = path.join(characterDir, 'image-prompt.txt');
              const characterPrompt = readPromptFile(imagePromptPath);
              
              if (characterPrompt && actionPrompt) {
                const combinedPrompt = `${characterPrompt}. ${actionPrompt}`;
                missingImages.push({
                  type: poseDir,
                  character,
                  series: path.basename(seriesDir),
                  prompt: combinedPrompt,
                  outputPath: imagePath,
                  promptPath: actionPromptPath
                });
              }
            }
          });
        }
      });
      
      // Check variant images
      EXPECTED_IMAGES.variants.forEach(variantTemplate => {
        const imageName = variantTemplate.replace('{character}', character);
        const imagePath = path.join(characterDir, imageName);
        
        if (!imageExists(imagePath)) {
          const imagePromptPath = path.join(characterDir, 'image-prompt.txt');
          const prompt = readPromptFile(imagePromptPath);
          if (prompt) {
            missingImages.push({
              type: 'variant',
              character,
              series: path.basename(seriesDir),
              prompt,
              outputPath: imagePath,
              promptPath: imagePromptPath
            });
          }
        }
      });
    });
  });
  
  return missingImages;
}

// Function to generate shell script
function generateShellScript(missingImages) {
  let script = `#!/bin/bash

# One-Shot Comics Image Generation Script
# Generated on: ${new Date().toISOString()}
# Total images to generate: ${missingImages.length}

echo "Starting image generation for ${missingImages.length} missing images..."

# Create backup directory
mkdir -p image-generation-backup

# Function to generate image with fallback APIs
generate_image() {
    local prompt="\$1"
    local output_path="\$2"
    local character_name="\$3"
    
    echo "Generating image for \$character_name..."
    
    # Try AIML API first
    echo "Trying AIML API..."
    ${generateAIMLAPICall('${prompt}', '${outputPath}', '${characterName}')}
    
    if [ \$? -eq 0 ] && [ -f "\$output_path" ]; then
        echo "✓ Successfully generated with AIML API"
        return 0
    fi
    
    # Try Stability AI as backup
    echo "Trying Stability AI API..."
    ${generateStabilityAIAPICall('${prompt}', '${outputPath}', '${characterName}')}
    
    if [ \$? -eq 0 ] && [ -f "\$output_path" ]; then
        echo "✓ Successfully generated with Stability AI API"
        return 0
    fi
    
    # Try Google AI Studio as final backup
    echo "Trying Google AI Studio API..."
    ${generateGoogleAIStudioAPICall('${prompt}', '${outputPath}', '${characterName}')}
    
    if [ \$? -eq 0 ] && [ -f "\$output_path" ]; then
        echo "✓ Successfully generated with Google AI Studio API"
        return 0
    fi
    
    echo "✗ Failed to generate image with all APIs"
    return 1
}

`;

  // Add individual image generation calls
  missingImages.forEach((image, index) => {
    script += `
# Image ${index + 1}: ${image.character} - ${image.type}
generate_image "${image.prompt.replace(/"/g, '\\"')}" "${image.outputPath}" "${image.character}"
if [ \$? -eq 0 ]; then
    echo "✓ Generated: ${image.outputPath}"
else
    echo "✗ Failed: ${image.outputPath}"
    echo "${image.prompt}" > "image-generation-backup/failed-${image.character}-${image.type}.txt"
fi
`;
  });

  script += `
echo "Image generation complete!"
echo "Check image-generation-backup/ for any failed prompts"
`;

  return script;
}

// Function to generate individual API calls
function generateIndividualAPICalls(missingImages) {
  const calls = [];
  
  missingImages.forEach((image, index) => {
    calls.push({
      index: index + 1,
      character: image.character,
      type: image.type,
      series: image.series,
      outputPath: image.outputPath,
      aimlCall: generateAIMLAPICall(image.prompt, image.outputPath, image.character),
      stabilityCall: generateStabilityAIAPICall(image.prompt, image.outputPath, image.character),
      googleCall: generateGoogleAIStudioAPICall(image.prompt, image.outputPath, image.character)
    });
  });
  
  return calls;
}

// Main execution
console.log('🔍 Scanning for missing images...');
const missingImages = scanForMissingImages();

console.log(`\n📊 Found ${missingImages.length} missing images:`);
missingImages.forEach((image, index) => {
  console.log(`${index + 1}. ${image.series}/${image.character} - ${image.type}`);
});

if (missingImages.length === 0) {
  console.log('\n✅ All images are present! No generation needed.');
  process.exit(0);
}

// Generate shell script
const shellScript = generateShellScript(missingImages);
fs.writeFileSync('generate-images.sh', shellScript);
fs.chmodSync('generate-images.sh', '755');

// Generate individual API calls file
const apiCalls = generateIndividualAPICalls(missingImages);
const apiCallsContent = apiCalls.map(call => `
# ${call.index}. ${call.character} - ${call.type} (${call.series})
# Output: ${call.outputPath}

# AIML API Call:
${call.aimlCall}

# Stability AI API Call (backup):
${call.stabilityCall}

# Google AI Studio API Call (backup):
${call.googleCall}

`).join('\n');

fs.writeFileSync('individual-api-calls.txt', apiCallsContent);

// Generate summary report
const summary = `
# One-Shot Comics Image Generation Report
Generated: ${new Date().toISOString()}

## Summary
- Total missing images: ${missingImages.length}
- Series affected: ${[...new Set(missingImages.map(img => img.series))].join(', ')}
- Characters affected: ${[...new Set(missingImages.map(img => img.character))].join(', ')}

## Missing Images by Series
${Object.entries(missingImages.reduce((acc, img) => {
  acc[img.series] = (acc[img.series] || 0) + 1;
  return acc;
}, {})).map(([series, count]) => `- ${series}: ${count} images`).join('\n')}

## Missing Images by Type
${Object.entries(missingImages.reduce((acc, img) => {
  acc[img.type] = (acc[img.type] || 0) + 1;
  return acc;
}, {})).map(([type, count]) => `- ${type}: ${count} images`).join('\n')}

## Files Generated
1. generate-images.sh - Complete automation script
2. individual-api-calls.txt - Individual API calls for manual execution

## Next Steps
1. Run: ./generate-images.sh
2. Or execute individual calls from individual-api-calls.txt
3. Check image-generation-backup/ for any failed prompts
`;

fs.writeFileSync('image-generation-report.md', summary);

// Save missing images data for the execution script
fs.writeFileSync('missing-images-data.json', JSON.stringify(missingImages, null, 2));

console.log('\n📝 Generated files:');
console.log('1. generate-images.sh - Complete automation script');
console.log('2. individual-api-calls.txt - Individual API calls');
console.log('3. image-generation-report.md - Summary report');
console.log('4. missing-images-data.json - Data for execution script');

console.log('\n🚀 To generate all images, run:');
console.log('./generate-images.sh');

console.log('\n📋 Or execute individual calls from:');
console.log('individual-api-calls.txt'); 