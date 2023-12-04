'use client'
import {FC, useContext} from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import {CartContext} from "@/context/CartProvider";

interface CartWidgetProps {
    open: boolean;
}

const CartWidget: FC<CartWidgetProps> = ({ open }) => {

    const {cart} = useContext(CartContext);

    return (
        <>
            <Link href='/cart' className='flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 relative mt-9'>
                <ShoppingCartIcon/>
                <span className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300 capitalize`}>
                    Cart
                </span>
                {cart.items.length > 0 && (
                    <div className='flex'>
                        <div className='ml-2 bg-blue-500 text-white rounded-full w-3 h-3 absolute left-4 top-5'>
                            <span className='text-xs flex justify-center items-center h-full'>
                                {cart.items.length}
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </>
    )
}

export default CartWidget;
