import { FC } from "react";
import { Product } from "@/app/interfaces/product";
import ProductCard from "@/app/components/ui/ProductCard";

interface ProductsContainerProps {
    products: Product[];
}

const ProductsContainer: FC<ProductsContainerProps> = ({ products }) => {

    return (
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product: Product) => (
                <ProductCard key={product.id} name={product.title} image={product.image} description={product.description} />
            ))}
        </div>
    );
};

export default ProductsContainer;
