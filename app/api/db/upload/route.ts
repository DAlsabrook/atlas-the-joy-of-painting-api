import { type NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
const scrubber = require('@/lib/scrubber').scrubber;
const Papa = require('papaparse');
const uploadToAtlas = require('@/lib/mongoose').uploadToAtlas;

export interface ParsedData {
  data: any[];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
}

export const GET = async (req: NextRequest) => {
  const fileNames = ["Colors Used.csv", "Episode Dates", "Subject Matter.csv"];
  let allData: Record<string, ParsedData> = {};

  try {
    for (const fileName of fileNames) {
      const absolutePath = 'public/user_files/' + fileName;
      let data = fs.readFileSync(absolutePath, 'utf8');

      if (fileName === 'Episode Dates') {
        data = data.replaceAll(',', '')
                  .replaceAll('"', '')
                  .replaceAll(' (', ', ')
                  .replaceAll(')', ',')
                  .replaceAll('@', ',');
      }
      data = data.toLowerCase();
      // Parse files to JSON
      Papa.parse(data, {
        header: true,
        complete: (results: ParsedData) => {
          allData[fileName] = results;
        },
        error: (error: Error) => {
          console.error(`Error parsing ${fileName}:`, error);
          throw error;
        },
      });
    }
    const paintingObjects = scrubber(allData)
    const uploaded = await uploadToAtlas(paintingObjects);
    if (!uploaded) {
      return new NextResponse(JSON.stringify({
        message: 'Error uploading files',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify({
      message: 'Files processed successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing files:', error);
    return new NextResponse(JSON.stringify({
      message: 'Error processing files',
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
