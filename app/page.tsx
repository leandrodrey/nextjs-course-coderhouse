import {ReactElement} from "react";
import ProductContainer from "@/app/components/ui/ProductContainer";

export default function Home(): ReactElement {
    return (
        <>
            <h1 className="text-base font-bold"> Next.js + Tailwind CSS</h1>
            <ProductContainer />
        </>
    )
}
