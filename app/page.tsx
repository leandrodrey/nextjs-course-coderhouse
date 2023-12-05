import {ReactElement} from "react";
import {getProductByCategory} from "@/services/ProductService";
import ProductsList from "@/components/ui/ProductsList";
import {IProduct} from "@/interfaces/IProduct";

export const dynamic = 'force-dynamic';

export default async function Home(): Promise<ReactElement> {

    const allProducts: IProduct[] = await getProductByCategory('all');

    return (
        <>
            <ProductsList products={allProducts}/>
        </>
    )
}
