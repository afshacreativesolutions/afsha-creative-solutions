"use client"
import Image from 'next/image'
import React from 'react'
import logo from "../assets/Logo/logo-mark.png"
import { icons, images } from '@/utils/images'
import AnimatedButton from './AnimatedButton'
import Link from 'next/link'
const Footer = () => {
    return (
        <div className='bg-cardGray/20'>
            <div className='min-h-[50vh] max-w-[90%] px-6 mx-auto flex flex-col gap-5'>
                <div className='grid grid-cols-5 border-b border-white/10 py-8'>
                    <div className='flex flex-col gap-5 col-span-2 '>
                       <Link href={""}> <div className='flex items-end cursor-pointer'>
                            <div className='relative text-sm rounded-md overflow-hidden h-13 w-13'>
                                <Image src={logo} height={80} className='object-left' alt='logo' />
                            </div>
                            <div className='text-textGold px-1 tracking-[0.3em]'>
                                <p className='text-lg font-extrabold'>AFSHA</p>
                                <p className='text-xs '>CREATIVE SOLUTION</p>
                                {/* <p>SOLUTION</p> */}
                            </div>
                        </div> </Link>

                        <div className=' text-textGray font-extralight tracking-[0.06em]'>
                            Pioneering bespoke architectural metal engineering, parametric facade design, and luxury handcrafted portal systems across India.
                        </div>

                        <div className='flex gap-3'>
                            <Link
                                href="https://www.facebook.com/tinku.saifi.71?mibextid=ZbWKwL"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <div className='border group border-white/10 rounded-full w-fit p-2 hover:border-textGold/30 transition duration-300 ease-in-out'>
                                    <span
                                        aria-hidden='true'
                                        className='block h-5 w-5 bg-current text-white transition-colors duration-300 group-hover:text-textGold'
                                        style={{
                                            maskImage: `url(${icons.facebook.src})`,
                                            WebkitMaskImage: `url(${icons.facebook.src})`,
                                            maskRepeat: 'no-repeat',
                                            WebkitMaskRepeat: 'no-repeat',
                                            maskSize: 'contain',
                                            WebkitMaskSize: 'contain',
                                        }}
                                    />
                                </div>
                            </Link>

                            <Link
                                href="https://www.instagram.com/humdard_sahil_07?stkn=Z2k1anJlaDQ4MjF0"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <div className='border group border-white/10 rounded-full w-fit p-2 hover:border-textGold/30 transition duration-300 ease-in-out'>
                                    <span
                                        aria-hidden='true'
                                        className='block h-5 w-5 bg-current text-white transition-colors duration-300 group-hover:text-textGold'
                                        style={{
                                            maskImage: `url(${icons.instagrem.src})`,
                                            WebkitMaskImage: `url(${icons.instagrem.src})`,
                                            maskRepeat: 'no-repeat',
                                            WebkitMaskRepeat: 'no-repeat',
                                            maskSize: 'contain',
                                            WebkitMaskSize: 'contain',
                                        }}
                                    />
                                </div>
                            </Link>

                            <Link
                                href="https://wa.me/919634776691?text=Hello%20Afsha%20Creative%20Solution%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20metal%20fabrication%20project."
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                                <div className='border group border-white/10 rounded-full w-fit p-2 hover:border-textGold/30 transition duration-300 ease-in-out'>
                                    <span
                                        aria-hidden='true'
                                        className='block h-5 w-5 bg-current text-white transition-colors duration-300 group-hover:text-textGold'
                                        style={{
                                            maskImage: `url(${icons.whatsapp.src})`,
                                            WebkitMaskImage: `url(${icons.whatsapp.src})`,
                                            maskRepeat: 'no-repeat',
                                            WebkitMaskRepeat: 'no-repeat',
                                            maskSize: 'contain',
                                            WebkitMaskSize: 'contain',
                                        }}
                                    />
                                </div>
                            </Link>

                             <Link
                                href="https://wa.me/919634776691?text=Hello%20Afsha%20Creative%20Solution%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20metal%20fabrication%20project."
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                            <div className='border group border-white/10 rounded-full w-fit p-2 hover:border-textGold/30 transition duration-300 ease-in-out'>
                                <span
                                    aria-hidden='true'
                                    className='block h-5 w-5 bg-current text-white transition-colors duration-300 group-hover:text-textGold'
                                    style={{
                                        maskImage: `url(${icons.youtube.src})`,
                                        WebkitMaskImage: `url(${icons.youtube.src})`,
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                    }}
                                />
                            </div>
                            </Link>
                        </div>


                    </div>
                    <div className=''>
                        <div className='text-textGold text-xs font-bold tracking-[0.3em] mb-5'>COLLECTION</div>
                        <ol className='list-inside list-decimal font-extralight tracking-[0.06em] text-sm flex flex-col gap-2'>
                            <Link href={""}><li className="hover:text-textGold transition duration-200 ease-in-out hover:translate-x-1">Steel Gates</li></Link>
                            <Link href={""}><li className="hover:text-textGold transition duration-200 ease-in-out hover:translate-x-1">Steel Railings</li></Link>
                            <Link href={""}><li className="hover:text-textGold transition duration-200 ease-in-out hover:translate-x-1">Steel Spiral Railings</li></Link>
                            <Link href={""}><li className="hover:text-textGold transition duration-200 ease-in-out hover:translate-x-1">Steel Balcony Railings</li></Link>
                            <Link href={""}><li className="hover:text-textGold transition duration-200 ease-in-out hover:translate-x-1">Iron Gates</li></Link>
                            <Link href={""}><li className="hover:text-textGold transition duration-200 ease-in-out hover:translate-x-1">Iron Railings</li></Link>
                            <Link href={""}><li className="hover:text-textGold transition duration-200 ease-in-out hover:translate-x-1">Steel Balcony Railings</li></Link>
                        </ol>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='text-textGold text-xs font-bold mb-2 tracking-[0.3em]'>WORKSHOP</div>
                        <Link href="mailto:sales@afshacreative.com"> <div className='flex gap-2 text-sm font-extralight tracking-[0.06em]'>
                            <Image src={icons.mail} width={20} height={20} alt='Mail' />
                            <div className="hover:text-textGold transition duration-300 ease-in-out">sales@afshacreative.com</div>
                        </div> </Link>
                        <Link href="tel:+919624776691">  <div className='flex gap-2 text-sm font-extralight tracking-[0.06em]'>
                            <Image src={icons.phone} width={20} height={20} alt='phone' />
                            <div className="hover:text-textGold transition duration-300 ease-in-out">9624776691</div>
                        </div> </Link>
                        <Link href="https://maps.google.com/?cid=7804843562812692638&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed" target='_blank'> <div className='flex gap-2 text-sm font-extralight tracking-[0.06em]'>
                            <Image src={icons.location} width={20} height={20} alt='location' className='self-start' />
                            <span>Near KK Farm House Bishanpur, Road, Harthala, Lodhipur, Moradabad, Uttar Pradesh 244001</span>
                        </div></Link>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='text-textGold text-xs font-bold tracking-[0.3em]'>GET A QUOTE</div>
                        <div className='text-sm font-extralight text-textGray tracking-[0.03em]'>Receive architectural lookbooks, product spec sheets, and new collections.</div>
                        <Link 
                         href="https://wa.me/919634776691?text=Hello%20Afsha%20Creative%20Solution%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20metal%20fabrication%20project."
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                        ><AnimatedButton iconColor='#CDA274' textColor='#CDA274' dotColor='#000000' text='Get a Quote' /></Link>
                    </div>

                </div>
                <div className='flex justify-between text-sm font-extralight text-textGray tracking-[0.06em]'>
                    <div>© 2026 Afsha Creative Solution. All Rights Reserved.</div>
                    <div>
                        Designed & Engineered with Precision by
                        FalconDev
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer