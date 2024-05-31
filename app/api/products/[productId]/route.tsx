import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/ProductService'; // Importar el servicio

export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
    const { productId } = params;

    const product = await productService.getProductById(productId);
    if (!product) {
        return new NextResponse(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(product), { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: { productId: string } }) {
    const { productId } = params;
    const productData = await request.json();

    const updatedProduct = await productService.updateProduct(productId, productData);
    if (!updatedProduct) {
        return new NextResponse(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(updatedProduct), { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
    const { productId } = params;

    const deleted = await productService.deleteProductById(productId);
    if (!deleted) {
        return new NextResponse(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    return new NextResponse(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
}
