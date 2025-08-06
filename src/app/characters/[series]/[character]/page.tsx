import { getCharacters } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImageWithFallback from '@/components/ImageWithFallback';

interface CharacterPageProps {
  params: Promise<{
    series: string;
    character: string;
  }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { series, character: characterParam } = await params;
  const characters = await getCharacters();
  
  // Convert URL parameters to proper format
  const seriesName = decodeURIComponent(series).replace(/-/g, ' ');
  const characterName = decodeURIComponent(characterParam).replace(/-/g, ' ');
  
  // Handle case variations for series names - be more flexible with matching
  const seriesNameVariations = [
    seriesName,
    seriesName.charAt(0).toUpperCase() + seriesName.slice(1),
    seriesName.toLowerCase(),
    seriesName.toUpperCase(),
    // Add title case variations
    seriesName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
    // Add variations with different spacing
    seriesName.replace(/\s+/g, ' ').trim()
  ];
  
  // Find character by series and name - use more flexible matching
  const character = characters.find(c => {
    const seriesMatch = seriesNameVariations.some(variant => 
      c.series.toLowerCase() === variant.toLowerCase()
    );
    const nameMatch = c.name.toLowerCase() === characterName.toLowerCase();
    return seriesMatch && nameMatch;
  });

  // Debug logging
  console.log('URL params:', { series, character: characterParam });
  console.log('Processed names:', { seriesName, characterName, seriesNameVariations });
  console.log('Available characters:', characters.map(c => ({ series: c.series, name: c.name })));
  console.log('Found character:', character);

