import {ReactNode} from "react";

export default function DashboardLayout({ children,}: {
    children: ReactNode
}) {
    return (
        <div className="flex h-full">
            {children}
        </div>
    )
}
