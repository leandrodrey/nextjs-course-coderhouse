'use client'
import {FC, useState} from "react";
import {CldImage} from "next-cloudinary";
import {PencilIcon, XCircleIcon} from "@heroicons/react/24/solid";
import {confirmAlert} from 'react-confirm-alert';
import {IProduct} from "@/interfaces/IProduct";
import {deleteProductById} from "@/services/ProductService";
import Link from "next/link";
import 'react-confirm-alert/src/react-confirm-alert.css';

interface IProductsTableProps {
    products: IProduct[];
}

const ProductsAdminTable: FC<IProductsTableProps> = ({products}) => {

    const [productsList, setProductsList] = useState<IProduct[]>(products);

    const handleDeleteProduct = async (productId: string, productTitle: string) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui bg-stone-900 p-6'>
                        <h1 className="text-xl">Confirm to delete</h1>
                        <p className="py-2">Are you sure you want to delete <span className="text-blue-600 font-semibold">{productTitle}</span>? This action cannot be undone.</p>
                        <button
                            onClick={async () => {
                                try {
                                    await deleteProductById(productId);
                                    const updatedProducts = productsList.filter(product => product.id !== productId);
                                    setProductsList(updatedProducts);
                                } catch (error) {
                                    console.error('Error deleting product:', error);
                                }
                                onClose();
                            }}
                            className="bg-red-600 rounded py-2 px-6 mr-4 hover:bg-red-400"
                        >
                            Yes
                        </button>
                        <button onClick={onClose} className="bg-gray-600 rounded py-2 px-6 hover:bg-gray-400">No</button>
                    </div>
                );
            }
        });
    };

    return (
        <table className="md:block w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6 hidden lg:table-cell">ID</th>
                <th scope="col" className="py-3 px-6">Title</th>
                <th scope="col" className="py-3 px-6 hidden lg:table-cell">Description</th>
                <th scope="col" className="py-3 px-6 hidden lg:table-cell">Image</th>
                <th scope="col" className="py-3 px-6">Price</th>
                <th scope="col" className="py-3 px-6">Stock</th>
                <th scope="col" className="py-3 px-6">Action</th>
            </tr>
            </thead>
            <tbody>
            {productsList && productsList.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                    <td className="py-4 px-6 hidden lg:table-cell">{product.id}</td>
                    <td className="py-4 px-6">{product.title}</td>
                    <td className="py-4 px-6 hidden lg:table-cell">{`${product.description.substring(0, 100)}...`}</td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                        <CldImage
                            src={`${product.image}`}
                            alt={`Imagen del producto: ${product.title}`}
                            width={640}
                            height={360}
                            className="w-10 h-10 rounded-full"
                            placeholder="blur"
                            blurDataURL="/loading.png"
                        />
                    </td>
                    <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                    <td className="py-4 px-6">{product.stock}</td>
                    <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                            <Link href={`admin/products/edit/${product._id}`}><PencilIcon className="text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer h-6 w-6"/></Link>
                            <XCircleIcon className='text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer h-6 w-6' onClick={() => handleDeleteProduct(product.id, product.title)}/>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProductsAdminTable;
