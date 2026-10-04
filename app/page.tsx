import Image from "next/image";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Feature from "@/components/Feature";
import { Collections } from "@/components/Collections";
import Videos from "@/components/Videos";
import Testimonials from "@/components/Testimonials";
import Map from "@/components/Map";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background">
      <Hero/>
      <Feature/>
      <div className="border-b border-gray-950 w-full"></div>
      <Collections/>
      <div className="border-b border-gray-950 w-full"></div>
      <Videos/>
      <div className="border-b border-gray-950 w-full"></div>
      <Testimonials/>
      <div className="border-b border-gray-950 w-full"></div>
      <Map/>
      <div className="border-b border-gray-950 w-full"></div>
    </div>
    
  );
}
