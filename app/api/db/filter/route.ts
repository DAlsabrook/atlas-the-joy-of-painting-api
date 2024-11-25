import { NextRequest } from 'next/server';
import { getFromAtlas } from '@/lib/mongoose';

// Can use GET and input data with query params
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const color = searchParams.get('color');
  const month = searchParams.get('month');
  const subject = searchParams.get('subject');

  // Parse the comma-separated values into arrays
  const data = {
    color: color ? color.split(',') : undefined,
    month: month || undefined,
    subject: subject ? subject.split(',') : undefined
  };

  try {
    const results = await getFromAtlas(data);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching from MongoDB:', error);
    return new Response(JSON.stringify({
      message: 'Error fetching from MongoDB',
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Can use POST and input data with body
export const POST = async (req: NextRequest) => {
  const data = await req.json();

  try {
    const results = await getFromAtlas(data);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching from MongoDB:', error);
    return new Response(JSON.stringify({
      message: 'Error fetching from MongoDB',
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Color only
// curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"color": ["bright_red", "cadmium_yellow", "titanium_white"]}'

// Date only
// curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"month": "january"}'

// Subjects only
// curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"subject": ["bushes", "conifer"]}'

// all 3 variables
// curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"color": ["bright_red", "cadmium_yellow"], "month": "january", "subject": ["bushes"]}'

// More specific all 3 variables
// curl -X POST http://localhost:3000/api/db/filter -H "Content-Type: application/json" -d '{"color": ["bright_red", "cadmium_yellow", "titanium_white"], "month": "january", "subject": ["bushes", "conifer"]}'


// Get request with query params
// curl -X GET "http://localhost:3000/api/db/filter?color=bright_red,cadmium_yellow,titanium_white&month=january&subject=bushes,conifer"
