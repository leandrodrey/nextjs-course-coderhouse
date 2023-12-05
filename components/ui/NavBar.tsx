"use client";
import {FC, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import SocialIcons from "@/components/ui/SocialIcons";
import Menu from "@/components/ui/Menu";
import CartWidget from "@/components/ui/CartWidget";
import {ICategory} from "@/interfaces/ICategory";

interface NavBarProps {
    categories: ICategory[];
}

const NavBar: FC<NavBarProps> = ({categories}) => {

    const [open, setOpen] = useState(false);

    const logoImage = "/logo.webp";

    return (
        <>
            <div className={` ${open ? "w-60" : "w-20"} duration-600 transition`}>
                <div className={` ${open ? "w-60" : "w-20"} flex flex-col justify-between bg-[#0f0f0f] p-5 pt-8 z-[999] duration-600 transition fixed top-0 left-0 h-full`}>
                    <div>
                        <ArrowBackIosOutlinedIcon className={`text-blue-300 absolute cursor-pointer -right-3 top-10 w-7 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
                        <div className="flex flex-col gap-x-4 items-center">
                            <Link href="/">
                                <Image
                                    src={logoImage}
                                    alt="Game Bazar Logo"
                                    width={640}
                                    height={360}
                                    className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                                    priority={true}
                                />
                            </Link>
                            <h1 className={`py-2 text-white origin-left font-medium text-2xl duration-200 ${!open && "scale-0"}`}>
                                Game Bazar
                            </h1>
                        </div>
                        <Menu open={open} categories={categories} />
                        <CartWidget open={open} />
                    </div>
                    <SocialIcons menuOpen={open}/>
                </div>
            </div>
        </>
    )
}

export default NavBar;
