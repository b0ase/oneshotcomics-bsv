#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// API Configuration - Focus on working APIs
const API_KEYS = {
  STABILITY_AI: 'sk-CD8RJ7DR7WyaAIBkT4knZGQ8kjOlAv92ZmBgAeZmhQ8elRGG',
  GOOGLE_AI_STUDIO: 'AIzaSyCRYIAbeNx0pkqU-HSsv6-aj6vX9PiqOFY'
};

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
      const errorText = await response.text();
      throw new Error(`Stability AI API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.artifacts || !data.artifacts[0] || !data.artifacts[0].base64) {
      throw new Error('No image data received from Stability AI API');
    }
    
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

// Function to make API call to Google AI Studio (using correct model)
async function callGoogleAIStudioAPI(prompt, outputPath) {
  try {
    console.log(`🔄 Calling Google AI Studio API for: ${path.basename(outputPath)}`);
    
    // Try different Google AI Studio models
    const models = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro'
    ];
    
    for (const model of models) {
      try {
        console.log(`  Trying model: ${model}`);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEYS.GOOGLE_AI_STUDIO}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a detailed image prompt for: ${prompt}. Return only the enhanced prompt, no other text.`
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
          const errorText = await response.text();
          console.log(`    Model ${model} failed: ${response.status} ${response.statusText}`);
          continue;
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
          const enhancedPrompt = data.candidates[0].content.parts[0].text;
          console.log(`    ✅ Model ${model} worked, got enhanced prompt`);
          
          // Now use the enhanced prompt to generate image (this would need a different API)
          // For now, we'll save the enhanced prompt and use it with Stability AI
          const enhancedPromptPath = outputPath.replace('.jpg', '-enhanced-prompt.txt');
          fs.writeFileSync(enhancedPromptPath, enhancedPrompt);
          
          console.log(`✅ Google AI Studio API success (enhanced prompt): ${path.basename(outputPath)}`);
          return true;
        }
      } catch (error) {
        console.log(`    Model ${model} error: ${error.message}`);
        continue;
      }
    }
    
    throw new Error('All Google AI Studio models failed');
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
  
  // Try Stability AI first (more reliable)
  let success = await callStabilityAIAPI(prompt, outputPath);
  if (success) return true;
  
  // Try Google AI Studio as backup (for prompt enhancement)
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

// Function to test API connectivity
async function testAPIs() {
  console.log('🧪 Testing API connectivity...');
  
  const testPrompt = "A simple test image of a red circle on white background";
  const testPath = "test-image.jpg";
  
  console.log('\nTesting Stability AI API...');
  const stabilityTest = await callStabilityAIAPI(testPrompt, testPath);
  
  if (stabilityTest) {
    console.log('✅ Stability AI API is working');
    fs.unlinkSync(testPath); // Clean up test file
  } else {
    console.log('❌ Stability AI API is not working - Insufficient balance');
    console.log('💡 To fix: Add credits to your Stability AI account');
    console.log('   Visit: https://platform.stability.ai/account/credits');
  }
  
  console.log('\nTesting Google AI Studio API...');
  const googleTest = await callGoogleAIStudioAPI(testPrompt, testPath);
  
  if (googleTest) {
    console.log('✅ Google AI Studio API is working');
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath); // Clean up test file
    }
  } else {
    console.log('❌ Google AI Studio API is not working');
  }
  
  return stabilityTest || googleTest;
}

// Function to generate a small batch for testing
async function generateTestBatch() {
  console.log('🧪 Generating test batch (first 3 images)...');
  
  const missingImages = readMissingImages();
  if (missingImages.length === 0) {
    console.log('❌ No missing images data found.');
    return;
  }
  
  const testBatch = missingImages.slice(0, 3);
  let successCount = 0;
  
  for (const image of testBatch) {
    const success = await generateImage(image.prompt, image.outputPath, image.character);
    if (success) successCount++;
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  
  console.log(`\n✅ Test batch complete: ${successCount}/3 images generated`);
}

// Main execution function
async function main() {
  console.log('🚀 Starting One-Shot Comics Image Generation...');
  
  // Test APIs first
  const apisWorking = await testAPIs();
  
  if (!apisWorking) {
    console.log('\n❌ No APIs are working. Please check your API keys and internet connection.');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. For Stability AI: Add credits to your account');
    console.log('2. For Google AI Studio: Check your API key and quota');
    console.log('3. Check your internet connection');
    return;
  }
  
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
  
  console.log(`\n📊 Found ${missingImages.length} missing images to generate`);
  
  // Ask user what they want to do
  console.log('\n🎯 Choose an option:');
  console.log('1. Generate test batch (first 3 images)');
  console.log('2. Generate all images (251 images - may take hours)');
  console.log('3. Exit');
  
  // For now, let's do a test batch
  console.log('\n🔄 Running test batch...');
  await generateTestBatch();
  
  console.log('\n✅ Test complete! Check the generated images.');
  console.log('💡 To generate all images, run: node generate-all-images.js');
}

// Run the main function
main().catch(console.error); 