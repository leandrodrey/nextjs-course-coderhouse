'use client'
import ProductsTableCard from "@/components/ui/ProductsTableCard";
import ProductsTable from "@/components/ui/ProductsTable";
import {FC, useContext} from "react";
import {CartContext} from "@/context/CartProvider";
import {IProductTable} from "@/interfaces/IProductTable";
import {IProduct, IProductWithCount} from "@/interfaces/IProduct";
import EmptyCart from "@/components/ui/EmptyCart";

const ProductsTableContainer:FC<IProductTable> = ({action= 'remove', context= 'cart', products}) => {

    const {cart} = useContext(CartContext);

    const componentProducts = context === 'cart' ? cart.items as IProductWithCount[] : products as IProduct[];

    if (!componentProducts.length) {
        return <EmptyCart />;
    }

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <ProductsTable products={componentProducts} action={action} context={context} />
            <ProductsTableCard products={componentProducts} action={action} context={context} />
            <p className="text-lg text-gray-300 mt-4 text-right">Total: <span className='text-2xl'>${cart.totalPayment.toFixed(2)}</span></p>
        </div>
    );
}

export default ProductsTableContainer;
