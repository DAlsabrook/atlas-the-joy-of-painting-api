import { type NextRequest } from 'next/server'
const isConnected = require('../../../lib/mongoose').isConnected

export const GET = async (req: NextRequest, res:Response) => {
  const dbConneted = isConnected;
  return new Response(JSON.stringify({
    message: 'API is ready and working',
    DBConnected: dbConneted()
   }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
