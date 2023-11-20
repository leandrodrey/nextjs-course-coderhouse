import {FC} from "react";
import {IProduct} from "@/interfaces/IProduct";
import ProductCard from "@/app/components/ui/ProductCard";

interface ProductsContainerProps {
    products: IProduct[];
}

const ProductsContainer: FC<ProductsContainerProps> = ({products}) => {

    return (
        <div className="flex flex-wrap justify-center p-1 md:p-4 md:gap-4 ">
            {products.map((product: IProduct) => (
                <ProductCard key={product._id.toString()} product={product}/>
            ))}
        </div>
    );
};

export default ProductsContainer;