  if (!character) {
    console.log('Character not found, returning 404');
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/characters" 
          className="inline-flex items-center mb-8 text-orange hover:text-orange/80 transition-colors font-system"
        >
          ← Back to Character Library
        </Link>

        {/* Character Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
                      {/* Character Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden">
              {character.avatar_image ? (
                <ImageWithFallback
                  src={character.avatar_image}
                  alt={character.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-2">{character.name}</h2>
                    <p className="text-xl text-white/80">{character.alias}</p>
                  </div>
                </div>
              )}
            </div>
            {character.is_new && (
              <div className="absolute -top-2 -right-2 bg-orange text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                NEW
              </div>
            )}
          </div>

          {/* Character Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-bangers text-4xl font-bold mb-2" style={{
                textShadow: '-2px 2px 0px var(--color-orange), -4px 4px 0px var(--color-navy)'
              }}>
                {character.name}
              </h1>
              <p className="text-2xl text-orange font-medium mb-4">{character.alias}</p>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                character.alignment === 'Hero' ? 'bg-green-600' :
                character.alignment === 'Anti-Hero' ? 'bg-yellow-600' : 'bg-red-600'
              }`}>
                {character.alignment}
              </div>
            </div>

            <div>
              <h3 className="font-bangers text-xl font-bold mb-2" style={{
                textShadow: '1px 1px 0 var(--color-navy)'
              }}>
                Series
              </h3>
              <p className="text-purple-300 font-medium">{character.series}</p>
            </div>

            <div>
              <h3 className="font-bangers text-xl font-bold mb-2" style={{
                textShadow: '1px 1px 0 var(--color-navy)'
              }}>
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed font-system">{character.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href={`/story-generator?character=${character.id}`}
                className="btn btn-primary text-center"
              >
                🎭 Send to Story Generator
              </Link>
              <button className="btn btn-secondary">
                📖 View Stories
              </button>
            </div>
          </div>
        </div>

        {/* Powers Section */}
        <div className="mb-12">
          <h2 className="font-bangers text-2xl font-bold mb-6" style={{
            textShadow: '1px 1px 0 var(--color-navy)'
          }}>
            Powers & Abilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {character.powers.map((power, index) => (
              <div 
                key={index}
                className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4"
              >
                <h3 className="font-bangers text-lg font-bold mb-2 text-purple-300">
                  {power}
                </h3>
                <p className="text-gray-400 text-sm">
                  Mastery level: Advanced
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Character Gallery */}
        <div className="mb-12">
          <h2 className="font-bangers text-2xl font-bold mb-6" style={{
            textShadow: '1px 1px 0 var(--color-navy)'
          }}>
            Character Gallery
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Main Image */}
            <div className="space-y-2">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden">
                <img
                  src={character.avatar_image}
                  alt={`${character.name} - Main`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-center text-sm font-medium text-purple-300">Main Portrait</p>
            </div>

            {/* Pose 1 */}
            <div className="space-y-2">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={`/character-images/${character.series.toLowerCase().replace(/\s+/g, '-')}/${character.name.toLowerCase().replace(/\s+/g, '-')}/pose-1/${character.name.toLowerCase().replace(/\s+/g, '-')}-pose-1-main.jpg`}
                  alt={`${character.name} - Pose 1`}
                  className="w-full h-full object-cover object-top"
                  placeholder="/generate-image-placeholder.svg"
                />
              </div>
              <p className="text-center text-sm font-medium text-purple-300">Action Pose 1</p>
            </div>

            {/* Pose 2 */}
            <div className="space-y-2">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={`/character-images/${character.series.toLowerCase().replace(/\s+/g, '-')}/${character.name.toLowerCase().replace(/\s+/g, '-')}/pose-2/${character.name.toLowerCase().replace(/\s+/g, '-')}-pose-2-main.jpg`}
                  alt={`${character.name} - Pose 2`}
                  className="w-full h-full object-cover object-top"
                  placeholder="/generate-image-placeholder.svg"
                />
              </div>
              <p className="text-center text-sm font-medium text-purple-300">Action Pose 2</p>
            </div>

            {/* Pose 3 */}
            <div className="space-y-2">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={`/character-images/${character.series.toLowerCase().replace(/\s+/g, '-')}/${character.name.toLowerCase().replace(/\s+/g, '-')}/pose-3/${character.name.toLowerCase().replace(/\s+/g, '-')}-pose-3-main.jpg`}
                  alt={`${character.name} - Pose 3`}
                  className="w-full h-full object-cover object-top"
                  placeholder="/generate-image-placeholder.svg"
                />
              </div>
              <p className="text-center text-sm font-medium text-purple-300">Action Pose 3</p>
            </div>
          </div>
        </div>

        {/* Related Characters */}
        <div className="mb-12">
          <h2 className="font-bangers text-2xl font-bold mb-6" style={{
            textShadow: '1px 1px 0 var(--color-navy)'
          }}>
            Other Characters in {character.series}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters
              .filter(c => c.series === character.series && c.id !== character.id)
              .slice(0, 3)
              .map((relatedCharacter) => (
                <Link 
                  key={relatedCharacter.id}
                  href={`/characters/${relatedCharacter.series.toLowerCase().replace(/\s+/g, '-')}/${relatedCharacter.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="card hover:scale-105 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 rounded-t-lg overflow-hidden">
                    {relatedCharacter.avatar_image ? (
                      <ImageWithFallback
                        src={relatedCharacter.avatar_image}
                        alt={relatedCharacter.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-white mb-1">{relatedCharacter.name}</h3>
                          <p className="text-sm text-white/80">{relatedCharacter.alias}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bangers text-lg font-bold mb-1">{relatedCharacter.name}</h3>
                    <p className="text-sm text-orange">{relatedCharacter.alias}</p>
                    <div className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                      relatedCharacter.alignment === 'Hero' ? 'bg-green-600' :
                      relatedCharacter.alignment === 'Anti-Hero' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      {relatedCharacter.alignment}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-purple-500/30">
          <Link 
            href="/characters" 
            className="text-orange hover:text-orange/80 transition-colors font-system"
          >
            ← All Characters
          </Link>
          <Link 
            href={`/series/${character.series.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-orange hover:text-orange/80 transition-colors font-system"
          >
            View {character.series} Series →
          </Link>
        </div>
      </div>
    </div>
  );
} 