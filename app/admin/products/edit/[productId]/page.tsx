import {FC} from "react";
import {IProductWithCategory} from "@/interfaces/IProduct";
import {ICategory} from "@/interfaces/ICategory";
import {getAllCategories} from "@/services/CategoryService";
import {getProductById} from "@/services/ProductService";
import EditProductForm from "@/components/forms/EditProductForm";

export const dynamic = 'force-dynamic';

interface EditProductPageProps {
    params: {
        productId: string;
    };
}

const EditProductPage: FC<EditProductPageProps> = async ({params}) => {

    const allCategories: ICategory[] = await getAllCategories();
    const product: IProductWithCategory = await getProductById(params.productId);

    return (
        <>
            <h2 className="text-2xl text-gray-200">Edit Product <span className="text-blue-300">{product.title}</span></h2>
            <EditProductForm categories={allCategories} product={product} />
        </>
    )
}

export default EditProductPage;
