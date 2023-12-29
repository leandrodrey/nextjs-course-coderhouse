'use client'
import {FC} from "react";
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";
import {IUser} from "@/interfaces/IUser";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/solid";

const Header: FC = () => {

    const session = useSession();
    const user = session.data?.user as IUser;
    const userImage = user?.image || 'gamebazar/user_avatar.png';

    return (
        <header className="flex flex-col md:flex-row items-center justify-between bg-stone-900 shadow-sm p-4">
            <div className="flex justify-center items-center mb-4">
                <button className="" title="Sign Out" onClick={() => signOut()}>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6"/></button>
                <button onClick={() => signOut()} className={`origin-left duration-200 text-blue-200 hover:text-blue-300 capitalize ml-2`}>Logout</button>
            </div>
            {session.data && (
                <div className="flex flex-col md:flex-row items-center text-center">
                    <h2 className="mr-3">Bienvenido, <span className="text-blue-300 font-semibold">{session.data?.user?.name}</span>
                    </h2>
                    <Image
                        src={userImage}
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="object-contain rounded-full shadow-md"
                        placeholder="blur"
                        blurDataURL="gamebazar/user_avatar.png"
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
