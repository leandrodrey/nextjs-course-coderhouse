"use client";
import {FC} from "react";

interface MainContentProps {
    // Define additional props if needed
}

const MainContent: FC<MainContentProps> = () => {
    return (
        <main className="flex-1 bg-gray-100">
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        {/* Content goes here */}
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
                                    <th scope="col" className="py-3 px-6">
                                        ID
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Title
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Description
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Image
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Category ID
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Category Name
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* Aquí irían las filas de datos generadas dinámicamente */}
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="py-4 px-6">1</td>
                                    <td className="py-4 px-6">Product Title</td>
                                    <td className="py-4 px-6">Product Description</td>
                                    <td className="py-4 px-6">
                                        <img src="image_url.jpg" alt="Product" className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td className="py-4 px-6">$99.99</td>
                                    <td className="py-4 px-6">10</td>
                                    <td className="py-4 px-6">Electronics</td>
                                </tr>
                                {/* Repite las filas según los datos que tengas */}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
