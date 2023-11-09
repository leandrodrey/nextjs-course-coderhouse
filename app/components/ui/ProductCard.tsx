import {FC} from "react";
import Image from "next/image";
import Link from "next/link";
import {Product} from "@/app/interfaces/product";
import CloudinaryImage from "@/app/services/CloudinaryImage";
import Button from "@/app/components/ui/Button";

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({product}) => {

    const maxLength = 100;
    const descriptionShort = product.description.length > maxLength ? `${product.description.substring(0, maxLength)}...` : product.description;

    const productImage = CloudinaryImage(product.image);

    return (
        <div className="bg-stone-900 bg-opacity-90 shadow rounded-lg p-4 min-w-[300px] max-w-[400px] w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Link href={`/detail/${product.id}`} className="transition duration-300 hover:text-blue-600" role="link">
                <Image
                    src={productImage}
                    alt={`Imagen del producto: ${product.title}`}
                    width={640}
                    height={360}
                    className="max-w-full h-auto rounded-lg"
                />
            </Link>
            <div className="px-1 py-2">
                <div className={"flex justify-between items-center mb-3"}>
                    <h2 className="text-lg text-blue-300">
                        <Link href={`/detail/${product.id}`} className="transition duration-300 hover:text-blue-600" role="link">
                            {product.title}
                        </Link>
                    </h2>

                    <Link href={`/category/${product.categoryName}`}
                        className="px-2 py-1 bg-blue-200 text-blue-900 text-sm font-semibold rounded-full transition duration-300 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                        role="link">
                        {product.categoryName}
                    </Link>
                </div>
                <p className="text-white-700 mb-4 text-sm">{descriptionShort}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Button text="Comprar"/>
                        <p className="text-gray-300 text-lg font-bold ml-2">${product.price}</p>
                    </div>
                    <Link href={`/detail/${product.id}`} className="text-blue-900 text-sm transition duration-300 hover:text-blue-600" role="link">Ver más</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
