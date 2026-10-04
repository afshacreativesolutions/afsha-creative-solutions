"use client"
import React from 'react'
import { useRef } from 'react'
import Card from './Card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedButton from './AnimatedButton'
import { croselData } from '@/utils/data'


const Feature = () => {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: number) => {
    carouselRef.current?.scrollBy({
      left: direction * carouselRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section id='projects' className='min-h-screen max-w-[90%] mx-auto px-6 flex flex-col justify-around'>
      <div className='flex justify-between items-center'>
        <div className='font-heading text-4xl font-light tracking-[0.01em]'>
          Featured Projects
          <div className='w-12 border-b mt-3 border-gray-800' />
        </div>

        <div className='flex gap-4'>
          <button
            type='button'
            aria-label='Scroll projects left'
            onClick={() => scrollCarousel(-1)}
            className='group cursor-pointer h-10 w-10 hover:border-textGold/30 bg-[#080808]/80 hover:bg-[#080808] border border-gray-800 rounded-full flex justify-center items-center'
          >
            <ChevronLeft className='text-[#B3B3B3] stroke-1 group-hover:-translate-x-0.5 transition-all duration-200' />
          </button>
          <button
            type='button'
            aria-label='Scroll projects right'
            onClick={() => scrollCarousel(1)}
            className='group cursor-pointer h-10 w-10 hover:border-textGold/30 bg-[#080808]/80 hover:bg-[#080808] border border-gray-800 rounded-full flex justify-center items-center'
          >
            <ChevronRight className='text-[#B3B3B3] stroke-1 group-hover:translate-x-0.5 transition-all duration-200' />
          </button>
        </div>

      </div>

      <div ref={carouselRef} className='w-full max-w-full flex gap-4 overflow-hidden'>

        {croselData.map((item, i) => (
          <Card key={i} title={item.title} description={item.description} tagline={item.tagline} image={item.image} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}


      </div>

      <div className='flex justify-center items-center'>
        <AnimatedButton text='SEE PROJECTS' />
      </div>
    </section>
  )
}

export default Feature