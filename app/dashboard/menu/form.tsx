"use client"
import React, { useActionState } from "react";
import toast from "react-hot-toast";
import { uploadFile } from "./actions";
import { Button } from "@/components/reusable/Button";

type MenuFormProps = {
    url: string
}

const MenuForm = (props:MenuFormProps) => {
    const [url,setNewUrl] = React.useState<string>(props.url ?? "");
    const [state,action,pending] = useActionState(uploadFile,{success:null,message:null,url:null});

    React.useEffect(() => {
        if (!state || state.success == null) return;
        if (state.success){
            toast.success("File uploaded successfully");
            setNewUrl(state.url ?? "");
        } else {
            toast.error("File upload error");
        }
    }, [state])

    return (
        <form action={action} className="w-fit flex flex-col gap-4">
            <div className="flex gap-2">
                <p className="font-bold">Current menu:</p>
                <a href={url} target="blank" className="text-blue-500">Menu</a>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-bold">Upload new menu</p>
                <input type="file" className="border border-gray-300 w-fit h-12 cursor-pointer" name="image" accept="image/jpg" required/>
            </div>
            {state.success == false && (
                <p className="text-red-500">
                    Upload failed because of {state.message}
                </p>
            )}
            <div className="flex justify-end">
                <Button type='submit' bg="bg-[#a2784f]" color="text-white" disabled={pending}>
                    {pending ? "Uploading..." : "Upload"}
                </Button>
            </div>
        </form>
    )
}

export default MenuForm;