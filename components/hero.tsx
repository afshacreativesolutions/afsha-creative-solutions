"use client"

import { useEffect, useRef } from 'react'
import AnimatedButton from './AnimatedButton'
import Link from 'next/link'

const hero = () => {
    // const heroRef = useRef<HTMLElement>(null)
    // const videoRef = useRef<HTMLVideoElement>(null)

    // useEffect(() => {
    //     const heroElement = heroRef.current
    //     const videoElement = videoRef.current

    //     if (!heroElement || !videoElement) return

    //     const updateVideoTime = () => {
    //         if (!Number.isFinite(videoElement.duration)) return

    //         const start = heroElement.offsetTop
    //         const scrollDistance = heroElement.offsetHeight - window.innerHeight
    //         const progress = Math.min(
    //             1,
    //             Math.max(0, (window.scrollY - start) / scrollDistance),
    //         )

    //         videoElement.currentTime = videoElement.duration * progress
    //     }

    //     videoElement.addEventListener('loadedmetadata', updateVideoTime)
    //     window.addEventListener('scroll', updateVideoTime, { passive: true })
    //     window.addEventListener('resize', updateVideoTime)
    //     updateVideoTime()

    //     return () => {
    //         videoElement.removeEventListener('loadedmetadata', updateVideoTime)
    //         window.removeEventListener('scroll', updateVideoTime)
    //         window.removeEventListener('resize', updateVideoTime)
    //     }
    // }, [])

    return (

        <section className=' -top-16 relative h-screen w-full overflow-hidden'>
            <div className='absolute  inset-0'>
                <video
                    // ref={videoRef}
                    poster='/video/poster.png'
                    className='absolute inset-0 z-0 h-full w-full object-cover'
                    src='/videos/hero.mp4'
                    muted
                    playsInline
                    preload='metadata'
                    autoPlay

                />
                <div className='absolute inset-0 z-5 bg-black/60' />

                <div className=' absolute inset-0 mt-36 z-10 flex flex-col items-center justify-center gap-5'>
                    <div className='text-[11px] text-textGold font-light tracking-[0.2em]'>
                        THE ART OF CUSTOM METALWORK
                    </div>
                    <div className='text-textWhite text-8xl font-light tracking-[0.4em]'>
                        AFSHA
                    </div>
                    <div className='text-textWhite tracking-[0.2em] text-lg  text-center'>
                        BESPOKE METAL FABRICATION & ARCHITECTURAL RAILINGS
                        <br />
                        CRAFTED FOR ELEGANCE. BUILT FOR LIFE.
                    </div>
                    <div className='flex gap-5 mt-5'>
                       <Link href={"#collection"}> <AnimatedButton text='Explore Collection' /></Link>
                       <Link href={""}> <AnimatedButton iconColor='#CDA274' textColor='#CDA274' dotColor='#000000' text='Book Consultation' /></Link>
                    </div>

                    <div className='mt-24 flex flex-col gap-3 justify-center items-center'>
                        <div className='text-textGray text-[9px] font-extralight tracking-[0.2em]'>SCROLL TO EXPLORE</div>

                        <div className='relative flex justify-center h-10 w-px bg-gradient-to-b from-textGray to-transparent'>
                            <div className='h-6 gold-stick w-px'></div>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>{`
            .gold-stick {
                background-color: #CDA274;
                animation: slideIn 1.2s ease-in-out infinite ,
                    colorChange 1.2s ease-in-out infinite ;
            }
            @keyframes slideIn {
                from { transform: translateY(0%); }
                to { transform: translateY(110%); }
                }

            @keyframes colorChange {
             0%   { background-color: color-mix(in srgb, #CDA274, transparent); }
             
            100% { background-color:  color-mix(in srgb, #CDA274 0%, transparent); }
            }
        `}

            </style>
        </section>
    )
}

export default hero