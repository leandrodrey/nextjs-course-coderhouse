"use client";
import {FC, useState} from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SocialIcons from "@/app/components/ui/SocialIcons";
import Menu from "@/app/components/ui/Menu";

const NavBar: FC = () => {

    const [open, setOpen] = useState(true);

    return (
        <>
            <div className={` ${open ? "w-72" : "w-20 "} flex flex-col justify-between bg-[#0f0f0f] h-screen p-5 pt-8 relative duration-300`}>
                <div>
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
                    <Menu open={open} />
                </div>
                <SocialIcons menuOpen={open} />
            </div>
        </>
    )
}

export default NavBar;
