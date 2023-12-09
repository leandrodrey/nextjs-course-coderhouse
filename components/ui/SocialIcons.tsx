import { FC } from "react";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

interface SocialIconsProps {
    menuOpen?: boolean;
}

const SocialIcons: FC<SocialIconsProps> = ({ menuOpen }) => {
    return (
        <div className={`flex ${menuOpen ? "space-x-3 opacity-100" : "space-y-3 opacity-50 flex-col items-center"} justify-center transition-opacity duration-500 `}>
            <Link href="#" className="text-xs text-blue-300 hover:text-white transition duration-300">
                <FacebookIcon fontSize={menuOpen ? "large" : "medium"} />
            </Link>
            <Link href="#" className="text-blue-300 hover:text-white transition duration-300">
                <TwitterIcon fontSize={menuOpen ? "large" : "medium"} />
            </Link>
            <Link href="#" className="text-blue-300 hover:text-white transition duration-300">
                <InstagramIcon fontSize={menuOpen ? "large" : "medium"} />
            </Link>
        </div>
    )
}

export default SocialIcons;
