import { isConnected } from "@/lib/mongoose";

export const GET = async () => {
  const dbConneted = isConnected;
  return new Response(JSON.stringify({
    message: 'API is ready and working',
    DBConnected: dbConneted()
   }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
