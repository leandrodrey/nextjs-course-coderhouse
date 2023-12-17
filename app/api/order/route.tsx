import { NextRequest, NextResponse } from 'next/server';
import CategoryModel from '@/models/Category';
import { db } from "@/database";

export async function POST(request: NextRequest): Promise<NextResponse> {
    await db.connect();
    try {
        const categories = await CategoryModel.find();
        return new NextResponse(JSON.stringify(categories), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        let errorMessage = 'An error occurred while fetching categories.';
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
