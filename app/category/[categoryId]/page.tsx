import { FC } from "react";
import { Product } from "@/app/interfaces/product";
import ProductsContainer from "@/app/components/ui/ProductsContainer";
import data from "@/app/items.json";

interface ProductCategoryProps {
    params: {
        categoryId: number;
    };
}

const ProductCategory: FC<ProductCategoryProps> = ({ params }) => {

    const filteredProducts: Product[] = data.filter((item) =>
        Number(item.categoryId) === Number(params.categoryId)
    );

    if (!filteredProducts.length) {
        return <div>Productos no encontrados</div>;
    }

    return (
        <ProductsContainer products={filteredProducts} />
    )
};

export default ProductCategory;
