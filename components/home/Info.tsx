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

type Modal = "story" | "ambiance" | null

const Info = (props:InfoProps) => {
    const [modal,setModal] = React.useState<Modal>(null);

    return (
        <>
            {modal && (
                <Backdrop isOpen={modal != null} class={clsx(modal == "ambiance" 
                                                                    ? "w-4/5 h-11/12"
                                                                    : "lg:w-2/5 md:w-2/5 w-4/5 justify-start items-start")} 
                    onCancel={()=>setModal(null)}>
                    {modal == "ambiance" ? (
                    <div className="grid grid-cols-3 grid-rows-3 w-full h-full overflow-y-auto">
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
                        <div className="row-span-2">
                            <div className="w-full h-full">
                                <img src={props.gallery[2].url} alt="03" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="row-span-2">
                            <div className="w-full h-full">
                                <img src={props.gallery[3].url} alt="04" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="">
                            <div className="w-full h-full">
                                <img src={props.gallery[4].url} alt="05" className="w-full h-full"/>
                            </div>
                        </div>
                        <div className="col-start-2 col-span-2">
                            <div className="w-full h-full">
                                <img src={props.gallery[1].url} alt="06" className="w-full h-full"/>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: props.story?.content ?? "" }} />
                    )}
                </Backdrop>
            )}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full px-4 lg:px-40">
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                    <p className="text-secondary text-xl font-[600] underline">Our Story</p>
                    <Card>
                        <img src="assets/img/sublime.jpg" alt="Sublime Cafe" className="w-full h-96 rounded-lg"/>
                        <div className="flex flex-col items-center gap-2 p-2">
                            Discover our passion for coffee
                            <Button onClick={() => setModal("story")} type="button" bg="bg-[#a2784f]" color="text-white">Get Directions</Button>
                        </div>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                    <p className="text-primary text-xl font-[600] underline">Specialty Brews</p>
                    <Card>
                        <img src="assets/img/menuprev.jpg" alt="Coffee preview" className="w-full h-96 rounded-lg"/>
                        <div className="flex flex-col items-center gap-2 p-2">
                            Unique blends & handcrafted drinks
                            <a href={props.menu?.url ?? ""} target="_blank"
                                className="w-fit h-10 px-12 rounded-lg flex items-center gap-1 cursor-pointer hover:opacity-75 bg-[#a2784f] text-white">
                                View Menu
                            </a>
                        </div>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3 flex flex-col gap-2">
                    <p className="text-secondary text-xl font-[600] underline">Visit Us</p>
                    <Card>
                        <img src="assets/img/ambiance.jpg" alt="Ambiance" className="w-full h-96 rounded-lg"/>
                        <div className="flex flex-col items-center gap-2 p-2">
                            Find us and enjoy the ambiance
                            <Button onClick={() => setModal("ambiance")} type="button" bg="bg-[#a2784f]" color="text-white">View more</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Info;