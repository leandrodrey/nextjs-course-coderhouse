import {FC} from "react";
import {IProductWithCategory} from "@/interfaces/IProduct";
import {ICategory} from "@/interfaces/ICategory";
import {categoryService} from "@/services/CategoryService";
import {productService} from "@/services/ProductService";
import EditProductForm from "@/components/forms/EditProductForm";

interface EditProductPageProps {
    params: {
        productId: string;
    };
}

const EditProductPage: FC<EditProductPageProps> = async ({params}) => {

    const allCategories: ICategory[] | null = await categoryService.getCategories();
    const product: IProductWithCategory | null = await productService.getProductById(params.productId);
    const dataCategories = JSON.parse(JSON.stringify(allCategories))
    const data = JSON.parse(JSON.stringify(product))

    if (!allCategories || !product) {
        return <div className="text-center text-xl text-red-500 p-5">Product Not Found</div>;
    }

    return (
        <>
            <h2 className="text-2xl text-gray-200">Edit Product <span className="text-blue-300">{product.title}</span>
            </h2>
            <EditProductForm categories={dataCategories} product={data}/>
        </>
    )
}

export default EditProductPage;
