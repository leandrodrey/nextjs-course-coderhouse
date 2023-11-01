// Menu.tsx
import { FC } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';

interface MenuProps {
    open: boolean;
}

const Menu: FC<MenuProps> = ({ open }) => {
    const Menus = [
        { title: "Dashboard", icon: <DashboardIcon /> },
        { title: "Inbox", icon: <DashboardIcon /> },
        { title: "Accounts", icon: <DashboardIcon />, gap: true },
        { title: "Schedule ", icon: <DashboardIcon /> }
    ];

    return (
        <ul className="pt-6">
            {Menus.map((Menu, index) => (
                <li
                    key={index}
                    className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
                >
                    {Menu.icon}
                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                        {Menu.title}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
