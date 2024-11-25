import { isConnected, connectToAtlas } from '@/lib/mongoose';

export async function GET() {
  await connectToAtlas();

  if (isConnected()) {
    return new Response(JSON.stringify({ message: 'Database connection is established' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Database connection failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
