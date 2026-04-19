import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";

type BackdropProps = React.PropsWithChildren & {
    isOpen: boolean
    class?: string
    onCancel?: () => void
}

const Backdrop = (props:BackdropProps) => {
    if (!props.isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
            <div className="fixed inset-0 flex justify-center items-center z-20" onClick={props.onCancel}>
                <div onClick={(e) => e.stopPropagation()}className={clsx("bg-white shadow-lg rounded-lg flex flex-col gap-4 p-6 relative overflow-y-auto",
                    props.class ?? "lg:w-1/5 md:w-2/5 w-4/5 items-center justify-center text-center"
                )}> 
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default Backdrop;