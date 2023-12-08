import {FC} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";

interface MenuLoginProps {
    open: boolean;
}

const MenuLogin: FC<MenuLoginProps> = ({ open}) => {

    const session = useSession();

    return (
        <div className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
            {session.data ? (
                <>
                    <button className="ml-1" title="Sign Out" onClick={() => signOut()}><LogoutIcon/></button>
                    <span onClick={() => signOut()} className={`${!open && "hidden"} origin-left duration-200 text-blue-200 hover:text-blue-300 capitalize`}> {session.data?.user?.name}</span>
                </>
            ) : (
                <>
                    <button title="Sign In" onClick={() => signIn()}><LoginIcon/></button>
                    <span onClick={() => signIn()} className={`${!open && "hidden"} origin-left duration-200 hover:text-blue-300 capitalize`}>
                        SignIn
                    </span>
                </>
            )}
        </div>
    )
}

export default MenuLogin;
