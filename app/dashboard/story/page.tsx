import { createClient } from "@/lib/supabase/server";
import StoryForm from "./form";

const Story = async() => {
    const supabase = await createClient();
    const { data:story } = await supabase.from("story")
                                        .select()
                                        .order("created_at",{ascending:false})
                                        .limit(1)
                                        .single();
    // console.log("dataa is: ",story);

    return <StoryForm data={story} />
}

export default Story;