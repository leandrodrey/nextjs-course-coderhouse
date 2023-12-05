'use client'
import {ReactElement} from 'react';
import {getProductByCategory} from "@/services/ProductService";
import Header from '@/app/admin/components/Header';
import MainContent from '@/app/admin/components/MainContent';
import {IProduct} from "@/interfaces/IProduct";
import { signIn, signOut, useSession } from "next-auth/react";

export const dynamic = 'force-dynamic';

export default async function AdminPage(): Promise<ReactElement> {

    const {data: session, status} = useSession();

    if (session) {
        return (
            <div>
                <p>Bienvenido, {session.user?.email}</p>
                <button onClick={() => signOut()}>Cerrar Sesión</button>
            </div>
        );
    }
    return (
        <div>
            <button onClick={() => signIn()}>Iniciar Sesión</button>
        </div>
    );

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
