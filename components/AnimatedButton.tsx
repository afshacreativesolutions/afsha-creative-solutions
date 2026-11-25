import React from 'react'

type AnimatedButtonProps = {
    iconColor?: string
    textColor?: string
    dotColor?: string
    text: string
}

const AnimatedButton = ({
    iconColor = '#ffffff',
    textColor = '#e5e7eb',
    dotColor = '#000000',
    text
}: AnimatedButtonProps) => {
    return (
        <div
            className='animated-button flex h-12 w-full max-w-[280px] min-w-0 cursor-pointer items-center justify-between gap-2 rounded-full border bg-black/60 px-2 sm:h-13 sm:w-65 sm:max-w-none'
            style={{
                '--icon-color': iconColor,
                '--text-color': textColor,
                '--dot-color' : dotColor
            } as React.CSSProperties}
        >
            <div className='animated-button__icon flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border sm:h-10 sm:w-10'>
                <div className='border-2 animated-button__icon__dot rounded-2xl h-4'></div>
            </div>
            <div className='animated-button__text min-w-0 flex-1 whitespace-nowrap px-2 text-center text-[9px] font-medium uppercase tracking-[0.12em] sm:flex-none sm:px-4 sm:text-[10px] sm:tracking-[0.2em]'>{text}</div>
        </div>
    )
}


export default AnimatedButton
