import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  // Extract the form data
  const name = formData.get('name') as string;
  const number = formData.get('number') as string;
  const address = formData.get('address') as string;
  const document = formData.get('document') as File;

  // Read the existing users from users.json
  const filePath = path.join(process.cwd(), 'data', 'users.json');

  try {
    let fileContents = await fs.readFile(filePath, 'utf-8');
    let users = JSON.parse(fileContents || '[]');

    // Create a new user object
    const newUser = {
      name,
      number,
      address,
      document: document.name, // Only saving the document name for now
    };

    // Append the new user to the array
    users.push(newUser);

    // Write the updated array back to users.json
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ message: 'Error saving user data' }, { status: 500 });
  }
}
