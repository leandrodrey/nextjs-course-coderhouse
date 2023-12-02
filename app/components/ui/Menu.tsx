"use client"
import {FC} from "react";
import Link from "next/link";
import {usePathname} from 'next/navigation'
import CabinIcon from '@mui/icons-material/Cabin';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

interface MenuProps {
    open: boolean;
}

const Menu: FC<MenuProps> = ({open}) => {

    const pathname = usePathname()

    const Menus = [
        {title: "Home", url: '/', icon: <CabinIcon/>},
        {title: "RPG", url: '/category/655bc7e6efbb8e81bde7f50e', icon: <VideogameAssetIcon/>, gap: true},
        {title: "Survival", url: '/category/655bc7e6efbb8e81bde7f4f7', icon: <SportsEsportsIcon/>},
        {title: "Simulation", url: '/category/655bc7e6efbb8e81bde7f50e', icon: <VideogameAssetIcon/>},
        {title: "Rogue Like", url: '/category/655bc7e6efbb8e81bde7f50e', icon: <SportsEsportsIcon/>},
        {title: "Admin", url: '/admin', icon: <AccountBoxOutlinedIcon/>, gap: true},
    ];

    return (
        <ul className="pt-6">
            {Menus.map((Menu, index) => (
                <li key={index}
                    className={`
                        flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${Menu.gap ? "mt-9" : "mt-2"} 
                        ${pathname === Menu.url ? "text-blue-600" : ""} 
                    `}
                >
                    <Link title={Menu.title} href={Menu.url}>{Menu.icon}</Link>
                    <span className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300`}>
                        <Link href={Menu.url}>{Menu.title}</Link>
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
