#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// API Configuration
const API_KEYS = {
  AIML: '4eb9b8daee9d4fa28c726860c37f86a1',
  STABILITY_AI: 'sk-CD8RJ7DR7WyaAIBkT4knZGQ8kjOlAv92ZmBgAeZmhQ8elRGG',
  GOOGLE_AI_STUDIO: 'AIzaSyCRYIAbeNx0pkqU-HSsv6-aj6vX9PiqOFY'
};

// Function to make API call to AIML
async function callAIMLAPI(prompt, outputPath) {
  try {
    console.log(`🔄 Calling AIML API for: ${path.basename(outputPath)}`);
    
    const response = await fetch('https://api.aiml.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEYS.AIML}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'url'
      })
    });

    if (!response.ok) {
      throw new Error(`AIML API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;
    
    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Save the image
    fs.writeFileSync(outputPath, Buffer.from(imageBuffer));
    console.log(`✅ AIML API success: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ AIML API failed: ${error.message}`);
    return false;
  }
}

// Function to make API call to Stability AI
async function callStabilityAIAPI(prompt, outputPath) {
  try {
    console.log(`🔄 Calling Stability AI API for: ${path.basename(outputPath)}`);
    
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEYS.STABILITY_AI}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30
      })
    });

    if (!response.ok) {
      throw new Error(`Stability AI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const imageData = data.artifacts[0].base64;
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Save the image
    fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
    console.log(`✅ Stability AI API success: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Stability AI API failed: ${error.message}`);
    return false;
  }
}

// Function to make API call to Google AI Studio
async function callGoogleAIStudioAPI(prompt, outputPath) {
  try {
    console.log(`🔄 Calling Google AI Studio API for: ${path.basename(outputPath)}`);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0:generateContent?key=${API_KEYS.GOOGLE_AI_STUDIO}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Google AI Studio API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const imageData = data.candidates[0].content.parts[0].inlineData.data;
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Save the image
    fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
    console.log(`✅ Google AI Studio API success: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Google AI Studio API failed: ${error.message}`);
    return false;
  }
}

// Function to generate image with fallback APIs
async function generateImage(prompt, outputPath, characterName) {
  console.log(`\n🎨 Generating image for ${characterName}...`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);
  console.log(`📁 Output: ${outputPath}`);
  
  // Try AIML API first
  let success = await callAIMLAPI(prompt, outputPath);
  if (success) return true;
  
  // Try Stability AI as backup
  success = await callStabilityAIAPI(prompt, outputPath);
  if (success) return true;
  
  // Try Google AI Studio as final backup
  success = await callGoogleAIStudioAPI(prompt, outputPath);
  if (success) return true;
  
  console.error(`❌ Failed to generate image for ${characterName} with all APIs`);
  return false;
}

// Function to read missing images from the report
function readMissingImages() {
  try {
    const missingImagesData = fs.readFileSync('missing-images-data.json', 'utf8');
    return JSON.parse(missingImagesData);
  } catch (error) {
    console.error('Error reading missing images data:', error.message);
    return [];
  }
}

// Main execution function
async function main() {
  console.log('🚀 Starting One-Shot Comics Image Generation...');
  
  // Create backup directory
  if (!fs.existsSync('image-generation-backup')) {
    fs.mkdirSync('image-generation-backup');
  }
  
  // Read missing images
  const missingImages = readMissingImages();
  
  if (missingImages.length === 0) {
    console.log('❌ No missing images data found. Run generate-missing-images.js first.');
    return;
  }
  
  console.log(`📊 Found ${missingImages.length} missing images to generate`);
  
  let successCount = 0;
  let failureCount = 0;
  
  // Process images in batches to avoid overwhelming the APIs
  const batchSize = 5;
  for (let i = 0; i < missingImages.length; i += batchSize) {
    const batch = missingImages.slice(i, i + batchSize);
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(missingImages.length / batchSize)}`);
    
    for (const image of batch) {
      const success = await generateImage(image.prompt, image.outputPath, image.character);
      
      if (success) {
        successCount++;
      } else {
        failureCount++;
        // Save failed prompt for later retry
        const failedPromptPath = `image-generation-backup/failed-${image.character}-${image.type}.txt`;
        fs.writeFileSync(failedPromptPath, image.prompt);
      }
      
      // Add delay between API calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Add longer delay between batches
    if (i + batchSize < missingImages.length) {
      console.log('⏳ Waiting 10 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  console.log('\n🎉 Image generation complete!');
  console.log(`✅ Successfully generated: ${successCount} images`);
  console.log(`❌ Failed to generate: ${failureCount} images`);
  console.log(`📁 Check image-generation-backup/ for failed prompts`);
}

// Run the main function
main().catch(console.error); 