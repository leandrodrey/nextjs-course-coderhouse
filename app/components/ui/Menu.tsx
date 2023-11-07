import {FC} from "react";
import Link from "next/link";
import CabinIcon from '@mui/icons-material/Cabin';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

interface MenuProps {
    open: boolean;
}

const Menu: FC<MenuProps> = ({open}) => {
    const Menus = [
        {title: "Home", url: '/', icon: <CabinIcon/>},
        {title: "RPG", url: '/category/1', icon: <VideogameAssetIcon/>, gap: true},
        {title: "Arcade", url: '/category/2', icon: <SportsEsportsIcon/>},
    ];

    return (
        <ul className="pt-6">
            {Menus.map((Menu, index) => (
                <li key={index}
                    className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
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
