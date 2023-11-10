import {ReactElement} from "react";
import ProductsContainer from "@/app/components/ui/ProductsContainer";
import data from "@/app/items.json";

export default function Home(): ReactElement {
    return (
        <>
            <ProductsContainer products={data}/>
        </>
    )
}
