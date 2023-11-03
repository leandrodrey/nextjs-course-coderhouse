// Menu.tsx
import { FC } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from "next/link";

interface MenuProps {
    open: boolean;
}

const Menu: FC<MenuProps> = ({ open }) => {
    const Menus = [
        { title: "Dashboard", url:'/', icon: <DashboardIcon />, gap: true },
        { title: "Seinen", url:'/category/1', icon: <DashboardIcon /> },
        { title: "Isekai", url:'/category/2', icon: <DashboardIcon /> },
    ];

    return (
        <ul className="pt-6">
            {Menus.map((Menu, index) => (
                <li
                    key={index}
                    className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
                >
                    {Menu.icon}
                    <span className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300`}>
                        <Link href={Menu.url}>{Menu.title}</Link>
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
