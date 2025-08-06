#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// API Configuration - Use AIML API as requested
const API_KEYS = {
  AIML: '4eb9b8daee9d4fa28c726860c37f86a1'
};

// Function to make API call to AIML (correct format)
async function callAIMLAPI(prompt, outputPath) {
  try {
    console.log(`🔄 Calling AIML API for: ${path.basename(outputPath)}`);
    
    // Use the correct AIML API endpoint and format
    const response = await fetch('https://api.aiml.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEYS.AIML}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "stable-diffusion-1.5",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AIML API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('No image data received from AIML API');
    }
    
    // The response should contain image data
    const imageData = data.choices[0].message.content;
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Save the image (assuming it's base64 encoded)
    fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
    console.log(`✅ AIML API success: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ AIML API failed: ${error.message}`);
    return false;
  }
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

// Function to read original prompt from file
function readOriginalPrompt(promptPath) {
  try {
    if (fs.existsSync(promptPath)) {
      return fs.readFileSync(promptPath, 'utf8').trim();
    }
    return null;
  } catch (error) {
    console.error(`Error reading prompt file ${promptPath}:`, error.message);
    return null;
  }
}

// Function to generate image with AIML API
async function generateImage(prompt, outputPath, characterName) {
  console.log(`\n🎨 Generating image for ${characterName}...`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);
  console.log(`📁 Output: ${outputPath}`);
  
  // Use AIML API as requested
  const success = await callAIMLAPI(prompt, outputPath);
  
  if (!success) {
    console.error(`❌ Failed to generate image for ${characterName}`);
    return false;
  }
  
  return true;
}

// Main execution function
async function main() {
  console.log('🚀 Starting One-Shot Comics Image Generation with AIML API...');
  console.log('💰 Using AIML API with $15 of credits as requested');
  
  // Read missing images
  const missingImages = readMissingImages();
  
  if (missingImages.length === 0) {
    console.log('❌ No missing images data found. Run generate-missing-images.js first.');
    return;
  }
  
  console.log(`📊 Found ${missingImages.length} missing images to generate`);
  
  let successCount = 0;
  let failureCount = 0;
  
  // Process images in batches
  const batchSize = 5;
  for (let i = 0; i < missingImages.length; i += batchSize) {
    const batch = missingImages.slice(i, i + batchSize);
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(missingImages.length / batchSize)}`);
    console.log(`Progress: ${i + 1}-${Math.min(i + batchSize, missingImages.length)} of ${missingImages.length}`);
    
    for (const image of batch) {
      // Read original prompt
      const originalPrompt = readOriginalPrompt(image.promptPath);
      if (!originalPrompt) {
        console.log(`⚠️  Skipping ${image.character} - no original prompt found`);
        failureCount++;
        continue;
      }
      
      // Generate image using original prompt
      const success = await generateImage(originalPrompt, image.outputPath, image.character);
      
      if (success) {
        successCount++;
      } else {
        failureCount++;
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
  
  if (successCount > 0) {
    console.log('\n🎨 Images have been saved to their respective character directories!');
  }
}

// Run the main function
main().catch(console.error); 