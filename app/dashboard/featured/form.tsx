"use client"
import { Button } from "@/components/reusable/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useActionState } from "react";
import { saveProduct } from "./actions";
import toast from "react-hot-toast";
import { FeaturedProducts } from "./page";

type FeaturedFormProps = {
    onCancel: () => void
    onSuccess: () => void
    product?: FeaturedProducts | null
}

type File = {
    key: number
    value: string|null 
}

const FeaturedForm = (props:FeaturedFormProps) => {
    const [state,action,pending] = useActionState(saveProduct,{message:null,success:false});
    const [preview,setPreview] = React.useState<File[]>([{key:0,value:null}]);
    const imageRef = React.useRef<HTMLInputElement|null>(null);

    const uploadImage = (url:string|null) => {
        setPreview(prev=>[...prev,{
            key: preview.length,
            value: url 
        }]);
    }

    React.useEffect(() => {
        if (props.product) {
            setPreview(prev=>(
                [...prev,{
                    key:1,
                    value:props.product?.url ?? ""
                }]
            ));
        }
    },[])

    React.useEffect(() => {
        if (!state || !state.success ) return;

        if (state.success){
            props.onCancel();
            props.onSuccess();
            toast.success(state.message)
        } else {
            toast.error(state.message);
        }
    }, [state])

    return (
        <form action={action} className="flex flex-col gap-8 w-full">
            <div className="flex flex-col items-center justify-center gap-2">
                {preview.length > 0 && preview[preview.length-1].value != null ? (
                    <div className="relative">
                        {preview[preview.length-1].value != props?.product?.url && (
                        <FontAwesomeIcon className="absolute top-0 right-0 text-red-500 cursor-pointer" 
                            icon={faClose} 
                            onClick={() => {
                                uploadImage(null);
                                if (imageRef.current) imageRef.current.value = "";
                            }}/>
                        )}
                        <img src={preview[preview.length-1].value ?? ""} className="w-32 h-32"/>
                    </div>
                ) : (
                    props.product?.url ? (
                        <img src={props.product.url} className="w-32 h-32"/>
                    ) :   
                    <div className="flex items-center justify-center w-32 h-32 border border-gray-300">
                        No image yet
                    </div>
                )}
                <input ref={imageRef} 
                    type="file" name="image" className="w-40 h-8 border-1 border-gray-300 p-2 cursor-pointer" 
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        uploadImage(file ? URL.createObjectURL(file) : null)}}
                    required={!props.product}/>
            </div>
            <input type="hidden" name="id" defaultValue={props.product?.id ?? 0}/>
            <div className="flex lg:flex-row flex-col w-full gap-2">
                <p className="lg:w-1/5 w-full flex justify-start font-bold">
                    Name
                </p>
                <div className="lg:w-4/5 w-full">
                    <input type="text" name="name" defaultValue={props.product?.name} className="w-full h-8 border-1 border-gray-300 p-2" required/>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col w-full gap-2">
                <p className="lg:w-1/5 w-full flex justify-start font-bold">
                    Description
                </p>
                <div className="lg:w-4/5 w-full">
                    <textarea name="description" defaultValue={props.product?.description} className="w-full h-24 border-1 border-gray-300 p-2" required rows={5}>
                    </textarea>
                </div>
            </div>
            <div className="flex lg:justify-end justify-center gap-2">
                <Button type="submit" bg="bg-green-500" color="text-white" disabled={pending}>
                    {pending ? "Loading ..." : (props.product ? "Update" : "Create")}
                </Button>  
                <Button type="button" bg="bg-red-500" color="text-white" onClick={props.onCancel}>
                    Cancel
                </Button>   
            </div>
        </form>
    )
}

export default FeaturedForm;