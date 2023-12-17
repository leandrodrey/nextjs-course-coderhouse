"use client"
import {ReactNode} from "react";
import {redirect} from "next/navigation";
import {signOut, useSession} from "next-auth/react";

export default function DashboardLayout({ children }: {
    children: ReactNode
}) {

/*    const {data: session, status} = useSession();

    if (!session) redirect('api/auth/signin');

    if (session) {*/
        return (
            <div>
                {/*<p>Bienvenido, {session.user?.email}</p>*/}
                <button onClick={() => signOut()}>Logout</button>
                <div className="flex flex-col h-full flex-1">
                    {children}
                </div>
            </div>
        );
   /* }*/

}
