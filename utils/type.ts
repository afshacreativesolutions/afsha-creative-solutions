import type { StaticImageData } from "next/image"

export type croselType = {
    tagline: string
    title: string
    description: string
    image: string | StaticImageData
    href?: string
}

export type collectionItemType = {
    title: string
    description: string
    image: string | StaticImageData
    href?: string
}

export type collectionDataType = {
    Gates: collectionItemType[]
    Raillings: collectionItemType[]
}
