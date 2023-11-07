"use client";
import {FC, useState} from "react";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import SocialIcons from "@/app/components/ui/SocialIcons";
import Menu from "@/app/components/ui/Menu";

const NavBar: FC = () => {

    const [open, setOpen] = useState(true);

    return (
        <>
            <div className={` ${open ? "w-60" : "w-20 "} flex flex-col justify-between bg-[#0f0f0f] h-screen p-5 pt-8 relative duration-300`}>
                <div>
                    <ArrowBackIosOutlinedIcon className={`text-blue-300 absolute cursor-pointer -right-3 top-10 w-7 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
                    <div className="flex flex-col gap-x-4 items-center">
                        <img
                            alt={"logo"}
                            src="/logo.png"
                            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                        />
                        <h1 className={`py-2 text-white origin-left font-medium text-2xl duration-200 ${!open && "scale-0"}`}>
                            Game Bazar
                        </h1>
                    </div>
                    <Menu open={open}/>
                </div>
                <SocialIcons menuOpen={open}/>
            </div>
        </>
    )
}

export default NavBar;
