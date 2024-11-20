import { type NextRequest } from 'next/server'

// POST route to upload csv file to be cleaned and uploaded to db via lib/mongoose.tsx
export const POST = async (req: NextRequest, res:Response) => {
  const data = req.body;
  // Create function in lib folder to handle cleaning and uploading file data
  return new Response(JSON.stringify({ message: 'API is ready and working' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
