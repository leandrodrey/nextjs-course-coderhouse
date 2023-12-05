"use client";
import {FC} from "react";
import Link from "next/link";
import {IProduct} from "@/interfaces/IProduct";
import ProductsTableContainer from "@/components/ui/ProductsTableContainer";

interface MainContentProps {
    products: IProduct[];
}

const MainContent: FC<MainContentProps> = ({products}) => {

    return (
        <>
            <div className="flex md:hidden text-black justify-between p-2">
                <Link href="/admin" className="">
                    Productos
                </Link>
                <Link href="/admin" className="">
                    Productos
                </Link>
                <Link href="/admin" className="">
                    Productos
                </Link>
            </div>

            <div className="flex-1">
                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="shadow rounded-lg p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="mb-5 text-3xl text-gray-200">Dashboard</h1>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Add Product
                                </button>
                            </div>
                            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <ProductsTableContainer action="edit" context="admin" products={products} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContent;
