import {ReactElement} from "react";
import {getProductByCategory} from "@/services/ProductService";
import ProductsContainer from "@/app/components/ui/ProductsContainer";
import {IProduct} from "@/interfaces/IProduct";

export default async function Home(): Promise<ReactElement> {

    const allProducts: IProduct[] = await getProductByCategory('all');

    return (
        <>
            <ProductsContainer products={allProducts}/>
        </>
    )
}
