"use client";
import {FC, useState} from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';

const NavBar: FC = () => {

    const [open, setOpen] = useState(true);

    const Menus = [
        {title: "Dashboard", icon: <DashboardIcon />},
        {title: "Inbox", icon: <DashboardIcon />},
        {title: "Accounts", icon: <DashboardIcon />, gap: true},
        {title: "Schedule ", icon: <DashboardIcon />}
    ];

    return (
        <>
            <div className={` ${open ? "w-72" : "w-20 "} bg-[#0f0f0f] h-screen p-5 pt-8 relative duration-300`}>
                <ArrowCircleLeftIcon className={`absolute cursor-pointer -right-3 top-9 w-7 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <div className="flex gap-x-4 items-center">
                    <img
                        alt={"logo"}
                        src="/logo.svg"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                    />
                    <h1 className={`text-white origin-left font-medium text-2xl duration-200 ${!open && "scale-0"}`}>
                        My App
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
                        >
                            { Menu.icon }
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NavBar;
