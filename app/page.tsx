import {ReactElement} from "react";
import {IProduct} from "@/interfaces/IProduct";
import { productService } from '@/services/ProductService';
import ProductsList from "@/components/ui/ProductsList";

export default async function Home(): Promise<ReactElement> {

    const allProducts: IProduct[]| null  = await productService.getProductsByCategory('all');
    const data = JSON.parse(JSON.stringify(allProducts))

    if (!allProducts) {
        return <div>Products Not Found</div>;
    }

    return (
        <>
            <ProductsList products={data}/>
        </>
    )
}
