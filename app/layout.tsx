import {ReactNode} from "react";
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import NavBar from "@/app/components/ui/NavBar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'My App',
    description: 'My super App',
}

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <main className="w-full shadow flex">
                <NavBar />
                <div className="content h-screen flex-1 p-7">
                    {children}
                </div>
            </main>
        </body>
        </html>
    )
}
