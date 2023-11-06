import {ReactElement} from "react";
import ProductsContainer from "@/app/components/ui/ProductsContainer";
import data from "@/app/items.json";

export default function Home(): ReactElement {
    return (
        <>
            <h1 className="text-base font-bold"> Next.js + Tailwind CSS</h1>
            <ProductsContainer products={data} />
        </>
    )
}
