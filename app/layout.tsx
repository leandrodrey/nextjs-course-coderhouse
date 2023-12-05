import {ReactNode} from "react";
import type {Metadata} from 'next'
import { SessionProvider } from "next-auth/react"
import {Inter} from 'next/font/google'
import useSWR from "swr";
import './globals.css'
import {ICategory} from "@/interfaces/ICategory";
import {getAllCategories} from "@/services/CategoryService";
import CartProvider from "@/context/CartProvider";
import NavBar from "@/components/ui/NavBar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Game Bazar',
    description: 'Tus juegos en un lugar',
    icons: {
        apple: [
            {url: '/apple-icon-57x57.png', sizes: '57x57'},
            {url: '/apple-icon-60x60.png', sizes: '60x60'},
            {url: '/apple-icon-72x72.png', sizes: '72x72'},
            {url: '/apple-icon-76x76.png', sizes: '76x76'},
            {url: '/apple-icon-114x114.png', sizes: '114x114'},
            {url: '/apple-icon-120x120.png', sizes: '120x120'},
            {url: '/apple-icon-144x144.png', sizes: '144x144'},
            {url: '/apple-icon-152x152.png', sizes: '152x152'},
            {url: '/apple-icon-180x180.png', sizes: '180x180'},
        ],
        icon: [
            {url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png'},
            {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
            {url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png'},
            {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
        ],
    },
}

type RootLayoutProps = {
    children: ReactNode;
    session: any;
};

export default async function RootLayout({children, session}: RootLayoutProps) {

    /*const allCategories: ICategory[] = await getAllCategories();*/

    return (
        <SessionProvider session={session}>
            <CartProvider>
                <html lang="en">
                <body className={inter.className}>
                <main className="w-full md:flex">
                    <NavBar />
                    <div className="content h-screen flex-1 p-7 pt-3 pl-20 md:pl-0">
                        {children}
                    </div>
                </main>
                </body>
                </html>
            </CartProvider>
        </SessionProvider>
    )
}
