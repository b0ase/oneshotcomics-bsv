import { NextResponse } from 'next/server';
import { getComics, createComic } from '@/lib/data';

export async function GET() {
  try {
    const comics = await getComics();
    return NextResponse.json({
      success: true,
      data: comics,
      count: comics.length
    });
  } catch (error) {
    console.error('Error in GET /api/comics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comics' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = ['title', 'subtitle', 'series', 'issue', 'price', 'author', 'artist', 'pages', 'status', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    const newComic = await createComic({
      title: body.title,
      subtitle: body.subtitle,
      series: body.series,
      issue: body.issue,
      price: body.price,
      author: body.author,
      artist: body.artist,
      pages: body.pages,
      status: body.status,
      cover_image: body.cover_image || '',
      description: body.description
    });
    if (!newComic) {
      return NextResponse.json(
        { success: false, error: 'Failed to create comic' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      data: newComic
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/comics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create comic' },
      { status: 500 }
    );
  }
} 