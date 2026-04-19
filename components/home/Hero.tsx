import { IBM_Plex_Serif, Pacifico } from "next/font/google";
import { Button } from "../reusable/Button";

const styled = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['700']
})

const cursive = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
})

const Hero = () => {
    return (
      <div className="hero flex items-center"> 
        <div className="px-4 lg:px-40">
          <div className="flex flex-col gap-6 lg:w-2/5 mx-auto lg:mx-0 text-[#ebded6]">
            <p className={`${styled.className} text-[60px]`}>
              Where simplicity <br />
              tastes <span className={`${cursive.className}`}>Sublime</span>
            </p>
            <hr className="text-[#ebded6]"/>
            <p>
              Sublime Cafe is built on the beauty of simplicity. From sourcing to brewing, every detail is handled with precision. We focus on clean flavors and a refined experience. Step inside and discover how minimal design enhances every sip.
            </p>
            <a href="https://www.foodpanda.ph/restaurant/d9gt/sublime-cafe-marcos-alvarez-avenue" target="_blank">
              <Button type="button" bg="bg-[#59321a]" color="text-white">Order now!</Button>
            </a>
          </div>
        </div>
      </div>
    )
}

export default Hero;