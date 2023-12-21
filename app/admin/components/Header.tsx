import {FC} from "react";
import { CldImage } from "next-cloudinary";

interface HeaderProps {
}

const Header: FC<HeaderProps> = () => {

    return (
        <header className="bg-stone-900 shadow-sm">
            <div className="flex justify-end items-center py-2 pr-2 md:pr-0 md:px-4">
                <div className="flex items-center">
                    <h1 className="mr-3">Bienvenido, <span className="text-blue-300 font-semibold">Admin</span></h1>
                    <CldImage
                        src="/gamebazar/user_avatar.png"
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="object-contain rounded-full shadow-md"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
