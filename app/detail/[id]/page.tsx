import {FC} from "react";
/*import type {Metadata, ResolvingMetadata} from 'next';*/
import Image from 'next/image';
import Link from "next/link";
import {IProductWithCategory} from "@/interfaces/IProduct";
import CloudinaryImage from "@/services/CloudinaryImage";
import {getProductById} from "@/services/ProductService";
import AddToCart from "@/app/components/ui/AddToCart";

export const dynamic = 'force-dynamic';

/*type Props = {
    params: { id: number }
    searchParams: { [key: string]: string | string[] | undefined }
}*/

/*export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const {id} = params;
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
}*/

interface ProductDetailProps {
    params: {
        id: number;
    };
}

const ProductDetail: FC<ProductDetailProps> = async ({params}) => {

    const {id} = params;
    const product: IProductWithCategory = await getProductById(id);

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
                            <Link href={`/category/${product.categoryName}`}>
                                <span className="capitalize px-2 py-1 bg-blue-200 text-blue-900 text-sm font-semibold rounded-full transition duration-300 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                                    {product.categoryName}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <AddToCart product={product}/>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
