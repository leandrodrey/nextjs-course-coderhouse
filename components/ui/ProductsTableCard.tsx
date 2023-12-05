import Image from "next/image";
import CloudinaryImage from "@/services/CloudinaryImage";
import EditIcon from "@mui/icons-material/Edit";
import {FC, useContext} from "react";
import {IProduct} from "@/interfaces/IProduct";
import {CartContext} from "@/context/CartProvider";
import {IProductTable} from "@/interfaces/IProductTable";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductsTableCard:FC<IProductTable> = ({action, context, products}) => {

    const {cart, dispatch} = useContext(CartContext);

    const removeItemFromCart = (product: IProduct) => {
        dispatch({
            type: 'REMOVE_ITEM_FROM_CART',
            payload: product
        });
    }

    return (
        <>
            <div className="sm:hidden">
                {products && products.map((product) => (
                    <div key={product.id} className="bg-white text-gray-800 dark:text-gray-500 rounded-lg mt-5 shadow-2xl border-1 border-black">
                        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-t-lg mb-1">
                            <div><strong>ID {product.id}</strong> - {product.title}</div>
                            <Image
                                src={`${CloudinaryImage(product.image)}`}
                                alt={`Imagen del producto: ${product.title}`}
                                width={640}
                                height={360}
                                className="w-20 h-20 rounded-full"
                                placeholder = "blur"
                                blurDataURL={`${CloudinaryImage(product.image)}`}
                            />
                        </div>
                        <div className="p-2">
                            <strong>Description:</strong> {`${product.description.substring(0, 50)}...`}
                        </div>
                        <div className="p-2"><strong>Price:</strong> ${product.price.toFixed(2)}</div>
                        <div className="p-2"><strong>Category ID:</strong> {product.categoryId.toString()}</div>
                        <div className="flex justify-between p-2">
                            <div><strong>Category Name:</strong> {product.categoryName} </div>
                            {action === 'remove' ?
                                (<DeleteIcon className='text-blue-300 hover:text-blue-700 transition duration-300 cursor-pointer' onClick={() => removeItemFromCart(product)}/>) :
                                (<EditIcon className="text-blue-300 hover:text-blue-700 transition duration-300"/>)
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductsTableCard;
