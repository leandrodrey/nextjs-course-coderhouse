'use client'
import {FC, useContext, useEffect, useState} from "react";
import {IProductTable} from "@/interfaces/IProductTable";
import {IProduct, IProductWithCount} from "@/interfaces/IProduct";
import {CartContext} from "@/context/CartProvider";
import ProductsTable from "@/components/ui/ProductsTable";
import ProductsTableCard from "@/components/ui/ProductsTableCard";
import EmptyCart from "@/components/ui/EmptyCart";
import Loader from "@/components/ui/Loader";
import ButtonWithLink from "@/components/ui/ButtonWithLink";
import Link from "next/link";

const ProductsTableContainer: FC<IProductTable> = ({action = 'remove', context = 'cart', products}) => {

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
        return <Loader/>;
    }

    if (!componentProducts.length) {
        if (context === 'cart') {
            return <EmptyCart/>;
        } else if (context === 'admin') {
            return (
                <>
                    <p>There is no product yet.</p>
                    <Link className="text-blue-500 hover:text-blue-700" href="/admin/products/create">Add a product</Link>
                </>
            )
        }
    }

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <ProductsTable products={componentProducts} action={action} context={context}/>
            <ProductsTableCard products={componentProducts} action={action} context={context}/>
            {context === 'cart' && (
                <>
                    <p className="text-lg text-gray-300 mt-4 text-right">Total Order: <span className='text-2xl'>${cart.totalPayment.toFixed(2)}</span></p>
                    <ButtonWithLink url="/cart/checkout" text="Proceed to Checkout"/>
                </>
            )}
        </div>
    );
}

export default ProductsTableContainer;
