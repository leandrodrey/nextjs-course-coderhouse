import {FC} from "react";
import Image from 'next/image'
import {Product} from "@/app/interfaces/product";
import data from "@/app/items.json";
import {Cloudinary} from "@cloudinary/url-gen";

interface ProductDetailProps {
    params: {
        id: number;
    };
}

const ProductDetail: FC<ProductDetailProps> = ({params}) => {

    const product: Product | undefined = data.find((item) => Number(item.id) === Number(params.id));

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    const myCld = new Cloudinary({
        cloud: {
            cloudName: "dmef6dgiq",
        },
    });

    let img = myCld.image(`${product.image}`);

    return (
        <>
            <div className="max-w-5xl mx-auto p-5">
                <h1 className="text-3xl font-bold text-gray-300 mb-3">{product.title}</h1>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={img.toURL()}
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


