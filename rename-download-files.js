const fs = require('fs');
const path = require('path');

// Function to rename download files to appropriate names
function renameDownloadFiles() {
    const baseDir = 'public/character-images';
    
    // Walk through all character directories
    const seriesDirs = fs.readdirSync(baseDir);
    
    seriesDirs.forEach(seriesDir => {
        const seriesPath = path.join(baseDir, seriesDir);
        if (!fs.statSync(seriesPath).isDirectory()) return;
        
        const characterDirs = fs.readdirSync(seriesPath);
        
        characterDirs.forEach(characterDir => {
            const characterPath = path.join(seriesPath, characterDir);
            if (!fs.statSync(characterPath).isDirectory()) return;
            
            console.log(`Processing ${seriesDir}/${characterDir}...`);
            
            // Handle main character directory files
            const mainFiles = fs.readdirSync(characterPath);
            mainFiles.forEach(file => {
                if (file.startsWith('download-') && file.endsWith('.jpg')) {
                    const newName = `${characterDir}-main.jpg`;
                    const oldPath = path.join(characterPath, file);
                    const newPath = path.join(characterPath, newName);
                    
                    if (!fs.existsSync(newPath)) {
                        fs.renameSync(oldPath, newPath);
                        console.log(`  Renamed ${file} to ${newName}`);
                    }
                }
            });
            
            // Handle pose directories
            const poseDirs = fs.readdirSync(characterPath).filter(item => 
                fs.statSync(path.join(characterPath, item)).isDirectory() && 
                item.startsWith('pose-')
            );
            
            poseDirs.forEach(poseDir => {
                const posePath = path.join(characterPath, poseDir);
                const poseFiles = fs.readdirSync(posePath);
                
                poseFiles.forEach(file => {
                    if (file.startsWith('download-') && file.endsWith('.jpg')) {
                        const newName = `${characterDir}-${poseDir}-main.jpg`;
                        const oldPath = path.join(posePath, file);
                        const newPath = path.join(posePath, newName);
                        
                        if (!fs.existsSync(newPath)) {
                            fs.renameSync(oldPath, newPath);
                            console.log(`  Renamed ${poseDir}/${file} to ${poseDir}/${newName}`);
                        }
                    }
                });
            });
        });
    });
}

console.log('🚀 Starting download file renaming...');
renameDownloadFiles();
console.log('✅ Download file renaming complete!'); 