import { type NextRequest } from 'next/server'


export const POST = async (req: NextRequest, res:Response) => {
  const data = req.body;
  return new Response(JSON.stringify({ message: 'API is ready and working' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
