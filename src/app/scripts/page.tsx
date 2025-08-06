export default function ScriptsPage() {
  const scripts = [
    {
      id: 1,
      title: "The Quantum Awakening - Script",
      series: "Quantum Paradox",
      issue: "Issue #1",
      author: "Alex Chen",
      status: "Final Draft",
      lastModified: "2024-01-10",
      pages: 24,
      description: "Complete script for the debut issue of Quantum Paradox, introducing Nova and her powers.",
      cover: "bg-gradient-to-br from-cyan-500 to-blue-600"
    },
    {
      id: 2,
      title: "Shadows of the City - Script",
      series: "Street Justice",
      issue: "Issue #3",
      author: "Marcus Rodriguez",
      status: "In Review",
      lastModified: "2024-01-18",
      pages: 22,
      description: "Script for the third issue of Street Justice, featuring Shadow's confrontation with the crime syndicate.",
      cover: "bg-gradient-to-br from-gray-600 to-black"
    },
    {
      id: 3,
      title: "The Mystic's Call - Script",
      series: "Mystic Realms",
      issue: "Issue #5",
      author: "Emma Thompson",
      status: "First Draft",
      lastModified: "2024-01-22",
      pages: 26,
      description: "Early draft of the fifth issue, exploring Zara's journey to protect the realm.",
      cover: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      id: 4,
      title: "Cyber Revolution - Script",
      series: "Cypherpunk Chronicles",
      issue: "Issue #8",
      author: "Jordan Lee",
      status: "Final Draft",
      lastModified: "2024-01-28",
      pages: 28,
      description: "Complete script for the rebellion storyline in Cypherpunk Chronicles.",
      cover: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      id: 5,
      title: "Echo's Resonance - Script",
      series: "Street Justice",
      issue: "Issue #7",
      author: "Marcus Rodriguez",
      status: "In Progress",
      lastModified: "2024-02-01",
      pages: 20,
      description: "Working script for Echo's solo adventure in Street Justice.",
      cover: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      id: 6,
      title: "The Void's Hunger - Script",
      series: "Mystic Realms",
      issue: "Issue #6",
      author: "Emma Thompson",
      status: "Outline",
      lastModified: "2024-02-08",
      pages: 24,
      description: "Story outline for the climactic battle between Zara and Void.",
      cover: "bg-gradient-to-br from-red-600 to-black"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Final Draft': return 'bg-green-600';
      case 'In Review': return 'bg-yellow-600';
      case 'First Draft': return 'bg-blue-600';
      case 'In Progress': return 'bg-orange-600';
      case 'Outline': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Scripts</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {scripts.map((script) => (
            <div key={script.id} className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
              <div className={`h-48 ${script.cover} flex items-center justify-center relative`}>
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-white mb-2">{script.title}</h3>
                  <p className="text-white/80">{script.issue}</p>
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(script.status)}`}>
                  {script.status}
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">{script.description}</p>
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Author:</span>
                    <span className="text-white">{script.author}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Pages:</span>
                    <span className="text-white">{script.pages}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Modified:</span>
                    <span className="text-white">{new Date(script.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 font-medium">{script.series}</span>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    View Script
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
} 