const fs = require('fs');
const path = require('path');

// Function to create missing main images
function createMissingMainImages() {
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
        const seriesName = path.dirname(characterPath).split('/').pop();
        
        if (!fs.existsSync(fullPath)) {
            console.log(`Directory doesn't exist: ${fullPath}`);
            return;
        }
        
        const files = fs.readdirSync(fullPath);
        const downloadFiles = files.filter(file => file.startsWith('download-') && file.endsWith('.jpg'));
        
        if (downloadFiles.length > 0) {
            // Use the first download file as the main image
            const downloadFile = downloadFiles[0];
            const oldPath = path.join(fullPath, downloadFile);
            const newPath = path.join(fullPath, `${characterName}-main.jpg`);
            
            if (!fs.existsSync(newPath)) {
                fs.renameSync(oldPath, newPath);
                console.log(`✅ Created main image for ${characterPath}: ${downloadFile} → ${characterName}-main.jpg`);
            } else {
                console.log(`⚠️  Main image already exists for ${characterPath}`);
            }
        } else {
            console.log(`❌ No download files found for ${characterPath}`);
        }
    });
}

console.log('🚀 Creating missing main character images...');
createMissingMainImages();
console.log('✅ Main image creation complete!'); 