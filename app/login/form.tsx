"use client"
import { useActionState } from "react"
import { loginUser } from "./actions"
import { Button } from "@/components/reusable/Button"

const LoginForm = () => {
    const [state,action,pending] = useActionState(loginUser,{error:null});
    
    return (
        <form action={action}>
            <div className="flex flex-col gap-8">
                <div className="flex w-full">
                    <p className="w-2/5 flex justify-start font-bold">
                        Email
                    </p>
                    <div className="w-3/5">
                        <input type="email" name="email" className="w-full h-8 border-1 border-gray-300 p-2" required/>
                    </div>
                </div>
                <div className="flex w-full">
                    <p className="w-2/5 flex justify-start font-bold">
                        Password
                    </p>
                    <div className="w-3/5">
                        <input type="password" name="password" className="w-full h-8 border-1 border-gray-300 p-2" required/>
                    </div>
                </div>
                {state.error && (
                    <p className="text-red-500">
                        Incorrect login credentials.
                    </p>
                )}
                <div className="flex justify-end">
                    <Button type="submit" bg="bg-[#a2784f]" color="text-white" disabled={pending}>
                        {pending ? "Logging in ..." : "Login"}
                    </Button>
                </div>
            </div>
        </form>
    )
}


export default LoginForm;