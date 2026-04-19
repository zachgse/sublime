"use client"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import React, { useActionState } from "react"
import Backdrop from "@/components/reusable/Backdrop"
import FeaturedForm from "./form"
import type { FeaturedProducts } from "./page"
import { MoreHorizontalIcon } from "lucide-react"
import { deleteProduct } from "./actions"
import toast from "react-hot-toast"

type FeaturedDataProps = {
    data: FeaturedProducts[]
    onSuccess: () => void
}

type Modal = {
    data: FeaturedProducts | null
    isOpen: boolean
}

const FeaturedData = (props:FeaturedDataProps) => {
    const [state,action,pending] = useActionState(deleteProduct,{message:null,success:false});
    const [modal,setModal] = React.useState<Modal>();

    const toggleModal = (product?:FeaturedProducts) => {
        setModal(prev=>({
            isOpen:!prev?.isOpen,
            data:product ?? null
        }));
    }

    React.useEffect(() => {
        if (!state || !state.success ) return;

        if (state.success){
            props.onSuccess();
            toast.success(state.message)
        } else {
            toast.error(state.message);
        }
    }, [state])

    return (
        <>
            {modal?.isOpen && (
                <Backdrop isOpen={modal?.isOpen ?? false} onCancel={()=>toggleModal()} class="md:w-2/5 w-4/5">
                    <FeaturedForm onCancel={() => toggleModal()} onSuccess={props.onSuccess} product={modal?.data ?? null}/>
                </Backdrop>
            )}
            {props.data.length < 3 && (
                <div className="w-full flex justify-end mb-12">
                    <div onClick={()=>toggleModal()} className="float-right w-fit h-10 px-12 rounded-lg flex items-center gap-1 bg-[#a2784f] text-white cursor-pointer hover:opacity-75">
                        <FontAwesomeIcon icon={faPlus}/>
                        Add new product
                    </div>
                </div>
            )}
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-24">#</TableHead>
                        <TableHead className="w-80">Image</TableHead>
                        <TableHead className="w-40">Name</TableHead>
                        <TableHead className="w-[300px]">Description</TableHead>
                        <TableHead className="w-12 text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.data && props.data.length > 0 ? (
                        props.data.map((product,index) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-semibold">{index+1}</TableCell>
                                <TableCell className="font-medium">
                                    <img src={product.url} className="md:w-1/2 w-full h-24 md:h-48"/>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p>{product.name}</p>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p>{product.description}</p>
                                </TableCell>
                                <TableCell className="text-center mx-auto">
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center">
                                        <DropdownMenuItem>
                                            <p className="mx-auto cursor-pointer" onClick={() => toggleModal(product)}>Edit</p>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <form action={action} className="w-full">
                                                <input type="hidden" name="id" value={product.id}/>
                                                <button className="cursor-pointer w-full !text-red-500 hover:!text-red-500 focus:!text-red-500" type="submit">
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
                            <TableCell colSpan={5} className="text-center">
                                No data yet.
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </>
    )
}

export default FeaturedData;