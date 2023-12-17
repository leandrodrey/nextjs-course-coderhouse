'use client'
import {FC, useContext, useEffect, useState} from "react";
import {IProductTable} from "@/interfaces/IProductTable";
import {IProduct, IProductWithCount} from "@/interfaces/IProduct";
import {CartContext} from "@/context/CartProvider";
import ProductsTable from "@/components/ui/ProductsTable";
import ProductsTableCard from "@/components/ui/ProductsTableCard";
import EmptyCart from "@/components/ui/EmptyCart";
import Loader from "@/components/ui/Loader";

const ProductsTableContainer:FC<IProductTable> = ({action= 'remove', context= 'cart', products}) => {

    const {cart} = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);
    const [componentProducts, setComponentProducts] = useState<IProductWithCount[] | IProduct[]>([]);

    useEffect(() => {
        const newComponentProducts = context === 'cart' ? cart.items as IProductWithCount[] : products as IProduct[];
        setComponentProducts(newComponentProducts);
        if (newComponentProducts) {
            setIsLoading(false);
        }
    }, [cart.items, products, context]);

    if (isLoading) {
        return <Loader />;
    }

    if (!componentProducts.length) {
        if (context === 'cart') {
            return <EmptyCart />;
        } else if (context === 'admin') {
            return ("TODO - Add a message for empty products")
        }
    }

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <ProductsTable products={componentProducts} action={action} context={context} />
            <ProductsTableCard products={componentProducts} action={action} context={context} />
            <p className="text-lg text-gray-300 mt-4 text-right">Total Order: <span className='text-2xl'>${cart.totalPayment.toFixed(2)}</span></p>
        </div>
    );
}

export default ProductsTableContainer;
