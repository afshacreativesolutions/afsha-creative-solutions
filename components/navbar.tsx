import React from 'react'
import Image from 'next/image'
import logo from "../assets/Logo/logo-mark.png"
import Link from 'next/link'

const navbar = () => {
    return (
        <div style={{background : "rgba(5,5,5,0.4)"}} className='sticky top-0 z-50 border-b border-white/4 flex items-center justify-around text-textWhite uppercase h-16 font-medium text-xs tracking-[0.2em]'>
           <Link href={"/"}> <div className='flex items-end cursor-pointer'>
                <div className='relative text-sm rounded-md overflow-hidden h-13 w-13'>
                    <Image src={logo} height={80} className='object-left' alt='logo' />
                </div>
                <div className='text-textGold  p-1'>
                    <p className='text-lg font-extrabold'>AFSHA</p>
                    <p className=''>CREATIVE SOLUTION</p>
                    {/* <p>SOLUTION</p> */}
                </div>
            </div></Link>
            <div>
                <ul className='flex gap-5'>
                    <Link href={"/"}><li className='cursor-pointer'>Home</li></Link>
                    <Link href={"#projects"}><li className='cursor-pointer'>Project</li></Link>
                    <Link href={"#collection"}><li className='cursor-pointer'>Collection</li></Link>
                </ul>
            </div>
            <div>
                <ul className='flex gap-5'>
                   <Link href={"#"}> <li className='cursor-pointer'>Contact</li></Link>
                   <Link href={"#"}> <li className='cursor-pointer'>Menu</li></Link>
                </ul>
            </div>
        </div>
    )
}

export default navbar