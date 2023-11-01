import {FC} from "react";

interface ProductCardProps {
    name: string;
    image: string;
    description: string;
}

const ProductCard:FC<ProductCardProps> = ({name, image , description }) => {

    const maxLength = 100;
    const descriptionShort = description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;

    return (
        <div className="bg-stone-900 bg-opacity-90 shadow rounded-lg p-4">
            <img alt={`Imagen del producto: ${name}`}
                src={image}
                className="max-w-full h-auto rounded-lg"
            />
            <div className="px-1 py-2">
                <h2 className="text-lg mb-2 text-blue-300">{name}</h2>
                <p className="text-white-700 mb-4 text-sm">{descriptionShort}</p>
                <div className="flex justify-between items-center">
                    <button className="bg-blue-300 text-black text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-600 hover:text-white" role="button">Comprar</button>
                    <a href={`/product/${name}`} className="text-blue-900 text-sm transition duration-300 hover:text-blue-600" role="link">Ver más</a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
