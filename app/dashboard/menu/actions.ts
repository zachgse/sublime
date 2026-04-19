"use server"
import { createClient } from "@/lib/supabase/server";

type State = {
    success: boolean | null
    message: string | null
    url: string|null
}

export async function uploadFile(
    prevState: State,
    formData:FormData
):Promise<State>{
    const file = formData.get("image") as File;
    const filePath = `menu/${Date.now()}-${file.name}`; //path inside bucket
    const supabase = await createClient();

    const { data:image,error:image_error } = await supabase.storage
                                                        .from("resty") //bucket
                                                        .upload(filePath,file);
    if (image_error) {
        return { 
            success:false,
            message: image_error.message,
            url: null
        }
    }

    const {data:image_path } = await supabase.storage
                                            .from("resty")
                                            .getPublicUrl(filePath);

    const { data:menu,error:menu_error } = await supabase.from("menu")
                                                        .insert({
                                                            "url":image_path.publicUrl,
                                                            "is_active":true
                                                        });
    if (menu_error) {
        return { 
            success:false,
            message: menu_error.message,
            url: null
        }
    }

   return {
        success: true,
        message: "File uploaded successfully",
        url: image_path.publicUrl
   }
}