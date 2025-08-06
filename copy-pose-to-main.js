const fs = require('fs');
const path = require('path');

// Function to copy pose images to main images
function copyPoseToMain() {
    const baseDir = 'public/character-images';
    
    // Characters that need main images
    const charactersNeedingMainImages = [
        'cypherpunk-chronicles/circuit',
        'cypherpunk-chronicles/corruptor', 
        'cypherpunk-chronicles/cyber',
        'cypherpunk-chronicles/pulse',
        'cypherpunk-chronicles/void',
        'mystic-realms/aether',
        'mystic-realms/chaos',
        'mystic-realms/nexus',
        'mystic-realms/zara',
        'ninja-punk-girls/kunoichi',
        'ninja-punk-girls/neon-fist',
        'ninja-punk-girls/shadow-blade',
        'street-justice/mirage',
        'street-justice/shadow',
        'street-justice/void'
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
        
        // Look for pose-1 main image to copy
        const pose1Path = path.join(fullPath, 'pose-1', `${characterName}-pose-1-main.jpg`);
        if (fs.existsSync(pose1Path)) {
            fs.copyFileSync(pose1Path, mainImagePath);
            console.log(`✅ Copied pose-1 to main image for ${characterPath}`);
        } else {
            console.log(`❌ No pose-1 main image found for ${characterPath}`);
        }
    });
}

console.log('🚀 Copying pose images to main images...');
copyPoseToMain();
console.log('✅ Main image copying complete!'); 