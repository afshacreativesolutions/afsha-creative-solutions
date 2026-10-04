import { icons } from '@/utils/images'
import Link from 'next/link'
import React from 'react'

const Whatsapp = () => {
    return (
        <Link
            href="https://wa.me/919634776691?text=Hello%20Afsha%20Creative%20Solution%2C%20I%20found%20your%20website%20and%20would%20like%20to%20discuss%20a%20metal%20fabrication%20project."
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Contact us on WhatsApp'
            className='fixed bottom-5 right-5 z-50'
        >
            <div className='group bg-green-500 hover:bg-green-500/60 rounded-full w-fit p-2  transition duration-300 ease-in-out'>
                <span
                    aria-hidden='true'
                    className='block h-10 w-10 bg-current text-white transition-colors duration-300 group-hover:text-textGold/80'
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
    )
}

export default Whatsapp