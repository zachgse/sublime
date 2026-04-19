"use client"
import React, { useActionState } from "react"
import toast from "react-hot-toast"
import { handleAction } from "./actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"
import Backdrop from "@/components/reusable/Backdrop"
import Loader from "@/components/reusable/Loader"

type GalleryDataProps = {
    images: {
        id: number
        is_active: boolean
        url: string
    }[]
    onSuccess: () => void
}

const GalleryData = (props:GalleryDataProps) => {
    const [state,action,pending] = useActionState(handleAction,{success:null,message:null,url:null})

    React.useEffect(() => {
        if (!state || state.success == null) return;

        if (state.success) {
            props.onSuccess();
            toast.success(state.message)
        } else {
            toast.error(state.message);
        }
    }, [state])

    return (
        <>
            {pending && (
                <Backdrop isOpen={pending}> 
                    <Loader/>
                </Backdrop>
            )}
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4">#</TableHead>
                        <TableHead className="w-1/2">Image</TableHead>
                        <TableHead className="w-1/4 text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.images && props.images.length > 0 ? (
                        props.images.map((image,index) => (
                            <TableRow key={image.id}>
                                <TableCell className="font-semibold">{index+1}</TableCell>
                                <TableCell className="font-medium">
                                    <img src={image.url} className="md:w-1/2 w-full h-24 md:h-60"/>
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center">
                                        <DropdownMenuItem>
                                            <form action={action} className="w-full">
                                                <input type="hidden" name="id" value={image.id}/>
                                                <button type="submit" className="cursor-pointer w-full !text-red-500 hover:!text-red-500 focus:!text-red-500">
                                                    Delete
                                                </button>
                                            </form>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No data yet.
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </>
    )
}

export default GalleryData;