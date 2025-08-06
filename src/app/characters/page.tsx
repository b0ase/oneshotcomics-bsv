import { getCharacters } from '@/lib/data';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';

export default async function CharactersPage() {
  const characters = await getCharacters();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-bangers text-4xl font-bold mb-8 text-center" style={{
        textShadow: '-2px 2px 0px var(--color-orange), -4px 4px 0px var(--color-navy)'
      }}>
        Character Library
      </h1>
      
      {characters.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🦸‍♂️</div>
          <h2 className="text-2xl font-semibold mb-4">No Characters Available</h2>
          <p className="text-gray-300">Check back soon for new characters!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {characters.map((character) => (
            <div 
              key={character.id} 
              className={`card hover:scale-105 transition-all duration-300 ${
                character.is_new ? 'character-new' : ''
              }`}
            >
              {/* Clickable Character Image/Info */}
              <Link href={`/characters/${character.series.toLowerCase().replace(/\s+/g, '-')}/${character.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                <div className="h-64 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center relative overflow-hidden rounded-t-lg cursor-pointer">
                  {character.avatar_image ? (
                    <ImageWithFallback
                      src={character.avatar_image}
                      alt={character.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="text-center px-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{character.name}</h3>
                      <p className="text-lg text-white/80">{character.alias}</p>
                    </div>
                  )}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                    character.alignment === 'Hero' ? 'bg-green-600' :
                    character.alignment === 'Anti-Hero' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {character.alignment}
                  </div>
                </div>
              </Link>
              
              <div className="p-6">
                <Link href={`/characters/${character.series.toLowerCase().replace(/\s+/g, '-')}/${character.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                  <h3 className="font-bangers text-xl font-bold mb-2 hover:text-orange transition-colors" style={{
                    textShadow: '1px 1px 0 var(--color-navy)'
                  }}>
                    {character.name}
                  </h3>
                </Link>
                <p className="text-orange font-medium mb-2">{character.alias}</p>
                <p className="text-gray-300 mb-4 leading-relaxed font-system line-clamp-3">
                  {character.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-bangers text-lg font-bold mb-2" style={{
                    textShadow: '1px 1px 0 var(--color-navy)'
                  }}>
                    Powers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {character.powers.slice(0, 2).map((power, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-sm text-purple-300"
                      >
                        {power}
                      </span>
                    ))}
                    {character.powers.length > 2 && (
                      <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-sm text-purple-300">
                        +{character.powers.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300 font-medium">{character.series}</span>
                    <Link 
                      href={`/characters/${character.series.toLowerCase().replace(/\s+/g, '-')}/${character.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-orange hover:text-orange/80 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                  
                  {/* Story Generator Button */}
                  <Link 
                    href={`/story-generator?character=${character.id}`}
                    className="btn btn-primary text-center"
                  >
                    🎭 Send to Story Generator
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 