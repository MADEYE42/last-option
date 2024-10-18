import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Path to admin.json
  const filePath = path.join(process.cwd(), 'data', 'admin.json');

  try {
    // Read the file, and if it doesn't exist or is empty, initialize with an empty array
    let fileContents = '[]'; // Default to an empty array if file is empty or invalid
    try {
      fileContents = await fs.readFile(filePath, 'utf-8');
      if (!fileContents.trim()) {
        fileContents = '[]'; // Handle the case where file exists but is empty
      }
    } catch (error) {
      // If the file doesn't exist, we initialize it as an empty array
      console.log('File not found or empty, initializing with an empty array');
    }

    let users = JSON.parse(fileContents);

    // Add new user to users array
    const newUser = { name, email, password };
    users.push(newUser);

    // Write updated users array back to admin.json
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json({ message: 'Error during registration' }, { status: 500 });
  }
}
