import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import ProductModel from '@/models/Products';
import { db } from "@/database";

export async function GET({ params }: { params: { productId: string } }) {
    const { productId } = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({ error: 'Invalid product ID' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    await db.connect();
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await db.disconnect();
    }
}
