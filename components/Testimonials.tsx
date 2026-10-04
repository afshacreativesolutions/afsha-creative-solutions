"use client"
import React from 'react'
import AnimatedButton from './AnimatedButton'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { images } from '@/utils/images'
import Link from 'next/link'

const Testimonials = () => {
    return (
        <div className='bg-cardGray/20'>
            <div className='min-h-[140vh]  flex flex-col justify-between items-center py-20 max-w-[90%] mx-auto px-6 '>
                <div className='flex justify-between'>
                    <div className='font-heading text-3xl font-extralight tracking-[0.01em] w-[40%]'>
                        CRAFTED FOR SPACES. TRUSTED BY CUSTOMERS.
                    </div>

                    <div className='text-end text-sm text-textGray w-[40%] font-light'>
                        From the first measurement to the finished installation, our work is built around the customer's requirements. See what customers have to say about their experience with Afsha Creative Solution
                       <Link 
                       href="https://wa.me/919634776691?text=Hello%20Afsha%20Creative%20Solution%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20metal%20fabrication%20project." 
                       target='_blank'
                       rel="noopener noreferrer"
                                aria-label="WhatsApp"
                      > <div className='flex justify-end mt-6'>
                            <AnimatedButton text='GET A QOUTE' />
                        </div></Link>
                    </div>
                </div>

                <div className='flex gap-5 border-b border-white/10 pb-15'>
                    <div className='border border-white/[0.06] h-[480px] w-[280px] bg-cardGray rounded-xl p-4'>
                        <div className='flex justify-between items-center border-b border-white/6 p-1 py-5'>
                            <div className='relative h-10 border-white/10 bg-white/10
                     w-10 rounded-full overflow-hidden border flex justify-center items-center'>
                                <Image src="/google-lens-icon.png" width={20} height={20} alt='google-logo' className='h-5 w-5 object-contain' />
                            </div>
                            <div className=''>
                                <div className='text-sm'>
                                    GOOGLE REVIEWS
                                </div>
                                <div className='flex gap-0.5'>
                                    <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                    <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                    <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                    <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                    <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                    <div className='text-[9px] text-textGray'>
                                        80+ <br /> Reviews
                                    </div>
                                </div>

                            </div>

                            <div className='flex h-5 w-17 justify-center items-center gap-1 rounded-xl border bg-green-800/30 border-green-300/50'>
                                <div className='h-1.5 w-1.5 bg-green-700 rounded-full '></div>
                                <div className='text-[10px] font-light text-green-400'>Verified</div>
                            </div>
                        </div>

                        <div className='border-b border-white/10 p-3 flex flex-col gap-5 py-5'>
                            <div className='flex justify-between'>
                                <div className='flex gap-0.5'>
                                    <Image src="/star.svg" width={20} height={20} alt='star' className='h-5 w-5' />
                                    <Image src="/star.svg" width={20} height={20} alt='star' className='h-5 w-5' />
                                    <Image src="/star.svg" width={20} height={20} alt='star' className='h-5 w-5' />
                                    <Image src="/star.svg" width={20} height={20} alt='star' className='h-5 w-5' />
                                    <Image src="/star.svg" width={20} height={20} alt='star' className='h-5 w-5' />

                                </div>

                                <div className='text-[9px] text-textGray font-light'>
                                    9 month ago
                                </div>
                            </div>

                            <div className='italic font-extralight text-sm '>
                                "Hi Rohit Nyamgoud here
                                Railingo is not only a company it’s a family , In one word I can say is just close your eyes and go for the purchase you like. you will remember the product and person for a life time."
                            </div>
                        </div>

                        <div className='flex gap-2 p-1 pt-4 pb-6 border-b border-white/10'>
                            <div className='w-9 h-9 rounded-full bg-amber-700 flex justify-center items-center'>
                                r
                            </div>
                            <div className='text-sm'>
                                rohit nyamgoud
                                <div className='text-[9px] font-extralight text-textGray'>
                                    Verified Client
                                </div>
                            </div>
                        </div>

                        <div className='py-5 flex justify-center items-center'>
                            <button className='flex gap-1 items-center border cursor-pointer hover:bg-textGold/10 hover:border-textGold/30 hover:text-textGold border-white/10 p-2 rounded-xl text-[10px] font-light bg-white/5 tracking-[0.1em]'>
                                View 80+ Reviews on Google
                                <ExternalLink className='stroke-2 w-[10px]' />
                            </button>
                        </div>
                    </div>

                    <div className='h-[480px] w-[280px] flex flex-col justify-between'>
                        <div className='w-full h-[260px] border bg-cardGray flex flex-col justify-between border-white/10 rounded-xl p-4'>
                            <div className='flex gap-0.5 p-1 '>
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                            </div>

                            <div className='border-b p-1 py-5 border-white/10 text-[12px] italic font-extralight '>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque voluptates laudantium quam fugit impedit accusamus quia cum consequatur beatae unde at assumenda dolor eveniet tenetur, obcaecati nesciunt autem eum reprehenderit?
                            </div>

                            <div className='flex gap-2 p-1 pt-4 pb-6'>
                                <div className='w-9 h-9 rounded-full bg-amber-700 flex justify-center items-center'>
                                    r
                                </div>
                                <div className='text-sm'>
                                    rohit nyamgoud
                                    <div className='text-[9px] font-extralight text-textGray'>
                                        Verified Client
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='relative w-full h-[200px]  rounded-xl overflow-hidden'>
                            <Image src={images.iron_gates.ironGate3} fill sizes='100px 100px' alt='gate' className='object-cover' />
                        </div>
                    </div>
                    <div className='h-[480px] w-[280px] flex flex-col justify-between'>

                        <div className='relative w-full h-[200px]  rounded-xl overflow-hidden'>
                            <Image src={images.steel_stair_railing.ssStairRailling11} fill sizes='100px 100px' alt='gate' className='object-cover' />
                        </div>

                        <div className='w-full h-[260px] bg-cardGray border flex flex-col justify-between border-white/10 rounded-xl p-4'>
                            <div className='flex gap-0.5 p-1 '>
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                            </div>

                            <div className='border-b p-1 py-5 border-white/10 text-[12px] italic font-extralight '>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque voluptates laudantium quam fugit impedit accusamus quia cum consequatur beatae unde at assumenda dolor eveniet tenetur, obcaecati nesciunt autem eum reprehenderit?
                            </div>

                            <div className='flex gap-2 p-1 pt-4 pb-6'>
                                <div className='w-9 h-9 rounded-full bg-amber-700 flex justify-center items-center'>
                                    r
                                </div>
                                <div className='text-sm'>
                                    rohit nyamgoud
                                    <div className='text-[9px] font-extralight text-textGray'>
                                        Verified Client
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='h-[480px] w-[280px] flex flex-col justify-between'>
                        <div className='w-full h-[260px] bg-cardGray border flex flex-col justify-between border-white/10 rounded-xl p-4'>
                            <div className='flex gap-0.5 p-1 '>
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                                <Image src="/star.svg" width={15} height={15} alt='star' className='h-[15px] w-[15px]' />
                            </div>

                            <div className='border-b p-1 py-5 border-white/10 text-[12px] italic font-extralight '>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque voluptates laudantium quam fugit impedit accusamus quia cum consequatur beatae unde at assumenda dolor eveniet tenetur, obcaecati nesciunt autem eum reprehenderit?
                            </div>

                            <div className='flex gap-2 p-1 pt-4 pb-6'>
                                <div className='w-9 h-9 rounded-full bg-amber-700 flex justify-center items-center'>
                                    r
                                </div>
                                <div className='text-sm'>
                                    rohit nyamgoud
                                    <div className='text-[9px] font-extralight text-textGray'>
                                        Verified Client
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='relative w-full h-[200px]  rounded-xl overflow-hidden'>
                            <Image src={images.iron_gates.ironGate3} fill sizes='100px 100px' alt='gate' className='object-cover' />
                        </div>
                    </div>


                </div>

                <div className='flex w-full justify-between items-center p-1'>
                    <div className='text-5xl font-light'>
                        80+
                        <div className='text-[9px] mt-2 uppercase text-textGray font-extralight'>
                            Total Reviews
                        </div>
                    </div>

                    <div className='text-5xl font-light'>
                        100+
                        <div className='text-[9px] mt-2 uppercase text-textGray font-extralight'>
                            Custom Railing
                        </div>
                    </div>

                    <div className='text-5xl font-light'>
                        400+
                        <div className='text-[9px] mt-2 uppercase text-textGray font-extralight'>
                            Custom Gate
                        </div>
                    </div>

                    <div className='text-5xl font-light'>
                        10+
                        <div className='text-[9px] mt-2 uppercase text-textGray font-extralight'>
                            Year Working
                        </div>
                    </div>

                    <div className='text-5xl font-light'>
                        99.4%
                        <div className='text-[9px] mt-2 uppercase text-textGray font-extralight'>
                            On-Time Handover Rate
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Testimonials