"use client"

import { useEffect, useRef } from 'react'
import AnimatedButton from './AnimatedButton'
import Link from 'next/link'

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        // Start video playback after initial paint so video buffering does not compete with LCP
        if (videoRef.current) {
            videoRef.current.play().catch(() => {})
        }
    }, [])

    return (
        <section className='relative -mt-16 h-[100svh] min-h-[620px] w-full overflow-hidden'>
            <div className='absolute inset-0'>
                <video
                    ref={videoRef}
                    poster='/videos/hero-poster.webp'
                    className='absolute inset-0 z-0 h-full w-full object-cover'
                    src='/videos/hero3.mp4'
                    muted
                    playsInline
                    preload='none'
                    
                />
                <div className='absolute inset-0 z-5 bg-black/40' />

                <div className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-3 pt-14 sm:gap-5 sm:px-4 sm:pt-16'>
                    <div className='rounded-full bg-black/50 px-3 py-1 text-center text-[9px] font-light tracking-[0.16em] text-textGold sm:text-[11px] sm:tracking-[0.2em]'>
                        THE ART OF CUSTOM METALWORK
                    </div>
                    <div className='pl-[0.12em] text-5xl font-light tracking-[0.24em] text-textWhite sm:text-7xl sm:tracking-[0.32em] lg:text-8xl lg:tracking-[0.4em]'>
                        AFSHA
                    </div>
                    <div className='max-w-3xl text-center text-xs leading-6 tracking-[0.13em] text-textWhite sm:text-base sm:leading-7 sm:tracking-[0.2em] lg:text-lg'>
                        BESPOKE METAL FABRICATION & ARCHITECTURAL RAILINGS
                        <br />
                        CRAFTED FOR ELEGANCE. BUILT FOR LIFE.
                    </div>
                    <div className='mt-2 flex w-full max-w-[560px] flex-col items-center gap-2 sm:mt-5 sm:flex-row sm:justify-center sm:gap-4'>
                       <Link className='flex min-h-12 w-full justify-center sm:w-auto' href={"#collection"}> <AnimatedButton text='Explore Collection' /></Link>
                       <Link className='flex min-h-12 w-full justify-center sm:w-auto' href={"/contact"}> <AnimatedButton iconColor='#CDA274' textColor='#CDA274' dotColor='#000000' text='Book Consultation' /></Link>
                    </div>

                    <div className='mt-5 flex flex-col items-center justify-center gap-2 sm:mt-16 sm:gap-3'>
                        <div className='text-textGray text-[9px] font-extralight tracking-[0.2em]'>SCROLL TO EXPLORE</div>

                        <div className='relative flex justify-center h-10 w-px bg-gradient-to-b from-textGray to-transparent'>
                            <div className='h-6 gold-stick w-px'></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero
