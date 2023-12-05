import {FC, Suspense} from "react";
import type { Metadata } from 'next'
import { IProduct } from "@/interfaces/IProduct";
import {getProductByCategory} from "@/services/ProductService";
import ProductsList from "@/components/ui/ProductsList";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Productos por categoría',
    description: 'Productos filtrados por categoría',
}

interface ProductCategoryProps {
    params: {
        category: number | string;
    };
}

const ProductCategory: FC<ProductCategoryProps> = async ({ params }) => {

    const {category} = params;

    const filteredProducts: IProduct[] = await getProductByCategory(category);

    if (!filteredProducts.length) {
        return <div>Productos no encontrados</div>;
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductsList products={filteredProducts} />
            </Suspense>
        </>
    )
};

export default ProductCategory;
