import {FC} from "react";
import Image from 'next/image'
import data from "@/app/items.json";

interface ProductDetailProps {
    params: {
        id: string;
    };
}

interface ProductProps {
    id: string;
    title: string;
    image: string;
    description: string;
}

const ProductDetail:FC<ProductDetailProps> = ({ params }) => {

    const product: ProductProps | undefined = data.find((item) => item.id === params.id);

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <>
            <div className="max-w-5xl mx-auto p-5">
                <h1 className="text-3xl font-bold text-gray-300 mb-3">{product.title}</h1>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={product.image}
                        alt={`Imagen de ${product.title}`}
                        width={640}
                        height={360}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                        <p className="text-black text-base">{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;


