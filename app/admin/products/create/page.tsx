import {ReactElement} from 'react';
import CreateProductForm from "@/components/forms/CreateProductForm";
import {ICategory} from "@/interfaces/ICategory";
import {getAllCategories} from "@/services/CategoryService";

export const dynamic = 'force-dynamic';

export default async function CreateProductsPage(): Promise<ReactElement> {

    const allCategories: ICategory[] = await getAllCategories();

    return (
        <>
            <h1>Create a new Product</h1>
            <CreateProductForm categories={allCategories} />
        </>
    );
};
