import {FC} from "react";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {IUser} from "@/interfaces/IUser";

const Header: FC = () => {

    const session = useSession();
    const user = session.data?.user as IUser;
    const userImage = user?.image || 'gamebazar/user_avatar.png';

    return (
        <header className="bg-stone-900 shadow-sm">
            <div className="flex justify-end items-center py-2 pr-2 md:pr-0 md:px-4">
                <div className="flex items-center">
                    {session.data && (
                        <>
                            <h2 className="mr-3">Bienvenido, <span className="text-blue-300 font-semibold">{session.data?.user?.name}</span></h2>
                            <Image
                                src={userImage}
                                alt="User Avatar"
                                width={100}
                                height={100}
                                className="object-contain rounded-full shadow-md"
                                placeholder="blur"
                                blurDataURL="/gamebazar/user_avatar.png"
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
