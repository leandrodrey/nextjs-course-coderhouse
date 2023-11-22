import {ReactElement} from "react";
import {getProductByCategory} from "@/services/ProductService";
import ProductsContainer from "@/app/components/ui/ProductsContainer";

export default async function Home(): Promise<ReactElement> {

    const allProducts = await getProductByCategory('all');

    return (
        <>
            <ProductsContainer products={allProducts}/>
        </>
    )
}
