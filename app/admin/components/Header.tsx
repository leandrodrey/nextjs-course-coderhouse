"use client";
import {FC} from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

interface HeaderProps {
}

const Header: FC<HeaderProps> = () => {
    return (
        <header className="bg-stone-900 shadow-sm">
            <div className="flex justify-between items-center py-4 px-6">
                <div className="flex items-center">
                    <SearchOutlinedIcon/>
                    <input
                        type="search"
                        className="block w-full pl-10 pr-3 py-2 ml-4 text-gray-700 bg-gray-100 border border-transparent rounded-md focus:border-blue-500 focus:bg-white focus:ring-0"
                        placeholder="Search..."
                    />
                </div>
                <div className="flex items-center">
                    <AccountCircleOutlinedIcon/>
                </div>
            </div>
        </header>
    );
};

export default Header;
