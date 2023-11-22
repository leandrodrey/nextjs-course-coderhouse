import {ReactElement} from "react";
import ProductsContainer from "@/app/components/ui/ProductsContainer";

async function getProductByCategory(category: number | string) {
    const res = await fetch(`http://localhost:3000/api/products/category/${category}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

export default async function Home(): Promise<ReactElement> {

    const allProducts = await getProductByCategory('all');

    return (
        <>
            <ProductsContainer products={allProducts}/>
        </>
    )
}
