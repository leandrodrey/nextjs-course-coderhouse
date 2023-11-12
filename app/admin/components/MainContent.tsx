"use client";
import {FC} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {Product} from "@/app/interfaces/product";
import CloudinaryImage from "@/app/services/CloudinaryImage";
import Link from "next/link";

interface MainContentProps {
    products: Product[];
}

const MainContent: FC<MainContentProps> = ({products}) => {

    return (
        <div className="flex-1 bg-gray-100">
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Product
                            </button>
                        </div>
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">ID</th>
                                    <th scope="col" className="py-3 px-6">Title</th>
                                    <th scope="col" className="py-3 px-6 hidden sm:table-cell">Description</th>
                                    <th scope="col" className="py-3 px-6 hidden lg:table-cell">Image</th>
                                    <th scope="col" className="py-3 px-6">Price</th>
                                    <th scope="col" className="py-3 px-6 hidden md:table-cell">Category ID</th>
                                    <th scope="col" className="py-3 px-6 hidden md:table-cell">Category Name</th>
                                    <th scope="col" className="py-3 px-6">Edit</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                                        <td className="py-4 px-6">{product.id}</td>
                                        <td className="py-4 px-6">{product.title}</td>
                                        <td className="py-4 px-6 hidden sm:table-cell">{`${product.description.substring(0, 100)}...`}</td>
                                        <td className="py-4 px-6 hidden lg:table-cell">
                                            <img src={`${CloudinaryImage(product.image)}`} alt={product.title} className="w-10 h-10 rounded-full"/>
                                        </td>
                                        <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                                        <td className="py-4 px-6 hidden md:table-cell">{product.categoryId}</td>
                                        <td className="py-4 px-6 hidden md:table-cell">{product.categoryName}</td>
                                        <td className="py-4 px-6">
                                            <Link href={`/admin/product/${product.id}`} className="text-blue-300 hover:text-blue-700 transition duration-300">
                                                <EditIcon/>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
