import { FC } from 'react';
import { IProduct } from '@/interfaces/IProduct';
import Image from 'next/image';
import CloudinaryImage from "@/services/CloudinaryImage";

interface CartProps {
    cartItems: IProduct[];
}

const Cart: FC<CartProps> = ({ cartItems }) => {
    return (
        <div className="flex flex-col justify-center items-center p-1 md:p-4 md:gap-4 ">
            <div className="p-2 w-1/2">
                <h2 className="text-2xl font-bold text-gray-300 mb-6">Carrito de Compras</h2>
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-300">Tu carrito está vacío</div>
                ) : (
                    <>
                        <div>
                            {cartItems.map((item) => (
                                <div key={item._id.toString()} className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <Image src={`${CloudinaryImage(item.image)}`} alt={item.title} width={60} height={60} className="rounded-md"/>
                                        <div className="ml-4">
                                            <p className="text-gray-300 font-semibold">{item.title}</p>
                                            <p className="text-gray-200 text-sm">${item.price}</p>
                                        </div>
                                    </div>
                                    <button className="text-red-500 hover:text-red-600">
                                        trash
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4 mb-3.5 text-3xl">
                            <p className="text-gray-300 font-semibold">Total</p>
                            <p className="text-gray-200">
                                ${cartItems.reduce((a, c) => a + c.price, 0).toFixed(2)}
                            </p>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Checkout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
