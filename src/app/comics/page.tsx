'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Comic {
  id: string;
  title: string;
  subtitle: string;
  series: string;
  issue: number;
  price: string;
  author: string;
  artist: string;
  pages: number;
  status: 'Draft' | 'Published' | 'Coming Soon' | 'Sold Out';
  cover_image: string;
  description: string;
  genre: string;
  rating?: number;
  read_count?: number;
  created_at: string;
  updated_at: string;
}

export default function ComicsPage() {
  const router = useRouter();
  const [comics, setComics] = useState<Comic[]>([]);
  const [filteredComics, setFilteredComics] = useState<Comic[]>([]);
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [showComicModal, setShowComicModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComics();
  }, []);

  useEffect(() => {
    filterAndSortComics();
  }, [comics, searchTerm, selectedSeries, selectedStatus, sortBy]);

  const loadComics = async () => {
    setIsLoading(true);
    try {
      // Generate sample comics data
      const sampleComics: Comic[] = [
        {
          id: 'npg-red-1',
          title: 'NPG RED: Digital Shadows (Demo)',
          subtitle: 'Episode 1 demo flipbook experience',
          series: 'NPG Red',
          issue: 1,
          price: '0.00 BSV',
          author: 'b0ase + AI',
          artist: 'AI Generated',
          pages: 22,
          status: 'Published',
          cover_image: '/images/cover-episode-1.jpg',
          description: 'A demo of the readable comic built from NPG Red assets with page-flip UX.',
          genre: 'Cyberpunk',
          rating: 5.0,
          read_count: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 'comic-1',
          title: 'Quantum Paradox #1: The Awakening',
          subtitle: 'Nova discovers her true power in a world of quantum uncertainty',
          series: 'Quantum Paradox',
          issue: 1,
          price: '0.05 ETH',
          author: 'AI Generated',
          artist: 'AI Generated',
          pages: 24,
          status: 'Published',
          cover_image: '/series-covers/quantum-paradox-1.jpg',
          description: 'In a world where reality is fluid and possibilities are infinite, Nova awakens to her extraordinary abilities. As she learns to navigate the quantum realm, she discovers that her powers come with a heavy price - the ability to see all possible futures at once.',
          genre: 'Sci-Fi',
          rating: 4.8,
          read_count: 1247,
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 'comic-2',
          title: 'Cypherpunk Chronicles #1: Digital Revolution',
          subtitle: 'Circuit leads the resistance against corporate control',
          series: 'Cypherpunk Chronicles',
          issue: 1,
          price: '0.04 ETH',
          author: 'AI Generated',
          artist: 'AI Generated',
          pages: 22,
          status: 'Published',
          cover_image: '/series-covers/cypherpunk-chronicles-1.jpg',
          description: 'In the neon-lit streets of Neo-Tokyo, Circuit and her team of cyber-freedom fighters battle against the oppressive corporate regime. When a new AI threatens to control all digital systems, Circuit must hack into the heart of the machine to save humanity.',
          genre: 'Cyberpunk',
          rating: 4.6,
          read_count: 892,
          created_at: '2024-01-10T14:20:00Z',
          updated_at: '2024-01-10T14:20:00Z'
        },
        {
          id: 'comic-3',
          title: 'Mystic Realms #1: The Ancient Awakening',
          subtitle: 'Aether discovers the hidden magic within',
          series: 'Mystic Realms',
          issue: 1,
          price: '0.06 ETH',
          author: 'AI Generated',
          artist: 'AI Generated',
          pages: 26,
          status: 'Published',
          cover_image: '/series-covers/Mystic-Realms-1.jpg',
          description: 'Deep in the enchanted forests of Eldoria, Aether discovers she is the last descendant of an ancient magical bloodline. As dark forces rise to claim the realm\'s power, she must master her abilities and unite the scattered magical communities.',
          genre: 'Fantasy',
          rating: 4.9,
          read_count: 1563,
          created_at: '2024-01-08T09:15:00Z',
          updated_at: '2024-01-08T09:15:00Z'
        },
        {
          id: 'comic-4',
          title: 'Ninja Punk Girls #1: Shadow Training',
          subtitle: 'Kunoichi begins her journey to become a legendary warrior',
          series: 'Ninja Punk Girls',
          issue: 1,
          price: '0.03 ETH',
          author: 'AI Generated',
          artist: 'AI Generated',
          pages: 20,
          status: 'Published',
          cover_image: '/series-covers/ninja-punk-girls-1.jpg',
          description: 'In the hidden dojos of modern Japan, Kunoichi trains under the watchful eye of her master. When a rival clan threatens the ancient traditions, she must prove her worth and protect the secrets of the ninja arts.',
          genre: 'Action',
          rating: 4.7,
          read_count: 734,
          created_at: '2024-01-05T16:45:00Z',
          updated_at: '2024-01-05T16:45:00Z'
        },
        {
          id: 'comic-5',
          title: 'Street Justice #1: Urban Legends',
          subtitle: 'Mirage fights for justice in the city\'s shadows',
          series: 'Street Justice',
          issue: 1,
          price: '0.04 ETH',
          author: 'AI Generated',
          artist: 'AI Generated',
          pages: 24,
          status: 'Coming Soon',
          cover_image: '/series-covers/street-justice-1.jpg',
          description: 'In the crime-ridden streets of Metro City, Mirage operates as a vigilante, using her illusions and combat skills to protect the innocent. When a powerful crime syndicate rises, she must form an unlikely alliance to save the city.',
          genre: 'Crime',
          rating: 0,
          read_count: 0,
          created_at: '2024-01-20T11:00:00Z',
          updated_at: '2024-01-20T11:00:00Z'
        },
        {
          id: 'comic-6',
          title: 'Quantum Paradox #2: Reality Shift',
          subtitle: 'Nova faces the consequences of her quantum abilities',
          series: 'Quantum Paradox',
          issue: 2,
          price: '0.05 ETH',
          author: 'AI Generated',
          artist: 'AI Generated',
          pages: 24,
          status: 'Draft',
          cover_image: '/series-covers/quantum-paradox-2.jpg',
          description: 'As Nova struggles to control her quantum powers, reality begins to fracture around her. She must learn to master her abilities before the entire universe collapses into chaos.',
          genre: 'Sci-Fi',
          rating: 0,
          read_count: 0,
          created_at: '2024-01-25T13:30:00Z',
          updated_at: '2024-01-25T13:30:00Z'
        }
      ];

      setComics(sampleComics);
    } catch (error) {
      console.error('Error loading comics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortComics = () => {
    let filtered = comics.filter(comic => {
      const matchesSearch = comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comic.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comic.series.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeries = selectedSeries === 'all' || comic.series === selectedSeries;
      const matchesStatus = selectedStatus === 'all' || comic.status === selectedStatus;
      
      return matchesSearch && matchesSeries && matchesStatus;
    });

    // Sort comics
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.read_count || 0) - (a.read_count || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
    }

    setFilteredComics(filtered);
  };

  const openComicModal = (comic: Comic) => {
    setSelectedComic(comic);
    setShowComicModal(true);
  };

  const closeComicModal = () => {
    setShowComicModal(false);
    setSelectedComic(null);
  };

  const getSeriesList = () => {
    const series = [...new Set(comics.map(comic => comic.series))];
    return series;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-600';
      case 'Coming Soon': return 'bg-yellow-600';
      case 'Draft': return 'bg-blue-600';
      case 'Sold Out': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const renderComicGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredComics.map((comic) => (
        <div
          key={comic.id}
          className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-600 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
          onClick={() => openComicModal(comic)}
        >
          <div className="aspect-[3/4] relative overflow-hidden">
            <ImageWithFallback
              src={comic.cover_image}
              alt={comic.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comic.status)}`}>
              {comic.status}
            </div>
            {comic.rating && comic.rating > 0 && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-xs">{comic.rating}</span>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">{comic.title}</h3>
            <p className="text-gray-300 text-xs mb-2 line-clamp-2">{comic.subtitle}</p>
            <div className="flex justify-between items-center">
              <span className="text-purple-300 text-xs">{comic.series} #{comic.issue}</span>
              <span className="text-white font-semibold text-sm">{comic.price}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-gray-700 rounded text-xs">{comic.genre}</span>
              <span className="px-2 py-1 bg-gray-700 rounded text-xs">{comic.pages} pages</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderComicList = () => (
    <div className="space-y-4">
      {filteredComics.map((comic) => (
        <div
          key={comic.id}
          className="bg-gray-800/50 rounded-lg border border-gray-600 hover:border-purple-400/50 transition-all cursor-pointer group flex gap-4 p-4"
          onClick={() => openComicModal(comic)}
        >
          <div className="w-20 h-28 relative overflow-hidden rounded-lg flex-shrink-0">
            <ImageWithFallback
              src={comic.cover_image}
              alt={comic.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-1 right-1 px-1 py-0.5 rounded text-xs font-medium ${getStatusColor(comic.status)}`}>
              {comic.status}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white mb-1">{comic.title}</h3>
            <p className="text-gray-300 text-sm mb-2">{comic.subtitle}</p>
            <div className="flex gap-4 text-xs text-gray-400 mb-2">
              <span>{comic.series} #{comic.issue}</span>
              <span>{comic.genre}</span>
              <span>{comic.pages} pages</span>
              {comic.read_count && <span>{comic.read_count} reads</span>}
            </div>
            <p className="text-gray-400 text-xs line-clamp-2">{comic.description}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-white font-semibold">{comic.price}</span>
            {comic.rating && comic.rating > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-xs">{comic.rating}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderComicModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-xl font-bold text-white">{selectedComic?.title}</h2>
          <button
            onClick={closeComicModal}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={selectedComic?.cover_image || ''}
                  alt={selectedComic?.title || ''}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${selectedComic ? getStatusColor(selectedComic.status) : ''}`}>
                  {selectedComic?.status}
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedComic?.title}</h3>
                <p className="text-gray-300 text-lg mb-4">{selectedComic?.subtitle}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-400 text-sm">Series:</span>
                    <p className="text-white">{selectedComic?.series} #{selectedComic?.issue}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Genre:</span>
                    <p className="text-white">{selectedComic?.genre}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Pages:</span>
                    <p className="text-white">{selectedComic?.pages}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Price:</span>
                    <p className="text-white font-semibold">{selectedComic?.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Author:</span>
                    <p className="text-white">{selectedComic?.author}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Artist:</span>
                    <p className="text-white">{selectedComic?.artist}</p>
                  </div>
                </div>
                
                {selectedComic?.rating && selectedComic.rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400 text-sm">Rating:</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < selectedComic.rating! ? 'text-yellow-400' : 'text-gray-600'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-white text-sm">({selectedComic.rating})</span>
                  </div>
                )}
                
                <div>
                  <span className="text-gray-400 text-sm">Description:</span>
                  <p className="text-white text-sm mt-1">{selectedComic?.description}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
                  onClick={() => {
                    if (!selectedComic) return;
                    const path = selectedComic.id === 'npg-red-1' || selectedComic.series === 'NPG Red'
                      ? '/comics/npg-red'
                      : '/comics';
                    closeComicModal();
                    router.push(path);
                  }}
                >
                  📖 Read Comic
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-semibold">
                  💰 Buy NFT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="page-header mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Comics Library</h1>
        <p className="text-center text-gray-300">Discover and read amazing comics from the One-Shot universe</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Filters and Controls */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search comics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Series</option>
                {getSeriesList().map(series => (
                  <option key={series} value={series}>{series}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Draft">Draft</option>
                <option value="Sold Out">Sold Out</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title="Grid View"
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title="List View"
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Comics Display */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading comics...</p>
            </div>
          ) : filteredComics.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-purple-300 mb-4">No Comics Found</h2>
              <p className="text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-300">
                  {filteredComics.length} Comic{filteredComics.length !== 1 ? 's' : ''}
                </h2>
                <div className="text-sm text-gray-400">
                  Showing {filteredComics.length} of {comics.length} total comics
                </div>
              </div>
              
              {viewMode === 'grid' ? renderComicGrid() : renderComicList()}
            </div>
          )}
        </div>
      </div>

      {/* Comic Modal */}
      {showComicModal && selectedComic && renderComicModal()}
    </div>
  );
} 