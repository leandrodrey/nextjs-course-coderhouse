import {ReactElement} from "react";
import ProductsTableContainer from "@/components/ui/ProductsTableContainer";
import ButtonWithLink from "@/components/ui/ButtonWithLink";

export const dynamic = 'force-dynamic';

export default function Cart(): ReactElement {

    return (
        <>
            <h1 className='mb-5 text-3xl'>Shopping Cart</h1>
            <ProductsTableContainer action='remove' context='cart' />
            <ButtonWithLink url="/cart/checkout" text="Proceed to Checkout" />
        </>
    )
}
