import { NextRequest, NextResponse } from 'next/server';
import { categoryService } from '@/services/CategoryService';

export async function GET(request: NextRequest): Promise<NextResponse> {

    const categories = await categoryService.getCategories();

    if (!categories) {
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
    }

    return new NextResponse(JSON.stringify(categories), { status: 200 });
}
