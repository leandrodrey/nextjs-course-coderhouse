import React from 'react';
import Sidebar from '@/app/admin/components/Sidebar';
import Header from '@/app/admin/components/Header';
import MainContent from '@/app/admin/components/MainContent';
import data from "@/app/items.json";

const AdminPage: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header/>
                <MainContent products={data}/>
            </div>
        </div>
    );
};

export default AdminPage;
