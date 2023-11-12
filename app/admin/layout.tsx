import {ReactNode} from "react";

export default function DashboardLayout({ children,}: {
    children: ReactNode
}) {
    return (
        <div className="flex h-full bg-gray-100">
            {children}
        </div>
    )
}
