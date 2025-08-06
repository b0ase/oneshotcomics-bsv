'use client';

import { useState, useEffect, useRef } from 'react';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Frame {
  id: string;
  name: string;
  path: string;
  style: string;
  category: string;
  description: string;
}

interface ComicImage {
  id: string;
  name: string;
  path: string;
  category: string;
  series?: string;
  character?: string;
  type: 'character' | 'cover' | 'series';
}

interface FramedImage {
  id: string;
  imageId: string;
  frameId: string;
  image: ComicImage;
  frame: Frame;
  position: { x: number; y: number; scale: number; rotation: number };
  createdAt: string;
  rating?: number;
  notes?: string;
}

export default function FrameGeneratorPage() {
  const [selectedImage, setSelectedImage] = useState<ComicImage | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [framedImages, setFramedImages] = useState<FramedImage[]>([]);
  const [savedFramedImages, setSavedFramedImages] = useState<FramedImage[]>([]);
  const [images, setImages] = useState<ComicImage[]>([]);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [currentFramedImage, setCurrentFramedImage] = useState<FramedImage | null>(null);
  const [imageCategory, setImageCategory] = useState<string>('all');
  const [frameCategory, setFrameCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingImage, setRatingImage] = useState<FramedImage | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load saved framed images
    try {
      const saved = JSON.parse(localStorage.getItem('savedFramedImages') || '[]');
      setSavedFramedImages(saved);
    } catch (error) {
      console.error('Error loading saved framed images:', error);
    }

    // Generate sample data
    generateSampleData();
  };

  const generateSampleData = () => {
    // Generate sample images
    const sampleImages: ComicImage[] = [
      // Character images
      {
        id: 'nova-main',
        name: 'Nova - Main',
        path: '/character-images/quantum-paradox/nova/nova-main.jpg',
        category: 'characters',
        series: 'quantum-paradox',
        character: 'nova',
        type: 'character'
      },
      {
        id: 'phoenix-main',
        name: 'Phoenix - Main',
        path: '/character-images/quantum-paradox/phoenix/phoenix-main.jpg',
        category: 'characters',
        series: 'quantum-paradox',
        character: 'phoenix',
        type: 'character'
      },
      {
        id: 'circuit-main',
        name: 'Circuit - Main',
        path: '/character-images/cypherpunk-chronicles/circuit/circuit-main.jpg',
        category: 'characters',
        series: 'cypherpunk-chronicles',
        character: 'circuit',
        type: 'character'
      },
      {
        id: 'cypherpunk-cover-1',
        name: 'Cypherpunk Chronicles #1',
        path: '/series-covers/cypherpunk-chronicles-1.jpg',
        category: 'series',
        series: 'cypherpunk-chronicles',
        type: 'series'
      },
      {
        id: 'quantum-cover-1',
        name: 'Quantum Paradox #1',
        path: '/series-covers/quantum-paradox-1.jpg',
        category: 'series',
        series: 'quantum-paradox',
        type: 'series'
      },
      {
        id: 'comic-cover-1',
        name: 'Comic Cover 1',
        path: '/comic-covers/download-1.jpg',
        category: 'covers',
        type: 'cover'
      },
      {
        id: 'comic-cover-2',
        name: 'Comic Cover 2',
        path: '/comic-covers/download-2.jpg',
        category: 'covers',
        type: 'cover'
      }
    ];

    // Generate sample frames
    const sampleFrames: Frame[] = [
      {
        id: 'frame-classic-1',
        name: 'Classic Comic Frame',
        path: '/frames/classic-1.svg',
        style: 'classic',
        category: 'comic',
        description: 'Traditional comic book frame with rounded corners'
      },
      {
        id: 'frame-modern-1',
        name: 'Modern Frame',
        path: '/frames/modern-1.svg',
        style: 'modern',
        category: 'comic',
        description: 'Clean modern frame with sharp edges'
      },
      {
        id: 'frame-dramatic-1',
        name: 'Dramatic Frame',
        path: '/frames/dramatic-1.svg',
        style: 'dramatic',
        category: 'comic',
        description: 'Dynamic frame with action-oriented design'
      },
      {
        id: 'frame-simple-1',
        name: 'Simple Border',
        path: '/frames/simple-1.svg',
        style: 'simple',
        category: 'border',
        description: 'Minimal border frame'
      },
      {
        id: 'frame-ornate-1',
        name: 'Ornate Frame',
        path: '/frames/ornate-1.svg',
        style: 'ornate',
        category: 'decorative',
        description: 'Decorative frame with intricate details'
      },
      {
        id: 'frame-panel-1',
        name: 'Panel Frame',
        path: '/frames/panel-1.svg',
        style: 'panel',
        category: 'comic',
        description: 'Comic panel frame for story sequences'
      }
    ];

    setImages(sampleImages);
    setFrames(sampleFrames);
  };

  const filteredImages = images.filter(image => {
    const matchesCategory = imageCategory === 'all' || image.category === imageCategory;
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.series?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.character?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredFrames = frames.filter(frame => {
    return frameCategory === 'all' || frame.category === frameCategory;
  });

  const createFramedImage = () => {
    if (!selectedImage || !selectedFrame) {
      alert('Please select both an image and a frame');
      return;
    }

    const newFramedImage: FramedImage = {
      id: `framed_${Date.now()}`,
      imageId: selectedImage.id,
      frameId: selectedFrame.id,
      image: selectedImage,
      frame: selectedFrame,
      position: { x: 0, y: 0, scale: 1, rotation: 0 },
      createdAt: new Date().toISOString()
    };

    setCurrentFramedImage(newFramedImage);
    setFramedImages(prev => [...prev, newFramedImage]);
  };

  const saveFramedImage = () => {
    if (!currentFramedImage) return;

    const updatedFramedImage = {
      ...currentFramedImage,
      position: currentFramedImage.position
    };

    const updatedFramedImages = framedImages.map(fi => 
      fi.id === currentFramedImage.id ? updatedFramedImage : fi
    );

    setFramedImages(updatedFramedImages);
    setSavedFramedImages(prev => {
      const existing = prev.filter(fi => fi.id !== currentFramedImage.id);
      return [...existing, updatedFramedImage];
    });

    localStorage.setItem('savedFramedImages', JSON.stringify([...savedFramedImages, updatedFramedImage]));
    alert('Framed image saved successfully!');
  };

  const deleteFramedImage = (id: string) => {
    setFramedImages(prev => prev.filter(fi => fi.id !== id));
    setSavedFramedImages(prev => prev.filter(fi => fi.id !== id));
    
    if (currentFramedImage?.id === id) {
      setCurrentFramedImage(null);
    }

    localStorage.setItem('savedFramedImages', JSON.stringify(savedFramedImages.filter(fi => fi.id !== id)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!currentFramedImage) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !currentFramedImage) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setCurrentFramedImage(prev => prev ? {
      ...prev,
      position: {
        ...prev.position,
        x: prev.position.x + deltaX,
        y: prev.position.y + deltaY
      }
    } : null);

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const adjustImagePosition = (property: 'x' | 'y' | 'scale' | 'rotation', value: number) => {
    if (!currentFramedImage) return;

    setCurrentFramedImage(prev => prev ? {
      ...prev,
      position: {
        ...prev.position,
        [property]: value
      }
    } : null);
  };

  const openRatingModal = (framedImage: FramedImage) => {
    setRatingImage(framedImage);
    setShowRatingModal(true);
  };

  const saveRating = (rating: number, notes: string) => {
    if (!ratingImage) return;

    const updatedFramedImage = {
      ...ratingImage,
      rating,
      notes
    };

    setSavedFramedImages(prev => 
      prev.map(fi => fi.id === ratingImage.id ? updatedFramedImage : fi)
    );

    localStorage.setItem('savedFramedImages', JSON.stringify(
      savedFramedImages.map(fi => fi.id === ratingImage.id ? updatedFramedImage : fi)
    ));

    setShowRatingModal(false);
    setRatingImage(null);
  };

  const renderImageSelector = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">Select Image</h2>
      
      <div className="mb-4">
        <select
          value={imageCategory}
          onChange={(e) => setImageCategory(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="all">All Images</option>
          <option value="characters">Character Images</option>
          <option value="series">Series Covers</option>
          <option value="covers">Comic Covers</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedImage?.id === image.id 
                ? 'bg-purple-600/20 border-purple-400' 
                : 'bg-gray-800/50 border-gray-600 hover:border-purple-400/50'
            }`}
          >
            <div className="aspect-square relative overflow-hidden rounded mb-2">
              <ImageWithFallback
                src={image.path}
                alt={image.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-white text-sm truncate">{image.name}</h3>
            <span className="text-xs text-gray-400 capitalize">{image.type}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFrameSelector = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">Select Frame</h2>
      
      <div className="mb-4">
        <select
          value={frameCategory}
          onChange={(e) => setFrameCategory(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="all">All Frames</option>
          <option value="comic">Comic Frames</option>
          <option value="border">Border Frames</option>
          <option value="decorative">Decorative Frames</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
        {filteredFrames.map((frame) => (
          <div
            key={frame.id}
            onClick={() => setSelectedFrame(frame)}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedFrame?.id === frame.id 
                ? 'bg-purple-600/20 border-purple-400' 
                : 'bg-gray-800/50 border-gray-600 hover:border-purple-400/50'
            }`}
          >
            <div className="aspect-square relative overflow-hidden rounded mb-2 bg-gray-700 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-white rounded"></div>
            </div>
            <h3 className="font-semibold text-white text-sm truncate">{frame.name}</h3>
            <p className="text-xs text-gray-400">{frame.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCanvas = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-300">Frame Canvas</h2>
        {currentFramedImage && (
          <button
            onClick={saveFramedImage}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
          >
            💾 Save Framed Image
          </button>
        )}
      </div>

      {currentFramedImage ? (
        <div className="space-y-4">
          <div 
            ref={canvasRef}
            className="relative bg-gray-900 rounded-lg border-2 border-dashed border-gray-600 h-96 flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute cursor-move"
              style={{
                left: currentFramedImage.position.x,
                top: currentFramedImage.position.y,
                transform: `scale(${currentFramedImage.position.scale}) rotate(${currentFramedImage.position.rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease'
              }}
              onMouseDown={handleMouseDown}
            >
              <div className="relative">
                <ImageWithFallback
                  src={currentFramedImage.image.path}
                  alt={currentFramedImage.image.name}
                  className="w-48 h-48 object-cover rounded"
                />
                <div className="absolute inset-0 border-4 border-white rounded opacity-50"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-1">X Position</label>
              <input
                type="range"
                min="-100"
                max="100"
                value={currentFramedImage.position.x}
                onChange={(e) => adjustImagePosition('x', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">{currentFramedImage.position.x}</span>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-1">Y Position</label>
              <input
                type="range"
                min="-100"
                max="100"
                value={currentFramedImage.position.y}
                onChange={(e) => adjustImagePosition('y', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">{currentFramedImage.position.y}</span>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-1">Scale</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={currentFramedImage.position.scale}
                onChange={(e) => adjustImagePosition('scale', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">{currentFramedImage.position.scale}</span>
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-1">Rotation</label>
              <input
                type="range"
                min="-180"
                max="180"
                value={currentFramedImage.position.rotation}
                onChange={(e) => adjustImagePosition('rotation', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">{currentFramedImage.position.rotation}°</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold text-purple-300 mb-2">No Framed Image</h3>
          <p className="text-gray-400">Select an image and frame, then click "Create Framed Image"</p>
        </div>
      )}
    </div>
  );

  const renderSavedFramedImages = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">Saved Framed Images</h2>
      
      {savedFramedImages.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No saved framed images yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {savedFramedImages.map((framedImage) => (
            <div key={framedImage.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
              <div className="aspect-square relative overflow-hidden rounded mb-3">
                <ImageWithFallback
                  src={framedImage.image.path}
                  alt={framedImage.image.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-white rounded opacity-30"></div>
              </div>
              
              <h3 className="font-semibold text-white text-sm mb-1">{framedImage.image.name}</h3>
              <p className="text-xs text-gray-400 mb-2">{framedImage.frame.name}</p>
              
              {framedImage.rating && (
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < framedImage.rating! ? 'text-yellow-400' : 'text-gray-600'}`}>
                      ★
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => openRatingModal(framedImage)}
                  className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                >
                  Rate
                </button>
                <button
                  onClick={() => deleteFramedImage(framedImage.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderRatingModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Rate Framed Image</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingImage(prev => prev ? { ...prev, rating: star } : null)}
                  className={`text-2xl ${ratingImage?.rating && star <= ratingImage.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Notes</label>
            <textarea
              value={ratingImage?.notes || ''}
              onChange={(e) => setRatingImage(prev => prev ? { ...prev, notes: e.target.value } : null)}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-purple-500 focus:outline-none"
              placeholder="Add notes about this framed image..."
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => ratingImage && saveRating(ratingImage.rating || 0, ratingImage.notes || '')}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold"
          >
            Save Rating
          </button>
          <button
            onClick={() => setShowRatingModal(false)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Frame Generator</h1>
        <p className="text-center text-gray-300">Assemble images inside frames and select the best combinations</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Frame Selection */}
          <div className="space-y-6">
            {renderImageSelector()}
            {renderFrameSelector()}
            
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Create Framed Image</h2>
              <button
                onClick={createFramedImage}
                disabled={!selectedImage || !selectedFrame}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold"
              >
                🖼️ Create Framed Image
              </button>
            </div>
          </div>

          {/* Right Column - Canvas and Saved Images */}
          <div className="lg:col-span-2 space-y-6">
            {renderCanvas()}
            {renderSavedFramedImages()}
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && renderRatingModal()}
    </div>
  );
} 