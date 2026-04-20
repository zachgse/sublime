"use client"
import React from "react";
import { Button } from "../reusable/Button";
import { Card } from "../reusable/Card";
import Backdrop from "../reusable/Backdrop";
import { GalleryImage } from "@/app/dashboard/gallery/page";
import clsx from "clsx";

type InfoProps = {
    story: {
        content: string | null
    } | null
    menu: {
        url: string | null
    } | null
    gallery: GalleryImage[]
}

type Modal = "story"| "menu" | "ambiance" | null

const Info = (props:InfoProps) => {
    const [modal,setModal] = React.useState<Modal>(null);

    return (
        <>
            {modal && (
                <Backdrop isOpen={modal != null} class={clsx(modal == "ambiance" || modal == "menu"
                                                                    ? "w-4/5 h-11/12 !p-0"
                                                                    : "lg:w-2/5 md:w-2/5 w-4/5 lg:h-fit h-4/5 justify-start items-start")} 
                    onCancel={()=>setModal(null)}>
                    {modal == "ambiance" && (
                    <div className="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 w-full h-full">
                        <div>
                            <div className="w-full h-full">
                                <img src={props.gallery[0].url} alt="01" className="w-full h-full"/>
                            </div>
                        </div>
                        <div>
                            <div className="w-full h-full">
                                <img src={props.gallery[5].url} alt="02" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="md:row-span-2 row-span-1">
                            <div className="w-full h-full">
                                <img src={props.gallery[2].url} alt="03" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="md:row-span-2 row-span-1">
                            <div className="w-full h-full">
                                <img src={props.gallery[3].url} alt="04" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="">
                            <div className="w-full h-full">
                                <img src={props.gallery[4].url} alt="05" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="md:col-start-2 md:col-span-2 col-span-1">
                            <div className="w-full h-full">
                                <img src={props.gallery[1].url} alt="06" className="w-full h-full"/>
                            </div>
                        </div>
                    </div>
                    )}
                    {modal == "menu" && (
                        <div className="w-full h-full">
                            <img src={props.menu?.url ?? ""} alt="Menu preview" className="w-full h-full"/>
                        </div>
                    )}
                    {modal == "story" && (
                        <div dangerouslySetInnerHTML={{ __html: props.story?.content ?? "" }} />
                    )}
                </Backdrop>
            )}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full px-8 lg:px-48">
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                    <p className="text-secondary text-xl font-[600] underline text-center md:text-left">Our Story</p>
                    <Card>
                        <img src="assets/img/sublime.jpg" alt="Sublime Cafe" className="w-full lg:h-80 h-60 object-cover rounded-lg"/>
                        <div className="flex flex-col items-center gap-2 p-4">
                            Discover our passion for coffee
                            <Button onClick={() => setModal("story")} type="button" bg="bg-[#a2784f]" color="text-white">View more</Button>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                    <p className="text-primary text-xl font-[600] underline text-center md:text-left">Specialty Brews</p>
                    <Card>
                        <img src="assets/img/menuprev.jpg" alt="Coffee preview" className="w-full lg:h-80 h-60 object-cover rounded-lg"/>
                        <div className="flex flex-col items-center gap-2 p-4">
                            Unique blends & handcrafted drinks
                            <Button onClick={() => setModal("menu")} type="button" bg="bg-[#715646]" color="text-white">Check menu</Button>
                        </div>
                    </Card>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/3">
                    <p className="text-secondary text-xl font-[600] underline text-center md:text-left">Visit Us</p>
                    <Card>
                        <img src="assets/img/ambiance.jpg" alt="Ambiance" className="w-full lg:h-80 h-60 object-cover rounded-lg"/>
                        <div className="flex flex-col items-center gap-2 p-4">
                            Find us and enjoy the ambiance
                            <Button onClick={() => setModal("ambiance")} type="button" bg="bg-[#a2784f]" color="text-white">Learn more</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Info;