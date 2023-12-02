'use client'
import {FC, useContext} from "react";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudinaryImage from "@/services/CloudinaryImage";
import {CartContext} from "@/context/CartProvider";
import {IProduct, IProductWithCount} from "@/interfaces/IProduct";

const CartTable: FC = () => {

    const {cart, dispatch} = useContext(CartContext);

    const removeItemFromCart = (product: IProduct) => {
        dispatch({
            type: 'REMOVE_ITEM_FROM_CART',
            payload: product
        });
    }

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="hidden md:block w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">ID</th>
                    <th scope="col" className="py-3 px-6">Title</th>
                    <th scope="col" className="py-3 px-6 hidden sm:table-cell">Description</th>
                    <th scope="col" className="py-3 px-6 hidden lg:table-cell">Image</th>
                    <th scope="col" className="py-3 px-6">Price</th>
                    <th scope="col" className="py-3 px-6">Count</th>
                    <th scope="col" className="py-3 px-6">Subtotal</th>
                    <th scope="col" className="py-3 px-6">Remove</th>
                </tr>
                </thead>
                <tbody>
                {cart.items.map((product: IProductWithCount) => (
                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-700">
                        <td className="py-4 px-6">{product.id}</td>
                        <td className="py-4 px-6">{product.title}</td>
                        <td className="py-4 px-6 hidden sm:table-cell">{`${product.description.substring(0, 100)}...`}</td>
                        <td className="py-4 px-6 hidden lg:table-cell">
                            <Image
                                src={CloudinaryImage(product.image)}
                                alt={`Imagen del producto: ${product.title}`}
                                width={640}
                                height={360}
                                className="w-10 h-10 rounded-full"
                                placeholder="blur"
                                blurDataURL={CloudinaryImage(product.image)}
                            />
                        </td>
                        <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                        <td className="py-4 px-6">{product.count}</td>
                        <td className="py-4 px-6">${(product.price * product.count).toFixed(2)}</td>
                        <td className="py-4 px-6">
                            <DeleteIcon className='text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer' onClick={() => removeItemFromCart(product)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="text-lg text-gray-300 mt-4 text-right">Total del Pedido: <span className='text-2xl'>${cart.totalPayment.toFixed(2)}</span></p>
        </div>
    );
}

export default CartTable;
