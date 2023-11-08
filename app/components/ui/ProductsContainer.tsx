import {FC} from "react";
import {Product} from "@/app/interfaces/product";
import ProductCard from "@/app/components/ui/ProductCard";

interface ProductsContainerProps {
    products: Product[];
}

const ProductsContainer: FC<ProductsContainerProps> = ({products}) => {

    return (
        <div className="flex flex-wrap justify-center p-4 gap-4">
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
};

export default ProductsContainer;
