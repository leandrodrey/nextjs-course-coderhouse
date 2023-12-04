"use client"
import React, {FC, useContext} from 'react'
import {CartContext} from "@/context/CartProvider";
import useItemCount from "@/hooks/useItemCount";
import {IProductWithCategory, IProductWithCount} from "@/interfaces/IProduct";

interface AddToCartProps {
    product: IProductWithCategory;
}

const AddToCart:FC<AddToCartProps> = ({product}) => {

    const { dispatch: cartDispatch } = useContext(CartContext);
    const {count, handleSum, handleRest} = useItemCount();

    const addCart = (product: IProductWithCount) => {
        cartDispatch({
            type: 'ADD_TO_CART',
            payload: product,
        });
    };

    return (
        <>
            <div className="my-4">
                <div className="">
                    <div className="flex items-center mt-2">
                        <button onClick={() => handleRest()} className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 hover:text-white">
                            -
                        </button>
                        <span className="mx-2 text-gray-300">{count}</span>
                        <button onClick={() => handleSum()} className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 hover:text-white">
                            +
                        </button>
                    </div>
                </div>
                <div className="flex py-4 justify-between">
                    <button className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 shadow hover:text-white" onClick={() => addCart({...product, count})}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </>
    )
}
export default AddToCart
