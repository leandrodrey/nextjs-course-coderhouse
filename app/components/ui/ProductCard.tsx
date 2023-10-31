import {FC} from "react";

const ProductCard:FC = () => {
    return (
        <>
            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-bold mb-2 text-blue-400">Producto 1</h2>
                <p className="text-gray-700 mb-4">Descripción del producto 1.</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Comprar</button>
            </div>
        </>
    )
}

export default ProductCard;
