import { type NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
const scrubber = require('@/lib/scrubber').scrubber;
const Papa = require('papaparse');


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
    let data = fs.readFileSync(absolutePath, 'utf8');
    if (fileName === 'Episode Dates') {
      // Turns this file into a csv
      const removeComma = data.replaceAll(',', '').replaceAll('"', '').replaceAll(' (', ', ').replaceAll(')', ',');
      data = removeComma;
    }
    console.log(data)
    // Data is a string at this point
    const result = new Promise((resolve, reject) => {
      Papa.parse(data, {
        header: true, // Includes the header row as keys for JSON objects
        complete: (results: JSON, file: String) => {
          // console.log(results)
        }, // Returns parsed data
        error: (error: String) => reject(error),
      });
    });
    scrubber(result);

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
