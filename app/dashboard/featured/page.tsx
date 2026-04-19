"use client"
import React from "react";
import { supabase } from "@/lib/supabase/client";
import FeaturedData from "./data";

export type FeaturedProducts = {
    id: number
    name: string
    description: string
    url: string
    file_path: string
    is_active: boolean
}

const Featured = () => {
    const [products,setProducts] = React.useState<FeaturedProducts[]>([]);

    const fetchProducts = async() => {
        const { data } = await supabase.from("featured_products").select("*").order("created_at",{ascending:true});
        setProducts(data ?? []);
    } 

    React.useEffect(() => {
        fetchProducts();
    },[])
    
    return (
        <>
            <FeaturedData data={products} onSuccess={fetchProducts}/>
        </>
    )
}

export default Featured;