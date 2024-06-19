import {ReactElement} from 'react';
import CreateProductForm from "@/components/forms/CreateProductForm";
import {ICategory} from "@/interfaces/ICategory";
import {categoryService} from "@/services/CategoryService";

export default async function CreateProductsPage(): Promise<ReactElement> {

    const allCategories: ICategory[] | null = await categoryService.getCategories();
    const data = JSON.parse(JSON.stringify(allCategories))

    if (!allCategories) {
        return <div>Categories Not Found</div>;
    }

    return (
        <>
            <h2 className='mb-5 text-3xl'>Create a new Product</h2>
            <CreateProductForm categories={data}/>
        </>
    );
};
