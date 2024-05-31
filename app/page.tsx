import {ReactElement} from "react";
import {IProduct} from "@/interfaces/IProduct";
import { productService } from '@/services/ProductService';
import ProductsList from "@/components/ui/ProductsList";

export default async function Home(): Promise<ReactElement> {

    const allProducts: IProduct[] = await productService.getProductsByCategory('all');

    if (!allProducts) {
        return <div>Products Not Found</div>;
    }

    return (
        <>
            <ProductsList products={allProducts}/>
        </>
    )
}
