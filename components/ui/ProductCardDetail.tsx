'use client'
import {FC} from "react";
import Link from "next/link";
import {IProductWithCategory} from "@/interfaces/IProduct";
import AddToCart from "@/components/ui/AddToCart";
import Slider from "@/components/ui/Slider";

interface ProductCardDetailProps {
    product: IProductWithCategory
}

const ProductCardDetail: FC<ProductCardDetailProps> = ({product}) => {

    const images = [product.image, product.image, product.image]

    return (
        <div className="md:flex md:items-stretch">
            <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-4 md:mb-0">
                <Slider title={product.title} images={images} />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 bg-stone-900 bg-opacity-90 rounded-lg p-6 shadow-xl flex flex-col justify-between">
                <div className="">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
                        <h1 className="text-3xl font-bold text-blue-300 mb-3">{product.title}</h1>
                        <span className="text-3xl text-gray-100">${product.price}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                        <Link href={`/category/${product.categoryName}`}>
                                <span className="capitalize px-2 py-1 bg-blue-200 text-blue-900 text-sm font-semibold rounded-full transition duration-300 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                                    {product.categoryName}
                                </span>
                        </Link>
                        <AddToCart product={product}/>
                    </div>
                    <div className="flex flex-row-reverse items-center mt-4">
                        <span className="text-gray-300 text-sm">Stock: {product.stock}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCardDetail;
