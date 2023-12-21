import {NextRequest, NextResponse} from 'next/server';
import * as formidable from "formidable";
import cloudinary from '@/services/Cloudinary';
import mongoose from "mongoose";

export async function POST(request: NextRequest, {params}: { params: { productId: string } }): Promise<NextResponse> {

    const {productId} = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({error: 'Provided product ID is invalid or malformed.'}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const form = new formidable.IncomingForm();

    return new Promise((resolve, reject) => {
        // @ts-ignore
        form.parse(request, async (err, fields, files) => {
            if (err) {
                reject(new Response(JSON.stringify({ error: 'Error processing the file' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }));
                return;
            }

            if (!files.file) {
                return new NextResponse(JSON.stringify({ error: 'No file uploaded' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            const file = files.file[0];
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(file.filepath, { public_id: productId });
            const imageUrl = cloudinaryResponse.public_id;

            const updateResponse = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageUrl }),
            });

            if (!updateResponse.ok) {
                reject(new Response(JSON.stringify({ error: 'Failed to update product image' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }));
                return;
            }

            const updatedProduct = await updateResponse.json();
            resolve(new NextResponse(JSON.stringify(updatedProduct), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }));
        });
    });

}
