"use client"
import React from 'react'
import toast from 'react-hot-toast'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { supabase } from '@/lib/supabase/client'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { MenuBar } from '@/components/reusable/Editor/MenuBar'
import { Button } from '@/components/reusable/Button'
import Backdrop from '@/components/reusable/Backdrop'
import Loader from '@/components/reusable/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'

type FormProps = {
    data: {
        id: number
        content: string
    } | null
}

type Status = "confirmation" | "loading" | null

const StoryForm = ({data}:FormProps) => {
    const [content,setContent] = React.useState<string|null>(data?.content ?? "<p>Hello world! 🌍</p>");
    const [status,setStatus] = React.useState<Status>();

    const editor = useEditor({
        extensions: [
            StarterKit, 
            TextStyleKit
        ],
        content: content,
        immediatelyRender: false,
    });

   
 if (!editor) return null;
    const handleSave = async() => {
        setStatus("loading");
        const html = editor.getHTML();
        if (!data?.content) {
            await supabase.from("story").insert({content:html});
        } else {
            await supabase.from("story").update({content:html}).eq("id",data.id)
        }
        setContent(html);
        await new Promise(resolve => setTimeout(resolve,1000));
        setStatus(null);
        toast.success("Successfully saved the changes.");
    }

    return (
        <>
            <Backdrop isOpen={status != null}>
                {status == "loading" ? <Loader/> : (
                    <>
                        Confirm update for new changes?
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Button onClick={handleSave} type='button' bg="bg-green-500" color="text-white">
                                <FontAwesomeIcon icon={faFloppyDisk} color="text-green-500"/>
                                Save
                            </Button>
                            <Button onClick={() => setStatus(null)} type='button' bg="bg-red-500" color="text-white">
                                <FontAwesomeIcon icon={faXmark} color="text-red-500"/>
                                Discard
                            </Button>
                        </div>
                    </>
                )}
            </Backdrop>
            <div className="flex flex-col gap-4">
                <div className="lg:h-[600px] h-[500px] w-full border border-gray-300 overflow-auto flex flex-col gap-2">
                    <MenuBar editor={editor}/>
                    <EditorContent
                        editor={editor}
                        className="h-full w-full p-4"/>        
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => setStatus("confirmation")} type='button' bg="bg-[#a2784f]" color="text-white">Update</Button>
                </div>
            </div>
        </>
    )
}

export default StoryForm;