"use client"
import React from "react"
import { supabase } from "@/lib/supabase/client"
import GalleryForm from "./form"
import GalleryData from "./data"

export type GalleryImage = {
    id: number
    is_active: boolean
    url: string
}

export default function Gallery() {
    const [images,setImages] = React.useState<GalleryImage[]>([]);

    const fetchImages = async() => {
        const { data } = await supabase.from("gallery").select().order("created_at",{ascending:true});
        setImages(data || []);
    }
    
    React.useEffect(() => {
        fetchImages();
    },[])

    return (
        <div>
            <GalleryData images={images} onSuccess={fetchImages}/>
            <hr/>
            {images.length < 6 && <GalleryForm onSuccess={fetchImages}/>}
        </div>
    )
}
