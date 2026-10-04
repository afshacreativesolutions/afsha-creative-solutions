import Image from 'next/image'
import type { StaticImageData } from 'next/image'

type cardType = {
    height?: string
    width?: string
    loading?: 'eager' | 'lazy'
    image: string | StaticImageData
    title: string
    description: string
    tagline?: string
}

const Card = ({ height = "h-120", width = "w-90", loading = 'lazy', image, title, description, tagline }: cardType) => {
    return (
        <div tabIndex={0} className={`group relative ${height} ${width} shrink-0 overflow-hidden rounded-md p-4 flex items-end justify-center cursor-pointer `}>
            {image && <Image src={image} fill loading={loading} sizes='400px 300px' alt={title} className='absolute z-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus:scale-105' />}

            <div className='absolute z-5 inset-0  bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300' />

            <div className='z-10 flex flex-col gap-2 translate-y-2 transition-all duration-300 group-hover:translate-y-0'>
                <div className='text-xs font-light text-textGray tracking-[0.2em]'>{tagline}</div>
                <div className=''>{title}</div>
                <div className='translate-y-4 text-textGray opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100'>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default Card