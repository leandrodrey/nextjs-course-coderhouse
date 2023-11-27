import {FC} from "react";
import {IProductWithCategory} from "@/interfaces/IProduct";
import ProductCard from "@/app/components/ui/ProductCard";

interface ProductsContainerProps {
    products: IProductWithCategory[];
}

const ProductsContainer: FC<ProductsContainerProps> = ({products}) => {

    return (
        <div className="flex flex-wrap justify-center p-1 md:p-4 md:gap-4 ">
            {products.map((product: IProductWithCategory) => (
                <ProductCard key={product._id.toString()} product={product}/>
            ))}
        </div>
    );
};

export default ProductsContainer;
