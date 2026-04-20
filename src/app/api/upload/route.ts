// import { NextResponse } from 'next/server';
// import { writeFile, mkdir } from 'fs/promises';
// import { join } from 'path';
// import { existsSync } from 'fs';

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as File | null;

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Ensure the upload directory exists
//     const uploadDir = join(process.cwd(), 'public', 'upload');
//     if (!existsSync(uploadDir)) {
//       await mkdir(uploadDir, { recursive: true });
//     }

//     // Create a unique filename
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`;
//     const path = join(uploadDir, filename);

//     await writeFile(path, buffer);
//     const imageUrl = `/upload/${filename}`;

//     return NextResponse.json({ imageUrl });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload directly to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',           // ya 'private' if needed
      addRandomSuffix: true,      // unique name ke liye
    });

    return NextResponse.json({ 
      imageUrl: blob.url,         // yeh direct public URL milega
      blob 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}