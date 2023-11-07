import {FC} from "react";
import {Product} from "@/app/interfaces/product";
import ProductCard from "@/app/components/ui/ProductCard";

interface ProductsContainerProps {
    products: Product[];
}

const ProductsContainer: FC<ProductsContainerProps> = ({products}) => {

    return (
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
};

export default ProductsContainer;
