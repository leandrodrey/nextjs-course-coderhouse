import { FC } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

interface SocialIconsProps {
    menuOpen?: boolean;
}

const SocialIcons: FC<SocialIconsProps> = ({ menuOpen }) => {
    return (
        <div className={`flex ${menuOpen ? "space-x-3 opacity-100" : "space-y-3 opacity-50 items-center flex-col"} transition-opacity duration-600 `}>
            <a href="#" className="text-xs text-blue-300 hover:text-white transition duration-300">
                <FacebookIcon fontSize={menuOpen ? "large" : "medium"} />
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition duration-300">
                <TwitterIcon fontSize={menuOpen ? "large" : "medium"} />
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition duration-300">
                <InstagramIcon fontSize={menuOpen ? "large" : "medium"} />
            </a>
        </div>
    )
}

export default SocialIcons;
