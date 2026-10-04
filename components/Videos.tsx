"use client"
import React, { useEffect, useRef } from 'react'
import AnimatedButton from './AnimatedButton'


const Videos = () => {
    const video1 = useRef<HTMLVideoElement>(null)
    const video2 = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (video1.current) video1.current.playbackRate = 0.5
        if (video2.current) video2.current.playbackRate = 0.5
    }, [])

    return (
        <div className='mx-auto flex min-h-screen max-w-[90%] flex-col items-center gap-8 px-6 lg:h-screen lg:flex-row'>
            <div className='flex min-h-screen w-full flex-col justify-between p-6 lg:h-full lg:min-h-0 lg:w-1/2'>
                <div className='font-heading text-3xl font-extralight tracking-[0.01em]'>
                    THE ARTISANS OF METALWORK
                    <div className='text-[11px] text-textGold font-light tracking-[0.2em] mt-4'>
                        where skilled fabrication meets thoughtful design.
                        <div className='w-12 border-b border-textGold/60 mt-2'></div>
                    </div>
                </div>
                <div className='relative h-[250px] w-full max-w-[500px] overflow-hidden rounded-md sm:h-[250px]'>
                    <video
                        ref={video1}
                        src='/videos/Process/Stainless_steel_stair_railing_fa…_20260924130559_gwr_video_mvp.mp4'
                        className='absolute inset-0 z-0 h-full w-full object-cover'
                        muted
                        playsInline
                        preload='metadata'
                        autoPlay
                        loop
                    />
                </div>
                <div className='text-textGray'>
                    At Afsha Creative Solution, metalwork is built around the details. From elegant stair and balcony railings to custom steel and iron gates, our workshop creates practical, made-to-measure solutions for homes, businesses, and construction projects. Every project is shaped by hands-on fabrication, careful finishing, and real-world experience.
                </div>
                <div className='flex justify-center'>

                <AnimatedButton text='OUR ARTISANS' />
                </div>
            </div>

            <div className='w-full lg:w-1/2'>
                <div className='relative h-[28rem] w-full  overflow-hidden rounded-md sm:h-[32rem] lg:h-[42rem]'>
                    <video
                        ref={video2}
                        src="/videos/Products/Architectural_metalwork_promotio…_1080p_20260924135445.mp4"
                        className='absolute inset-0 z-0 h-full w-full object-cover'
                        muted
                        playsInline
                        preload='metadata'
                        autoPlay
                        loop
                    ></video>
                </div>
            </div>
        </div>
    )
}

export default Videos