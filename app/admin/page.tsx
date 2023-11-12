import {ReactElement} from 'react';
import Sidebar from '@/app/admin/components/Sidebar';
import Header from '@/app/admin/components/Header';
import MainContent from '@/app/admin/components/MainContent';
import data from "@/app/items.json";

export default function AdminPage(): ReactElement {

    return (
        <>
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header/>
                <MainContent products={data}/>
            </div>
        </>
    );
};
