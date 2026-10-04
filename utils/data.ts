import { images } from "./images";
import type { collectionDataType, croselType } from "./type";


export const croselData: croselType[] = [
  {
    tagline: "Heritage Railings",
    title: "Vrindavan Project",
    description:
      "Bespoke handcrafted classic brass and cast-iron balustrades for a luxury estate.",
    image: images.iron_balcony_railing.ironbrail1,
  },
  {
    tagline: "Timeless Craftsmanship",
    title: "Jaipur Palace",
    description:
      "Ornate brass railings inspired by traditional Rajasthani architecture.",
    image: images.iron_gates.ironGate1,
  },
  {
    tagline: "Modern Elegance",
    title: "Mumbai Penthouse",
    description:
      "Sleek custom metal balustrades designed for a contemporary city residence.",
    image: images.iron_stair_railing.ironStairRailling1,
  },
  {
    tagline: "Artisan Metalwork",
    title: "Udaipur Courtyard",
    description:
      "Hand-forged iron railings that bring character to a serene heritage courtyard.",
    image: images.steel_balcony_railing.ssBalconyRailling1,
  },
  {
    tagline: "Classic Details",
    title: "Delhi Residence",
    description:
      "Refined cast-iron balustrades crafted to complement a grand family home.",
    image: images.steel_gate.ssGate1,
  },
  {
    tagline: "Graceful Lines",
    title: "Bengaluru Villa",
    description:
      "Custom brass and iron railings with a clean, understated architectural finish.",
    image: images.steel_spiral_railing.ssSpiralRailling1,
  },
  {
    tagline: "Royal Inspiration",
    title: "Jodhpur Haveli",
    description:
      "Decorative handcrafted railings echoing the rich details of a historic haveli.",
    image: images.steel_stair_railing.ssStairRailling1,
  },
  {
    tagline: "Made to Endure",
    title: "Goa Estate",
    description:
      "Durable, bespoke balustrades designed for an elegant coastal property.",
    image: images.iron_gates.ironGate3,
  },
  {
    tagline: "Heritage Reimagined",
    title: "Kolkata Townhouse",
    description:
      "Traditional ironwork balanced with a fresh finish for a restored townhouse.",
    image: images.steel_gate.ssGate12,
  },
  {
    tagline: "Sculpted in Brass",
    title: "Hyderabad Manor",
    description:
      "Statement brass balustrades handcrafted for a spacious luxury estate.",
    image: images.steel_spiral_railing.ssSpiralRailling3,
  },
];

export const collectionsData : collectionDataType = {
    Gates : [
        {
            title: "Steel Gate",
            description : "Stenless Steel gates",
            image: images.steel_gate.ssGate13

        },
        {
            title: "Iron Gate",
            description : "Iron gate",
            image : images.iron_gates.ironGate3
        }
    ],

    Raillings : [
         {
            title: "Iron Balcony Railling",
            description : "Iron Balcony Railling",
            image : images.iron_balcony_railing.ironbrail3
        },
         {
            title: "Iron Stair Railling",
            description : "Iron Stair Railling",
            image : images.iron_stair_railing.ironStairRailling4
        },
         {
            title: "Steel Balcony Railling",
            description : "Steel Balcony Railling",
            image : images.steel_balcony_railing.ssBalconyRailling4
        },
         {
            title: "Steel Spiral Railling",
            description : "Steel Spiral Railling",
            image : images.steel_spiral_railing.ssSpiralRailling3
        },
         {
            title: "Steel Stair Railling",
            description : "Steel Stair Railling",
            image : images.steel_stair_railing.ssStairRailling13
        },
        
    ]
}