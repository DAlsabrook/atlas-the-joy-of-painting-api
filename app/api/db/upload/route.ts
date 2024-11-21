import { type NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
const scrubber = require('@/lib/scrubber').scrubber;

// POST route to upload csv file to be cleaned and uploaded to db via lib/mongoose.ts
export const POST = async (req: NextRequest) => {
  const { fileName } = await req.json();

  if (!fileName) {
    return new NextResponse(JSON.stringify({ message: 'File name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const absolutePath =  'public/user_files/' + fileName;
  try {
    // console.log(absolutePath)
    const data = fs.readFileSync(absolutePath, 'utf8');
    console.log(typeof data)
    // Run function to clean data (data is a string at this point)
    scrubber(data);

    return new NextResponse(JSON.stringify({ message: 'File processed successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing the file:', error);
    return new NextResponse(JSON.stringify({ message: 'Error processing the file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
