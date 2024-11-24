import { NextRequest } from 'next/server';

// Can use GET and input data with query params
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const color = searchParams.get('color');
  const month = searchParams.get('month');
  const subject = searchParams.get('subject');

  // Perform database search using the query parameter
  // const results = await functionFromlibFolder(color, date, name);

  // return new Response(JSON.stringify({ results }), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' },
  // });
};


// Can use POST and input data with body
export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const { color, month, subject } = data;

  // Perform database search using the query parameter
  // const results = await functionFromlibFolder(color, date, name);

  // return new Response(JSON.stringify({ results }), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' },
  // });
};
