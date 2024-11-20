// pages/api/connect.ts
import type { NextApiRequest, NextApiResponse } from 'next';
const isConnected = require('../../../lib/mongoose').isConnected;
const connectToAtlas = require('../../../lib/mongoose').connectToAtlas;


export async function GET(req: NextApiRequest, res: Response) {
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
