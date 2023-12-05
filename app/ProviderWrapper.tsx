'use client'
import {FC, ReactNode} from "react";
import { SessionProvider } from "next-auth/react"
import {Session} from "next-auth";
import CartProvider from "@/context/CartProvider";

interface ProviderWrapperProps {
    children: ReactNode
    session: Session | null;
}

const ProviderWrapper: FC<ProviderWrapperProps> = ({children, session}) => {
    return (
        <>
            <SessionProvider session={session}>
                <CartProvider>
                    {children}
                </CartProvider>
            </SessionProvider>
        </>
    )
}

export default ProviderWrapper;
