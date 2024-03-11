// 'use client'

// import { useEffect, useState } from "react"

// const Scroll = () => {

//     const [animationCompleted, setAnimationCompleted]  = useState<boolean>(false)


//     useEffect(() => {
//         window.addEventListener("wheel", (e) => e.preventDefault(), {passive: false})
//     }, [])


//     return (
//         <div className='h-screen bg-lime-500 '>
//             <div
//                 className='h-screen bg-red-600'>
//                 lorem
//             </div>
//             <div className='h-screen bg-gray-600'>
//                 lorem
//             </div>
//         </div>

//     )
// }

// export default Scroll

//hero 
"use client"
import React from "react"
import Text from "./Text"
import Video from "@/common/ui/Video"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useAnimationComplete } from "@/store/animationStore"

gsap.registerPlugin(ScrollTrigger)
const Hero = () => {

  const { setIsAnimating, isAnimating } = useAnimationComplete((store) => ({
    setIsAnimating: store.setIsAnimating,
    isAnimating: store.isAnimating
  }))

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add("(min-width:1280px)", () => {
      gsap.to(".bigM", {
        scrollTrigger: {
          trigger: ".hero",
          end: "bottom 1vh",
          pin: true,
          pinSpacing: false,
        },
      })

      gsap.to(".hero", {
        scrollTrigger: {
          trigger: ".triggerSectionone",
          onUpdate: (self) => {
            gsap.to(".hero", {
              keyframes: {
                opacity: [1, 0.8, 1],
              },
            })
            gsap.to(".triggerSectionone", {
              keyframes: {
                opacity: [1, 1, 1],
              },
              clipPath: "circle(100%)",
              duration: 1,
              delay: 1,
              zIndex: 10,
              onStart: () => setIsAnimating(true),
              onComplete: () => setIsAnimating(false)
            })
          },
          // onanimationstart: () => console.log('animation started 😒😒'),
          // onanimationend: () => console.log('animation ended 👑')
        },
      })
    })
  })

  const handleButtonClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative h-screen  w-screen  bigM  panel z-10">
      <section className="z-10 h-screen  hero ">
        <Video src="/home/video/banner.mp4" />
        <div className="absolute mx-auto left-[5%] xl:left-[10%] 2xl:left-[20%] right-0 top-[30%]">
          <Text />
        </div>
        <div
          className="absolute  left-1/2 -translate-x-1/2 bottom-[10%]   w-12 cursor-pointer"
          onClick={() => handleButtonClick("sectionone")}
        >
          <div className="imagewrapper">
            <div className="image imageone"></div>
            <div className="image imagetwo"></div>
            <div className="image imagethree"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero


//section one 
"use client"
import { Button } from "@/common/ui/Button"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import controller from "@/../public/home/images/controller.svg"

import Textanimation from "@/common/ui/Textanimation"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import GradientSvg from "@root/public/home/images/grad.png"
import { Observer } from "gsap/Observer"
import { useAnimationComplete } from "@/store/animationStore"

gsap.registerPlugin()
const SectionOne = () => {


  const { isAnimating } = useAnimationComplete((store) => ({
    isAnimating: store.isAnimating
  }))


  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width:1280px)", () => {
      gsap.to(".pAnimate", {
        scrollTrigger: {
          trigger: ".vrAnimate",
          toggleActions: "play none none reset",
        },
        scale: 0.6,
        translateY: "65vh",
        opacity: 0,
        zIndex: -10,
        duration: 0.8,

      })

      

    })
  })


useEffect(() => {
  const handleWheel = (e) => {
    if (isAnimating) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };

  if (isAnimating) {
    document.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false
    });
  } else {
    document.removeEventListener("wheel", handleWheel, {
      capture: true,
      // passive: false
    });
  }

  // Cleanup function to remove event listener when component unmounts
  return () => {
    document.removeEventListener("wheel", handleWheel, {
      capture: true,
      // passive: false
    });
  };
}, [isAnimating]);

  const classname =
    "text-white font-audioWide text-[30px] md:text-[50px] uppercase text-center leading-[32px] md:leading-[52px] mx-4 "
  return (
    <>
      <div
        id="sectionone"
        className=" xl_md:h-screen w-screen panel z-20 relative triggerSectionone xl:bg-primary overflow-hidden"
      >
        <div className="md:py-48 xl_md:py-0 xl_md:h-screen w-screen flex flex-col md:justify-center mt-24 items-center max-w-[1120px] mx-auto gap-4 md:gap-10 px-2  pAnimate ">
          <div className="mt-24 md:mt-0 xl_md:-mt-24 ">
            <Textanimation
              text="weaving the future - design,"
              className={classname}
            />
            <Textanimation text=" code, create" className={classname} />
          </div>
          <p className="font-raleway  text-lightBlue text-[16px] leading-[25px] md:text-[20px] md:mb-0 mb-8  font-[400] text-center mx-3">
            GameMano is a product development company that exclusively focuses
            on game entertainment. We craft beautiful and exciting games that
            people want to continue playing. With our efficient industry
            experience, we will take care of your gaming needs from start to
            finish.
          </p>
          <motion.div className="mx-3 md:hidden">
            <Image src={controller} alt="controller" width={333} height={300} />
          </motion.div>
          <div className="mt-6 md:mt-20 z-50 relative">
            <Link href="/contact" className="md:block hidden">
              <Button variant="primary" className="">
                Get in touch
              </Button>
            </Link>
            <Link href="/contact" className="md:hidden block">
              <Button variant="primary">Contact us</Button>
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-0  justify-center items-center w-full h-full  rotating-container z-30 -translate-x-1/2  hidden xl:flex">
          <Image
            src={GradientSvg}
            alt="gradient"
            width={1400}
            height={900}
            className="opacity-40 object-cover rotating-image "
          />
        </div>
      </div>
    </>
  )
}

export default SectionOne

//store
import { produce } from "immer"
import { create } from "zustand"
import { devtools } from "zustand/middleware"


interface useAnimationComplete {
    isAnimating: boolean;
    setIsAnimating: (value: boolean) => void
}

export const useAnimationComplete = create<useAnimationComplete>() (
    devtools((set) => ({
        isAnimating: false,
       setIsAnimating(payload) {
        set(
            produce<useAnimationComplete>((draft) => {
                draft.isAnimating = payload
            })
        )
       }
    }))
)