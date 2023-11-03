import {FC} from "react";

interface ProductCategoryProps {
    params: {
        id: string;
    };
}

const ProductCategory:FC<ProductCategoryProps> = ({ params }) => {
    return (
        <>
            Hola, esta es la caregoria {params.id}
        </>
    )
}

export default ProductCategory;
