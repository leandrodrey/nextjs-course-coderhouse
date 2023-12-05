import { FC } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import CabinIcon from '@mui/icons-material/Cabin';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { ICategory } from "@/interfaces/ICategory";

interface MenuProps {
    open: boolean;
    categories: ICategory[];
}

const Menu: FC<MenuProps> = ({ open, categories }) => {
    const pathname = usePathname()

    const staticMenus = [
        { title: "Home",
            url: '/',
            icon: <CabinIcon />,
            gap: false
        },
        {
            title: "Admin",
            url: '/admin',
            icon: <AccountBoxOutlinedIcon />,
            gap: false
        }
    ];

    const categoryMenus = categories.map((category, index) => (
        {
            title: category.title,
            url: `/category/${category.title.toLowerCase()}`,
            icon: <VideogameAssetIcon />,
            gap: index === 0
        }
    ));

    const Menus = [...staticMenus, ...categoryMenus];

    return (
        <ul className="pt-6">
            {Menus.map((menu, index) => (
                <li key={index}
                    className={`
                        flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${menu.gap ? "mt-9" : "mt-2"} 
                        ${pathname === menu.url ? "text-blue-600" : ""} 
                    `}
                >
                    <Link title={menu.title} href={menu.url}>{menu.icon}</Link>
                    <span className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300 capitalize`}>
                        <Link href={menu.url}>{menu.title}</Link>
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
