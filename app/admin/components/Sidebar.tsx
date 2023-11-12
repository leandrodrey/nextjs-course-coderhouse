"use client";
import {FC} from 'react';
import Link from 'next/link';
import CabinIcon from '@mui/icons-material/Cabin';
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = () => {

    const Menus = [
        {title: "Dashboard", url: '/admin', icon: <CabinIcon/>},
        {title: "Productos", url: '/admin', icon: <VideogameAssetIcon/>, gap: true},
        {title: "Productos", url: '/admin', icon: <VideogameAssetIcon/>},
        {title: "Productos", url: '/admin', icon: <VideogameAssetIcon/>},
        {title: "Productos", url: '/admin', icon: <VideogameAssetIcon/>},
    ];

    return (
        <aside className="w-64 h-screen bg-blue-700 text-white hidden md:block" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3">
                <ul className="space-y-2">
                    {Menus.map((Menu, index) => (
                        <li key={index}
                            className={`
                                flex rounded-md p-2 cursor-pointer hover:bg-blue-800 text-gray-300 text-sm items-center gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} 
                            `}
                        >
                            <Link href="/admin/dashboard" className="flex items-center p-2 w-full text-sm font-medium text-white rounded-lg hover:bg-blue-800">
                                {Menu.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
