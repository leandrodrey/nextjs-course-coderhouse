import {ReactElement} from 'react';
import {getProductByCategory} from "@/services/ProductService";
import Header from '@/app/admin/components/Header';
import MainContent from '@/app/admin/components/MainContent';
import {IProduct} from "@/interfaces/IProduct";

export const dynamic = 'force-dynamic';

export default async function AdminPage(): Promise<ReactElement> {

    const allProducts: IProduct[] = await getProductByCategory('all');

    return (
        <>
            <Header/>
            <div className="flex-1 flex flex-col">
                <MainContent products={allProducts}/>
            </div>
        </>
    );
};
