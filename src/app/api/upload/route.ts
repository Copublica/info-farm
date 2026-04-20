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

    // Optional but recommended: File validation
    if (file.size > 10 * 1024 * 1024) { // 10 MB limit
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',           // Public URL chahiye toh 'public' rakho
      addRandomSuffix: true,      // Unique naam ke liye (recommended)
    });

    console.log('✅ Image uploaded successfully:', blob.url);

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,         // Yeh URL directly <img> tag mein use kar sakte ho
      blob,                       // Extra info (pathname, size, etc.) debug ke liye
    });

  } catch (error: any) {
    console.error('❌ Vercel Blob Upload Error:', error);

    let errorMessage = 'Internal Server Error';

    if (error?.message?.includes('token') || error?.message?.includes('No token found')) {
      errorMessage = 'Blob token missing. Please check BLOB_READ_WRITE_TOKEN in environment variables.';
    } else if (error?.message?.includes('size')) {
      errorMessage = 'File too large or invalid.';
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}