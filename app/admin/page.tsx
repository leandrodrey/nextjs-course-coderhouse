import {ReactElement} from 'react';
import {IProductWithCategory} from "@/interfaces/IProduct";
import { productService } from '@/services/ProductService';
import MainContent from '@/app/admin/components/MainContent';

export default async function AdminPage(): Promise<ReactElement> {

    const allProducts: IProductWithCategory[] | null = await productService.getProductsByCategory('all');
    const data = JSON.parse(JSON.stringify(allProducts))

    if (!allProducts) {
        return <div>Products Not Found</div>;
    }

    return (
        <>
            <div className="flex-1 flex flex-col">
                <MainContent products={allProducts}/>
            </div>
        </>
    );
};
