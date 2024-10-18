import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), 'data', 'admin.json');
    // Read the JSON file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);

    // Return the JSON content
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
