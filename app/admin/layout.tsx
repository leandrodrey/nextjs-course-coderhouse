"use client"
import {ReactNode} from "react";
import Header from "@/app/admin/components/Header";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function DashboardLayout({children}: {
    children: ReactNode
}) {

    const {data: session, status} = useSession();

    if (!session) redirect('api/auth/signin');

    if (session) {
        return (
            <div className="container mx-auto mt-10 md:p-5">
                {/*<p>Bienvenido, {session.user?.email}</p>*/}
                {/*<button onClick={() => signOut()}>Logout</button>*/}
                <div className="flex flex-col h-full flex-1">
                    <Header/>
                    <div className="shadow rounded-lg p-6">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

}
