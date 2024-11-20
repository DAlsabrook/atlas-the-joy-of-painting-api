import { type NextRequest } from 'next/server'


export const GET = async (req: NextRequest, res:Response) => {
  return new Response(JSON.stringify({ message: 'API is ready and working' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
