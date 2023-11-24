import { IProduct } from "@/interfaces/IProduct";

export async function getProductById(productId: number): Promise<IProduct> {
    const res = await fetch(`${process.env.API_PRODUCTS_URL}/${productId}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export async function getProductByCategory(category: number | string): Promise<IProduct[]> {
    const res = await fetch(`${process.env.API_PRODUCTS_URL}/category/${category}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}
