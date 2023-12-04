'use client'
import ProductsTableCard from "@/app/components/ui/ProductsTableCard";
import ProductsTable from "@/app/components/ui/ProductsTable";
import {FC, useContext} from "react";
import {CartContext} from "@/context/CartProvider";
import {IProductsTable} from "@/interfaces/IProductTable";

const ProductsTableContainer:FC<IProductsTable> = ({action= 'remove', context= 'cart'}) => {

    const {cart} = useContext(CartContext);

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <ProductsTable action={action} context={context} />
            <ProductsTableCard action={action} context={context} />
            <p className="text-lg text-gray-300 mt-4 text-right">Total: <span className='text-2xl'>${cart.totalPayment.toFixed(2)}</span></p>
        </div>
    );
}

export default ProductsTableContainer;
