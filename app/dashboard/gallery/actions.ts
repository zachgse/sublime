"use server"
import { createClient } from "@/lib/supabase/server";

type State = {
    success: boolean | null
    message: string | null
    url: string|null
}

export async function uploadImage(
    prevState: State,
    formData: FormData
):Promise<State> {
    const file = formData.get("image") as File;
    const filePath = `gallery/${Date.now()}-${file.name}`;

    const supabase = await createClient();
    const { data:image,error:image_error } = await supabase.storage.from("resty").upload(filePath,file);

    if (image_error){
        return {
            message: image_error.message,
            success: false,
            url: null
        }
    }

    const {data:image_path} = await supabase.storage.from("resty").getPublicUrl(filePath);
    const { data:gallery,error:gallery_error } = await supabase.from("gallery")
                                                                .insert({
                                                                    "url":image_path.publicUrl,
                                                                    "file_path":filePath,
                                                                    "is_active":true
                                                                });

    if (gallery_error){
        return {
            message: gallery_error.message,
            success: false,
            url: null
        }
    } 

    return {
        message: "Image has been uploaded successfully",
        success: true,
        url: image_path.publicUrl
    }
}

export async function handleAction(
    prevState:State,
    formData:FormData
):Promise<State>{
    const id = Number(formData.get("id"));
    const supabase = await createClient();
    const { data:gallery,error:gallery_error } = await supabase.from("gallery")
                                                                .select("*")
                                                                .eq("id",id)
                                                                .single();

    console.log("data is : ", gallery);
    
    if (gallery_error) {
        return {
            success: false,
            message: gallery_error.message,
            url: null
        }
    }

    await supabase
            .storage
            .from("resty")
            .remove([gallery.file_path]);
    await supabase
            .from("gallery")
            .delete()
            .eq("id",id);


    return {
        message: "Gallery image has been deleted successfully",
        success: true,
        url: null  
    }
}