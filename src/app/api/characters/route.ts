import { NextResponse } from 'next/server';
import { getCharacters, createCharacter } from '@/lib/data';

export async function GET() {
  try {
    const characters = await getCharacters();
    return NextResponse.json({
      success: true,
      data: characters,
      count: characters.length
    });
  } catch (error) {
    console.error('Error in GET /api/characters:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch characters' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = ['name', 'alias', 'description', 'powers', 'series', 'alignment'];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newCharacter = await createCharacter({
      name: body.name,
      alias: body.alias,
      description: body.description,
      powers: body.powers,
      series: body.series,
      alignment: body.alignment,
      avatar_image: body.avatar_image || ''
    });

    if (!newCharacter) {
      return NextResponse.json(
        { success: false, error: 'Failed to create character' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newCharacter
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/characters:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create character' },
      { status: 500 }
    );
  }
} 