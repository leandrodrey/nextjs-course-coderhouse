import {FC} from "react";
import ProductCard from "@/app/components/ui/ProductCard";
import data from "@/app/items.json";

const ProductContainer:FC = () => {
    return (
        <>
            <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
                <ProductCard name="Producto 1" image="" description="Lorem ipsum sit dolor amet" />
            </div>
        </>
    )
}

export default ProductContainer;
