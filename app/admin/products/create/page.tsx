import {ReactElement} from 'react';
import CreateProductForm from "@/components/forms/CreateProductForm";

export const dynamic = 'force-dynamic';

export default async function CreateProductsPage(): Promise<ReactElement> {

    return (
        <>
            <h1>Create a new Product</h1>
            <CreateProductForm />
        </>
    );
};
