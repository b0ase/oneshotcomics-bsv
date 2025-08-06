const fs = require('fs');
const path = require('path');

// Function to copy variant-1 images to main images
function copyVariantsToMain() {
    const baseDir = 'public/character-images';
    
    // Characters that need main images
    const charactersNeedingMainImages = [
        'cypherpunk-chronicles/void',
        'ninja-punk-girls/shadow-blade'
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
        
        // Look for variant-1 image to copy
        const variant1Path = path.join(fullPath, `${characterName}-variant-1.jpg`);
        if (fs.existsSync(variant1Path)) {
            fs.copyFileSync(variant1Path, mainImagePath);
            console.log(`✅ Copied variant-1 to main image for ${characterPath}`);
        } else {
            console.log(`❌ No variant-1 image found for ${characterPath}`);
        }
    });
}

console.log('🚀 Copying variant images to main images...');
copyVariantsToMain();
console.log('✅ Main image copying complete!'); 