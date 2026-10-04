"use client"
import React, { useState } from 'react'
import { collectionsData } from '@/utils/data'
import Card from './Card'
import type { collectionDataType } from '@/utils/type'
import AnimatedButton from './AnimatedButton'

export const Collections = () => {
    const collection = Object.keys(collectionsData) as Array<keyof collectionDataType>
    const [selectCollecton, setSelectCollection] = useState<keyof collectionDataType>('Raillings')
    return (
        <div id='collection' className='min-h-screen flex flex-col justify-between items-center py-20 max-w-[90%] mx-auto px-6 '>
            <div className='flex flex-col gap-3'>
                <div className='text-center font-heading text-4xl font-light tracking-[0.01em]'>
                    Our Collections
                    <div className='border-b mt-2 w-12 border-gray-700 mx-auto'></div>
                </div>
                <div className='flex gap-2 justify-center '>
                    {collection.map((item) => (
                        <button type='button' onClick={() => setSelectCollection(item)} key={item} className={` ${selectCollecton == item ? "border-textGold/30 bg-textGold/70 text-black font-medium" : "border-gray-800 bg-[#080808]/80"} border uppercase hover:border-gray-600  hover:bg-[#080808] text-sm tracking-[0.04em] text-[#B3B3B3] hover:text-gray-200 p-3 rounded-3xl w-fit cursor-pointer`}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex justify-center items-center gap-2'>
                {collectionsData[selectCollecton].map((item, i) => (
                    <Card
                        key={i}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        height='h-60'
                        width='w-60'
                    />
                ))}
            </div>

            <div className=' flex justify-center'>
                <AnimatedButton text='Gates Collecton' />
            </div>
        </div>
    )
}
