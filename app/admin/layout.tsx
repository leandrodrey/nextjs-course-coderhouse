"use client"
import {ReactNode} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function DashboardLayout({ children,}: {
    children: ReactNode
}) {

    const {data: session, status} = useSession();

    if (!session) redirect('api/auth/signin')

    if (session) {
        return (
            <div>
                <p>Bienvenido, {session.user?.email}</p>
                <button onClick={() => signOut()}>Cerrar Sesión</button>
                <div className="flex flex-col h-full flex-1">
                    {children}
                </div>
            </div>
        );
    }
    return (
        <div>
            <button onClick={() => signIn()}>Iniciar Sesión</button>
        </div>
    );

}
