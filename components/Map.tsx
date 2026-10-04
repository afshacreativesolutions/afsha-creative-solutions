import Image from 'next/image'

const Map = () => {
    return (
        <div className="mx-auto max-w-[90%] py-10">
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 sm:h-[500px] lg:h-[560px]">

                {/* Google Map */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.9729783758107!2d78.72993257518772!3d28.86942177328445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390affe9f5c2d981%3A0x6c505fde58f1d89e!2sAFSHA%20CREATIVE%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1791038860964!5m2!1sen!2sin"
                    title="AFSHA Creative Solution location"
                    className="h-full w-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                />

                {/* Location overlay */}
                <div className="pointer-events-none absolute right-5 top-5 flex items-center gap-3 rounded-full border border-white/10 bg-black/55 px-3 py-2 shadow-lg backdrop-blur-sm">

                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/80">
                        <Image
                            src="/google-lens-icon.png"
                            width={20}
                            height={20}
                            alt="Google"
                            className="h-5 w-5 object-contain"
                        />
                    </div>

                    <div className="text-left">
                        <div className="text-[9px] uppercase tracking-[0.2em] text-[#CDA274]">
                            Location
                        </div>

                        <div className="text-sm font-medium text-white">
                            AFSHA Creative Solution
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Map