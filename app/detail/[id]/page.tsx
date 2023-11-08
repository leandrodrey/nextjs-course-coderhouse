import {FC} from "react";
import Image from 'next/image'
import {Product} from "@/app/interfaces/product";
import data from "@/app/items.json";
import CloudinaryImage from "@/app/services/CloudinaryImage";

interface ProductDetailProps {
    params: {
        id: number;
    };
}

const ProductDetail: FC<ProductDetailProps> = ({params}) => {
    const product: Product | undefined = data.find((item) => Number(item.id) === Number(params.id));

    if (!product) {
        return <div className="text-center text-xl text-red-500 p-5">Producto no encontrado</div>;
    }

    const image = CloudinaryImage(product.image);

    return (
        <div className="max-w-5xl mx-auto p-5">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <Image
                    src={image}
                    alt={`Imagen de ${product.title}`}
                    width={640}
                    height={360}
                    className="w-full object-cover"
                />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold text-gray-800 mr-3">{product.title}</h1>
                        <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm">
                            {product.categoryName}
                        </span>
                    </div>
                    <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Comprar
                        </button>
                        <span className="text-xl font-bold text-gray-800">${product.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
