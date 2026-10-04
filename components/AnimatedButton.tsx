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
        <>
            <div
                className='cursor-pointer animated-button rounded-full justify-between px-2 items-center flex border h-13 w-65 bg-black/60'
                style={{
                    '--icon-color': iconColor,
                    '--text-color': textColor,
                    '--dot-color' : dotColor
                } as React.CSSProperties}
            >
                <div className='animated-button__icon h-10 w-10 border flex justify-center items-center rounded-2xl'>
                    <div className='border-2 animated-button__icon__dot rounded-2xl h-4'></div>
                </div>
                <div className='animated-button__text text-[10px] uppercase font-medium px-4 tracking-[0.2em]'>{text}</div>
            </div>
            <style jsx>{`
                .animated-button {
                    border-color: color-mix(in srgb, var(--icon-color) 40%, transparent);
                    transition: border-color 180ms ease, background-color 180ms ease;
                }

                .animated-button:hover {
                    border-color: color-mix(in srgb, var(--icon-color) 70%, transparent);
                }

                .animated-button__text {
                    color: var(--text-color);
                    transition: transform 600ms ease;
                }

                .animated-button:hover .animated-button__text {
                        transform: translateX(-75px);
                }

              

                .animated-button__icon {
                    transition: transform 600ms ease;
                }

                .animated-button:hover .animated-button__icon {
                    transform: translateX(200px);
                    background-color: var(--icon-color);
                }

                .animated-button__icon {
                    border-color: var(--icon-color);
                }

                .animated-button__icon__dot {
                    border-color: var(--icon-color);
                }

                .animated-button:hover .animated-button__icon__dot {
                    border-color: var(--dot-color);
                }
            `}</style>
        </>
    )
}


export default AnimatedButton