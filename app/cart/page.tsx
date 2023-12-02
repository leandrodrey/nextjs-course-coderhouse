"use client"
import {ReactElement, useContext} from "react";
import CartTable from "@/app/components/ui/CartTable";

export const dynamic = 'force-dynamic';

export default function Cart(): ReactElement {

    return (
        <>
            <div className="container mx-auto mt-10 md:p-5">
                <h1 className='mb-2'>Carrito de Compras</h1>
                <CartTable />
            </div>
        </>
    )
}
