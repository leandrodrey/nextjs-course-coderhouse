import {ReactElement} from 'react';
import {getProductByCategory} from "@/services/ProductService";
import Sidebar from '@/app/admin/components/Sidebar';
import Header from '@/app/admin/components/Header';
import MainContent from '@/app/admin/components/MainContent';
import {IProduct} from "@/interfaces/IProduct";

export default async function AdminPage(): Promise<ReactElement> {

    const allProducts: IProduct[] = await getProductByCategory('all');

    return (
        <>
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header/>
                <MainContent products={allProducts}/>
            </div>
        </>
    );
};
