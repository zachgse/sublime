"use client"
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Pacifico } from "next/font/google";

const cursive = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
})

const Sidebar = () => {
    const MENUS = ["story","menu","gallery","featured"];
    const date = new Date();
    const path = usePathname();

    return (
        <>
            <p className={`${cursive.className} text-[#a2784f] text-[30px] lg:text-[40px] mb-[27px] lg:mb-12`}>Sublime</p>
            <div className="flex flex-col items-center w-full">
                {MENUS.map((menu,index) => (
                    <Link key={index}
                        href={`/dashboard/${menu}`}
                        className={clsx("border-b border-gray-300 w-full p-4 text-center cursor-pointer capitalize",
                            index == 0 && "border-t",
                            path == `/dashboard/${menu}` ? "bg-blue-100 hover:bg-blue-100" : "hover:bg-gray-100"
                        )}>
                        {menu}
                    </Link>
                ))}
            </div>
            <div className="w-full absolute bottom-4 text-center">
                <p>© Sublime Cafe {date.getFullYear()}.</p>
            </div>
        </>
    )
}

export default Sidebar;