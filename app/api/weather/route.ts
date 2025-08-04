import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  
  if (!apiKey) {
    console.error('Missing API Key: OPENWEATHER_API_KEY is not set in .env.local');
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }
  
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 600 }, 
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch weather data' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API route handler error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}