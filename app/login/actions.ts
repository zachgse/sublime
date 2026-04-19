"use server"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type State = {
    error: string | null;
}

export async function loginUser (
    prevState: State,
    formData: FormData
) : Promise<State>{
    const supabase = await createClient();
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        return {error:error.message}
    }

    redirect("/dashboard/story");
}

export async function logoutUser() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) return {errur:error.message}

    redirect("/login");
}
