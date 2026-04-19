"use server"
import { createClient } from "@/lib/supabase/server";

type State = {
    message: string | null
    success: boolean
}

export async function saveProduct(
    prevState:State,
    formData:FormData
):Promise<State>{
    const supabase = await createClient();
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const id = Number(formData.get("id"));
    let filePath = null;
    let image = null;
    try {
        if (file.size > 0) {
            filePath = `featured_products/${Date.now()}-${file.name}`;
            await supabase.storage
                        .from("resty")
                        .upload(filePath,file);
            const { data } = await supabase.storage
                                            .from("resty")
                                            .getPublicUrl(filePath);
            image = data;
        }

        switch (id){
            case 0: 
                await supabase 
                    .from("featured_products")
                    .insert({
                        "url":image?.publicUrl,
                        "name":name,
                        "description":description,
                        "is_active":true,
                        "file_path":filePath,
                    });
                break;
            default:
                const { data } = await supabase
                                    .from("featured_products")
                                    .select("*")
                                    .eq("id",id)
                                    .single();
                if (file.size > 0) {
                    await supabase
                        .storage
                        .from("resty")
                        .remove([data.file_path]);
                }
                await supabase
                    .from("featured_products")
                    .update({
                        "url": file.size > 0 ? image?.publicUrl : data.url,
                        "name":name,
                        "description":description,
                        "is_active":true,
                        "file_path": file.size > 0 ? filePath : data.file_path,
                    })
                    .eq("id",id);
                break;
        }
    
        return {
            message: `Product has been successfully ${id == 0 ? 'created' : 'updated'}.`,
            success: true
        }

    } catch (error){
        console.error(error);
        return {
            message: "Something went wrong",
            success: false
        }
    }
}

export async function deleteProduct(
    prevState:State,
    formData:FormData
):Promise<State>{
    const supabase = await createClient();
    const id = Number(formData.get("id"));

    const { data:product,error:product_error } = await supabase
                                                        .from("featured_products")
                                                        .select("*")
                                                        .eq("id",id)
                                                        .single();
                                                    
    if (product_error) {
        return {
            message: "Product not found",
            success: false
        }
    }

    await supabase.storage.from("resty").remove([product.file_path]);
    await supabase.from("featured_products").delete().eq("id",id);
    
    return {
        message: "Product has been deleted",
        success: true
    }
}