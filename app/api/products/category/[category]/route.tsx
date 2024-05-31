import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/ProductService';

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
    const { category } = params;

    const products = await productService.getProductsByCategory(category);

    if (!products) {
        return new NextResponse(
            JSON.stringify({ error: category === 'all' ? 'No products available' : `No products found in the '${category}' category.` }),
            { status: 404 }
        );
    }

    return new NextResponse(JSON.stringify(products), { status: 200 });
}
