import fs from 'fs';
import { scrubber } from '@/lib/scrubber';
import { uploadToAtlas } from '@/lib/mongoose';
import Papa from 'papaparse'

export interface ParsedData {
  data: Record<string, unknown>[]; // Array of objects representing each row of the CSV
  errors: {
    type: string;
    code: string;
    message: string;
    row: number;
  }[]; // Array of error objects
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
}

export const GET = async () => {
  const fileNames = ["Colors Used.csv", "Episode Dates", "Subject Matter.csv"];
  const allData: Record<string, ParsedData> = {};

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
        complete: (results: Papa.ParseResult<Record<string, unknown>>) => {
          allData[fileName] = {
            ...results,
            errors: results.errors.map(error => ({
              type: error.type,
              code: error.code,
              message: error.message,
              row: error.row ?? -1, // Default to -1 if row is undefined
            })),
          };
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
      return new Response(JSON.stringify({
        message: 'Error uploading files',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      message: 'Files processed successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing files:', error);
    return new Response(JSON.stringify({
      message: 'Error processing files',
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
