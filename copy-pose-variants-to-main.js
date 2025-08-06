const fs = require('fs');
const path = require('path');

// Function to copy pose-1 variant-1 images to main images
function copyPoseVariantsToMain() {
    const baseDir = 'public/character-images';
    
    // Characters that need main images from pose-1 variants
    const charactersNeedingMainImages = [
        'mystic-realms/zara',
        'ninja-punk-girls/kunoichi'
    ];
    
    charactersNeedingMainImages.forEach(characterPath => {
        const fullPath = path.join(baseDir, characterPath);
        const characterName = path.basename(characterPath);
        
        if (!fs.existsSync(fullPath)) {
            console.log(`Directory doesn't exist: ${fullPath}`);
            return;
        }
        
        // Check if main image already exists
        const mainImagePath = path.join(fullPath, `${characterName}-main.jpg`);
        if (fs.existsSync(mainImagePath)) {
            console.log(`✅ Main image already exists for ${characterPath}`);
            return;
        }
        
        // Look for pose-1 variant-1 image to copy
        const pose1Variant1Path = path.join(fullPath, 'pose-1', `${characterName}-pose-1-variant-1.jpg`);
        if (fs.existsSync(pose1Variant1Path)) {
            fs.copyFileSync(pose1Variant1Path, mainImagePath);
            console.log(`✅ Copied pose-1 variant-1 to main image for ${characterPath}`);
        } else {
            console.log(`❌ No pose-1 variant-1 image found for ${characterPath}`);
        }
    });
}

console.log('🚀 Copying pose-1 variant images to main images...');
copyPoseVariantsToMain();
console.log('✅ All main image copying complete!'); 