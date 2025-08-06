export default function StoriesPage() {
  const stories = [
    {
      id: 1,
      title: "The Quantum Awakening",
      series: "Quantum Paradox",
      issue: "Issue #1",
      description: "Nova discovers her ability to manipulate time and must learn to control her powers before they consume her.",
      author: "Alex Chen",
      artist: "Sarah Kim",
      publishDate: "2024-01-15",
      readTime: "15 min",
      cover: "bg-gradient-to-br from-cyan-500 to-blue-600"
    },
    {
      id: 2,
      title: "Shadows of the City",
      series: "Street Justice",
      issue: "Issue #3",
      description: "Shadow faces his greatest challenge yet when a new crime syndicate threatens to take over the city.",
      author: "Marcus Rodriguez",
      artist: "David Park",
      publishDate: "2024-01-20",
      readTime: "12 min",
      cover: "bg-gradient-to-br from-gray-600 to-black"
    },
    {
      id: 3,
      title: "The Mystic's Call",
      series: "Mystic Realms",
      issue: "Issue #5",
      description: "Zara is summoned to protect the realm from an ancient evil that has awakened from its slumber.",
      author: "Emma Thompson",
      artist: "Lisa Wang",
      publishDate: "2024-01-25",
      readTime: "18 min",
      cover: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      id: 4,
      title: "Cyber Revolution",
              series: "Cypherpunk Chronicles",
      issue: "Issue #8",
      description: "Cyber leads a rebellion against the corporate overlords who control the city's technology.",
      author: "Jordan Lee",
      artist: "Mike Johnson",
      publishDate: "2024-01-30",
      readTime: "20 min",
      cover: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      id: 5,
      title: "Echo's Resonance",
      series: "Street Justice",
      issue: "Issue #7",
      description: "Echo must use his sonic abilities to stop a terrorist attack that threatens the entire city.",
      author: "Marcus Rodriguez",
      artist: "David Park",
      publishDate: "2024-02-05",
      readTime: "14 min",
      cover: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      id: 6,
      title: "The Void's Hunger",
      series: "Mystic Realms",
      issue: "Issue #6",
      description: "Void begins his plan to consume reality, and only Zara stands in his way.",
      author: "Emma Thompson",
      artist: "Lisa Wang",
      publishDate: "2024-02-10",
      readTime: "16 min",
      cover: "bg-gradient-to-br from-red-600 to-black"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Stories</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {stories.map((story) => (
            <div key={story.id} className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <div className={`h-48 ${story.cover} flex items-center justify-center relative`}>
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                  <p className="text-white/80">{story.issue}</p>
                </div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded text-xs">
                  {story.readTime}
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">{story.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-purple-300 mb-2">
                    <span>By {story.author}</span>
                    <span>Art by {story.artist}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Published {new Date(story.publishDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 font-medium">{story.series}</span>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    Read Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
} 