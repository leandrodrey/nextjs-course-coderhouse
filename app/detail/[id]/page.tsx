import {FC} from "react";
import type {Metadata, ResolvingMetadata} from 'next';
import Image from 'next/image';
import Link from "next/link";
import CloudinaryImage from "@/services/CloudinaryImage";
import {getProductById} from "@/services/ProductService";
import {IProduct} from "@/interfaces/IProduct";
import Button from "@/app/components/ui/Button";

type Props = {
    params: { id: number }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    {params}: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const product: IProduct | undefined  = await getProductById(params.id);

    if (!product) {
        return {
            title: "Producto no encontrado",
            description: "El producto solicitado no existe en nuestra base de datos.",
        };
    }

    return {
        title: product.title,
        description: product.description,
        }
}

interface ProductDetailProps {
    params: {
        id: number;
    };
}

const ProductDetail: FC<ProductDetailProps> = async ({params}) => {

    const {id} = params;

    const product: IProduct = await getProductById(id);

    if (!product) {
        return <div className="text-center text-xl text-red-500 p-5">Producto no encontrado</div>;
    }

    const productImage = CloudinaryImage(product.image);

    return (
        <div className="container mx-auto mt-10 md:p-5">
            <div className="md:flex md:items-stretch">
                <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-4 md:mb-0">
                    <Image
                        src={productImage}
                        alt={`Imagen de ${product.title}`}
                        width={640}
                        height={640}
                        className="object-contain"
                        placeholder = "blur"
                        blurDataURL={productImage}
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-2/3 bg-stone-900 bg-opacity-90 rounded-lg p-6 shadow-xl flex flex-col justify-between">
                    <div className="">
                        <h1 className="text-3xl font-bold text-blue-300 mb-3">{product.title}</h1>
                        <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-300">${product.price}</span>
                            <Link href={`/category/${product.categoryId}`}>
                                <span className="px-2 py-1 bg-blue-200 text-blue-900 text-sm font-semibold rounded-full transition duration-300 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                                    {/*{product.categoryName}*/}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="">
                            <div className="flex items-center mt-2">
                                <button className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 hover:text-white">
                                    -
                                </button>
                                <span className="mx-2 text-gray-300">1</span>
                                <button className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 hover:text-white">
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex py-4 justify-between">
                            <Button text="Añadir al carrito"/>
                            <Button text="Comprar ahora"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
