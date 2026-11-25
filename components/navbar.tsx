"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Logo/logo-mark.png";
import { useMenu } from "@/context/menuContext";

export default function Navbar() {
  const { menu, toggleMenu, closeMenu, openMenu } = useMenu();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function openCategories() {
    setMobileNavOpen(false);
    openMenu();
  }

  function handleHamburgerClick() {
    if (menu) {
      closeMenu();
      setMobileNavOpen(false);
    } else {
      setMobileNavOpen((open) => !open);
    }
  }

  const isAnyMenuOpen = menu || mobileNavOpen;

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-black/90 text-textWhite backdrop-blur-md">
      <nav aria-label="Main navigation" className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link 
          href="/" 
          aria-label="Afsha Creative Solution home" 
          className="flex min-w-0 items-center"
          onClick={() => {
            closeMenu();
            setMobileNavOpen(false);
          }}
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md sm:h-12 sm:w-12">
            <Image src={logo} fill sizes="48px" className="object-contain" alt="" priority />
          </span>
          <span className="min-w-0 px-1 text-textGold">
            <span className="block text-base font-extrabold leading-tight sm:text-lg">AFSHA</span>
            <span className="block whitespace-nowrap text-[9px] tracking-[0.12em] sm:text-[10px] sm:tracking-[0.16em]">CREATIVE SOLUTION</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-5 text-[10px] font-medium uppercase tracking-[0.16em] md:flex lg:gap-7">
          <li><Link className="transition-colors hover:text-textGold" href="/">Home</Link></li>
          <li><Link className="transition-colors hover:text-textGold" href="/categories">Categories</Link></li>
          <li><Link className="transition-colors hover:text-textGold" href="/products">Collection</Link></li>
          <li><Link className="transition-colors hover:text-textGold" href="/gallery">Gallery</Link></li>
          <li><Link className="transition-colors hover:text-textGold" href="/custom-metalwork">Custom Work</Link></li>
          <li><Link className="transition-colors hover:text-textGold" href="/services">Services</Link></li>
          <li><Link className="transition-colors hover:text-textGold" href="/about">About</Link></li>
        </ul>

        <div className="flex shrink-0 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.14em] sm:gap-5 sm:tracking-[0.18em]">
          <Link href="/contact" className="hidden transition-colors hover:text-textGold md:inline">Contact</Link>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menu}
            aria-controls="site-menu"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 px-4 transition-colors hover:border-textGold/60 hover:text-textGold md:inline-flex touch-manipulation cursor-pointer"
          >
            {menu ? "Close" : "Menu"}
          </button>
          <button
            type="button"
            onClick={handleHamburgerClick}
            aria-label={isAnyMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isAnyMenuOpen}
            aria-controls="mobile-navigation-links"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-textGold/60 hover:text-textGold touch-manipulation cursor-pointer select-none md:hidden"
          >
            {isAnyMenuOpen ? <X size={20} aria-hidden="true" /> : <MenuIcon size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileNavOpen && !menu && (
        <div id="mobile-navigation-links" className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-[#080808]/[0.98] px-4 pb-4 shadow-2xl backdrop-blur-md md:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col divide-y divide-white/10">
            <Link href="/" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Home</Link>
            <Link href="/categories" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Categories</Link>
            <Link href="/products" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Collection</Link>
            <Link href="/gallery" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Gallery</Link>
            <Link href="/custom-metalwork" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Custom Metalwork</Link>
            <Link href="/services" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Services</Link>
            <Link href="/faq" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">FAQ</Link>
            <Link href="/blog" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Blog & Guides</Link>
            <Link href="/about" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">About</Link>
            <Link href="/contact" onClick={() => setMobileNavOpen(false)} className="flex min-h-12 items-center text-xs uppercase tracking-[0.16em] text-white/75 hover:text-textGold">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
