import {ReactElement} from "react";
import data from "@/app/items.json";
import Cart from "@/app/components/ui/Cart";

export default function Home(): ReactElement {
    return (
        <>
            <Cart cartItems={data}/>
        </>
    )
}
