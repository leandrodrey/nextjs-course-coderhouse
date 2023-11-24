import {ICategory} from "@/interfaces/ICategory";

export async function getAllCategories(): Promise<ICategory[]> {
    const res = await fetch(`${process.env.API_CATEGORIES_URL}, { cache: 'no-store' }`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}
