import { createClient } from "@/lib/supabase/server";
import MenuForm from "./form";

const Menu = async() => {
    const supabase = await createClient();
    const { data } = await supabase.from("menu").select("url").order("created_at",{ascending:false}).limit(1).single();
    return (
        <div>
            <MenuForm url={data?.url}/>
        </div>
    )
}

export default Menu;