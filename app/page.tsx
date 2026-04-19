import { IBM_Plex_Serif,Pacifico,Roboto } from "next/font/google";
import { Footer } from "@/components/ui/Footer";
import Hero from "@/components/home/Hero";
import Info from "@/components/home/Info";
import { createClient } from "@/lib/supabase/server";
import Signature from "@/components/home/Signature";

const cursive = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
})

const normal = Roboto({
    subsets: ['latin'],
    weight: ['400'],
})

export default async function Home() {
  const supabase = await createClient();
  const { data:story } = await supabase.from("story").select("content").single();
  const { data:menu } = await supabase.from("menu").select("url").order("created_at",{ascending:false}).limit(1).single();
  const { data:gallery } = await supabase.from("gallery").select("*");
  const { data:signature } = await supabase.from("featured_products").select("*");

  return (
    <div className={`${normal.className}`}>
      <Hero/>
      <div className="min-h-screen py-12 bg-[#f2ede3]">
        <Info story={story} menu={menu} gallery={gallery ?? []}/>
        <hr className="text-[#e5e0d6] w-full my-20"/>
        <div className="text-center text-[#34241c] mb-8 px-4 lg:px-24">
          <p className={`${cursive.className} text-[40px] font-bold underline`}>
            Signature Coffee Blends
          </p>
          <p className="font-semibold">Indulge in our best-loved creations</p>
        </div>
        <Signature products={signature ?? []}/>
      </div>
      <Footer/>
    </div>
  );
}
