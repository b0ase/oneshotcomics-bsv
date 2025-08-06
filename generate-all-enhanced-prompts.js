#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// API Configuration
const API_KEYS = {
  GOOGLE_AI_STUDIO: 'AIzaSyCRYIAbeNx0pkqU-HSsv6-aj6vX9PiqOFY'
};

// Function to make API call to Google AI Studio
async function callGoogleAIStudioAPI(prompt, outputPath) {
  try {
    console.log(`🔄 Enhancing prompt for: ${path.basename(outputPath)}`);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEYS.GOOGLE_AI_STUDIO}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Enhance this image prompt for a comic book character. Make it detailed, specific, and optimized for AI image generation. Focus on visual details, style, and composition. Return only the enhanced prompt, no other text.

Original prompt:
${prompt}

Enhanced prompt:`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google AI Studio API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0] || !data.candidates[0].content.parts[0].text) {
      throw new Error('No enhanced prompt received from Google AI Studio API');
    }
    
    const enhancedPrompt = data.candidates[0].content.parts[0].text;
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Save the enhanced prompt
    fs.writeFileSync(outputPath, enhancedPrompt);
    console.log(`✅ Enhanced prompt saved: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Google AI Studio API failed: ${error.message}`);
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

// Main execution function
async function main() {
  console.log('🚀 Starting Enhanced Prompt Generation for All Missing Images...');
  
  // Read missing images
  const missingImages = readMissingImages();
  
  if (missingImages.length === 0) {
    console.log('❌ No missing images data found. Run generate-missing-images.js first.');
    return;
  }
  
  console.log(`📊 Found ${missingImages.length} missing images to enhance prompts for`);
  
  let successCount = 0;
  let failureCount = 0;
  let skippedCount = 0;
  
  // Process images in batches
  const batchSize = 5;
  for (let i = 0; i < missingImages.length; i += batchSize) {
    const batch = missingImages.slice(i, i + batchSize);
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(missingImages.length / batchSize)}`);
    console.log(`Progress: ${i + 1}-${Math.min(i + batchSize, missingImages.length)} of ${missingImages.length}`);
    
    for (const image of batch) {
      // Check if enhanced prompt already exists
      const enhancedPromptPath = image.outputPath.replace('.jpg', '-enhanced-prompt.txt');
      
      if (fs.existsSync(enhancedPromptPath)) {
        console.log(`⏭️  Skipping ${image.character} - enhanced prompt already exists`);
        skippedCount++;
        continue;
      }
      
      // Read original prompt
      const originalPrompt = readOriginalPrompt(image.promptPath);
      if (!originalPrompt) {
        console.log(`⚠️  Skipping ${image.character} - no original prompt found`);
        skippedCount++;
        continue;
      }
      
      // Generate enhanced prompt
      const success = await callGoogleAIStudioAPI(originalPrompt, enhancedPromptPath);
      
      if (success) {
        successCount++;
      } else {
        failureCount++;
        // Save failed prompt for later retry
        const failedPromptPath = `image-generation-backup/failed-${image.character}-${image.type}.txt`;
        if (!fs.existsSync('image-generation-backup')) {
          fs.mkdirSync('image-generation-backup');
        }
        fs.writeFileSync(failedPromptPath, originalPrompt);
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
  
  console.log('\n🎉 Enhanced prompt generation complete!');
  console.log(`✅ Successfully enhanced: ${successCount} prompts`);
  console.log(`⏭️  Skipped (already exist): ${skippedCount} prompts`);
  console.log(`❌ Failed to enhance: ${failureCount} prompts`);
  
  if (failureCount > 0) {
    console.log(`📁 Check image-generation-backup/ for failed prompts`);
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Review the enhanced prompts in the character directories');
  console.log('2. Add credits to Stability AI account (if using that service)');
  console.log('3. Run image generation with the enhanced prompts');
  console.log('4. Or use the enhanced prompts with any image generation service');
}

// Run the main function
main().catch(console.error); 