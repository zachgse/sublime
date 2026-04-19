import Link from "next/link";
import { Pacifico } from "next/font/google";
import { Card } from "@/components/reusable/Card";
import LoginForm from "./form";

const cursive = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
})

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#a2784f]">
            <Card class="w-4/5 md:w-2/5 xl:w-1/5 h-auto p-8">
                <Link href="/" className={`${cursive.className} text-[#a2784f] text-[60px] mb-12`}>Sublime</Link>
                <LoginForm/>
            </Card>
        </div>
    )
}

export default Login;