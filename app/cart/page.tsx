import {ReactElement} from "react";
import ProductsTableContainer from "@/components/ui/ProductsTableContainer";

export const dynamic = 'force-dynamic';

export default function Cart(): ReactElement {

    return (
        <>
            <h1 className='mb-5 text-3xl'>Shopping Cart</h1>
            <ProductsTableContainer action='remove' context='cart' />
        </>
    )
}
