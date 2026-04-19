"use client"
import React, { useActionState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "./actions";
import { Button } from "@/components/reusable/Button";
import Backdrop from "@/components/reusable/Backdrop";
import Loader from "@/components/reusable/Loader";

type GalleryFormProps = {
    onSuccess: () => void
}

const GalleryForm = (props:GalleryFormProps) => {
    const [state,action,pending] = useActionState(uploadImage,{success:null,message:null,url:null});

    React.useEffect(() => {
        if (!state || state.success == null) return;

        if (state.success) {
            props.onSuccess();
            toast.success("New image has been added to the gallery");
        } else {
            toast.error("Error");
        }
    }, [state])

    return (
        <>
            {pending && (
                <Backdrop isOpen={pending}> 
                    <Loader/>
                </Backdrop>
            )}
            <form action={action} className="flex flex-wrap items-center justify-between gap-2 p-2">
                <input type="file" className="border border-gray-300 w-fit h-12 cursor-pointer" name="image" required/>
                <Button bg="bg-[#a2784f]" color="text-white" type="submit" disabled={pending} >
                    {pending ? "Uploading ..." : "Add new image"}
                </Button>
            </form>
        </>
    )
}

export default GalleryForm;