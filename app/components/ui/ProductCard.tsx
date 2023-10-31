import {FC} from "react";

interface ProductCardProps {
    name: string;
    image: string;
    description: string;
}

const ProductCard:FC<ProductCardProps> = ({name, image , description }) => {
    return (
        <>
            <div className="bg-white shadow rounded-lg p-4">
                <img alt={name} src={{ image }} />
                <h2 className="text-lg mb-2 text-blue-400">{ name }</h2>
                <p className="text-gray-700 mb-4 text-sm">{ description }</p>
                <button className="bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600">Comprar</button>
            </div>
        </>
    )
}

export default ProductCard;
