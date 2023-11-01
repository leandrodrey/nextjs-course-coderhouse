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
        <div className="bg-white shadow rounded-lg p-4">
            <img alt={`Imagen del producto: ${name}`}
                src={image}
                className="max-w-full h-auto rounded-lg"
            />
            <div className="px-1 py-2">
                <h2 className="text-lg mb-2 text-blue-400">{name}</h2>
                <p className="text-gray-700 mb-4 text-sm">{descriptionShort}</p>
                <div className="flex justify-between items-center">
                    <button className="bg-blue-500 text-white text-sm py-1 px-2 rounded transition duration-300 hover:bg-blue-800" role="button">Comprar</button>
                    <a href={`/product/${name}`} className="text-blue-400 text-sm transition duration-300 hover:text-blue-600" role="link">Ver más</a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
