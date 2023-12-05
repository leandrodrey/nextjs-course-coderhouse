import {ReactElement} from "react";
import ProductsTableContainer from "@/app/components/ui/ProductsTableContainer";

export const dynamic = 'force-dynamic';

export default function Cart(): ReactElement {

    return (
        <>
            <div className="container mx-auto mt-10 md:p-5">
                <h1 className='mb-2 text-3xl'>Carrito de Compras</h1>
                <ProductsTableContainer action='remove' context='cart' />
            </div>
        </>
    )
}
