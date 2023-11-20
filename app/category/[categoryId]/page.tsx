import { FC } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { IProduct } from "@/interfaces/IProduct";
import ProductsContainer from "@/app/components/ui/ProductsContainer";
import data from "@/app/items.json";

export const metadata: Metadata = {
    title: 'Productos por categoría',
    description: 'Productos filtrados por categoría',
}

interface ProductCategoryProps {
    params: {
        categoryId: number;
    };
}

const ProductCategory: FC<ProductCategoryProps> = ({ params }) => {

    const filteredProducts: IProduct[] = data.filter((item) =>
        Number(item.categoryId) === Number(params.categoryId)
    );

    if (!filteredProducts.length) {
        return <div>Productos no encontrados</div>;
    }

    return (
        <ProductsContainer products={filteredProducts} />
    )
};

export default ProductCategory;
