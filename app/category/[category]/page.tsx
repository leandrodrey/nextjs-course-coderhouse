import {FC, Suspense} from "react";
import type {Metadata} from 'next'
import {IProduct} from "@/interfaces/IProduct";
import { productService } from '@/services/ProductService';
import ProductsList from "@/components/ui/ProductsList";
import Loader from "@/components/ui/Loader";

export const metadata: Metadata = {
    title: 'Products by Category',
    description: 'Products filtered by category',
}

interface ProductCategoryProps {
    params: {
        category: number | string;
    };
}

const ProductCategory: FC<ProductCategoryProps> = async ({params}) => {

    const {category} = params;

    const filteredProducts: IProduct[]| null  = await productService.getProductsByCategory(category);
    const data = JSON.parse(JSON.stringify(filteredProducts))

    if (!filteredProducts) {
        return <div>Products Not Found</div>;
    }

    return (
        <>
            <Suspense fallback={<Loader/>}>
                <ProductsList products={data}/>
            </Suspense>
        </>
    )
};

export default ProductCategory;
