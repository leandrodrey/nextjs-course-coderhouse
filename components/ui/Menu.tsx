import {FC, ReactElement} from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import {HomeIcon, UserIcon, RocketLaunchIcon} from "@heroicons/react/24/solid";
import { ICategory } from "@/interfaces/ICategory";
import Loader from "@/components/ui/Loader";
import UseCategories from "@/hooks/useCategories";

interface MenuProps {
    open: boolean;
}

interface MenuOption {
    title: string;
    url: string;
    icon: ReactElement;
    gap: boolean;
}

const Menu: FC<MenuProps> = ({ open}) => {
    const pathname = usePathname()

    const { data, isError, isLoading } = UseCategories();

    if (isError) return <div>failed to load</div>
    if (isLoading) return <Loader />

    const staticMenu = [
        { title: "Home",
            url: '/',
            icon: <HomeIcon className="h-6 w-6" />,
            gap: false
        },
        {
            title: "Admin",
            url: '/admin',
            icon: <UserIcon className="h-6 w-6" />,
            gap: false
        }
    ];

    const categoriesMenu: MenuOption[] = data?.map((category: ICategory, index: number) => (
        {
            title: category.title,
            url: `/category/${category.title.toLowerCase()}`,
            icon: <RocketLaunchIcon className="h-6 w-6" />,
            gap: index === 0
        }
    )) || [];

    const Menus = [...staticMenu, ...categoriesMenu];

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
                    <Link href={menu.url} className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300 capitalize`}>
                        {menu.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
