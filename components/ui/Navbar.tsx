"use client"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFloppyDisk, faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "@/app/login/actions";
import Backdrop from "../reusable/Backdrop";
import { Button } from "../reusable/Button";

const Navbar = () => {
    const [isOpen,setIsOpen] = React.useState<boolean>();
    const date = new Date();

    return (
        <div className="w-full py-8 border-b border-gray-300 flex justify-between px-4">
            {isOpen && (
                <Backdrop isOpen={isOpen}>
                    Do you wish to logout?
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button onClick={logoutUser} type='button' bg="bg-green-500" color="text-white">
                            Logout
                        </Button>
                        <Button onClick={() => setIsOpen(false)} type='button' bg="bg-red-500" color="text-white">
                            Cancel
                        </Button>
                    </div>
                </Backdrop>
            )}
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} width={12}/>
                <p className="font-bold">{date.toDateString()}</p>      
            </div>
            <FontAwesomeIcon icon={faRightFromBracket} width={24} onClick={()=>setIsOpen(true)} className="cursor-pointer text-red-500"/>
        </div>
    )
}

export default Navbar;