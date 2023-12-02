"use client"
import {ReactElement, useContext} from "react";
import {CartContext} from "@/context/CartProvider";
import CartTable from "@/app/components/ui/CartTable";

export default function Cart(): ReactElement {

    const {cart} = useContext(CartContext);

    return (
        <>
            <div className="container mx-auto mt-10 md:p-5">
                <h1 className='mb-2'>Carrito de Compras</h1>
                <CartTable cartItems={cart}/>
            </div>
        </>
    )
}
