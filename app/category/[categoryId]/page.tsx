import {FC, Suspense} from "react";
import type { Metadata } from 'next'
import { IProduct } from "@/interfaces/IProduct";
import ProductsContainer from "@/app/components/ui/ProductsContainer";

export const metadata: Metadata = {
    title: 'Productos por categoría',
    description: 'Productos filtrados por categoría',
}

async function getProductByCategory(category: number | string) {
    const res = await fetch(`http://localhost:3000/api/products/category/${category}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}

interface ProductCategoryProps {
    params: {
        category: number | string;
    };
}

const ProductCategory: FC<ProductCategoryProps> = async ({ params }) => {

    const {category} = params;

    const filteredProducts = await getProductByCategory(category);

    if (!filteredProducts.length) {
        return <div>Productos no encontrados</div>;
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductsContainer products={filteredProducts} />
            </Suspense>
        </>
    )
};

export default ProductCategory;
