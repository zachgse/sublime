import React from "react";
import {Toaster} from "react-hot-toast";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
    return (  
        <div className="flex w-full min-h-screen">
            <div className="flex w-4/12 lg:w-2/12 pt-4 lg:pt-16 border-r border-gray-300">
                <div className="w-full text-center relative">
                    <Sidebar/>
                </div>
            </div>
            <div className="flex flex-col w-8/12 lg:w-10/12 h-screen overflow-auto">
                <Toaster/>
                <Navbar/>
                <div className="p-4">{children}</div>     
            </div>
        </div>   
    )
}

export default DashboardLayout;