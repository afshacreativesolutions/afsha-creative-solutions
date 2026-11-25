"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveRight, X } from "lucide-react";
import Card from "./Card";
import { MenuData } from "@/utils/data";
import { useMenu } from "@/context/menuContext";

const menuItems: { title: string; data: keyof typeof MenuData }[] = [
  { title: "Steel Railings", data: "steelRailling" },
  { title: "Steel Gates", data: "steelGates" },
  { title: "Iron Railings", data: "ironRailling" },
  { title: "Iron Gates", data: "ironGates" },
];

const Menu = () => {
  const { menu, toggleMenu, closeMenu } = useMenu();
  const [activeItem, setActiveItem] = useState(0);
  const activeMenuItem = menuItems[activeItem];
  const activeData = MenuData[activeMenuItem.data];
  const isGateMenu = activeMenuItem.data === "steelGates" || activeMenuItem.data === "ironGates";
  const material = activeMenuItem.data.startsWith("steel") ? "stainless-steel" : "iron";
  const viewAllHref = `/products?category=${isGateMenu ? "gates" : "railings"}&material=${material}`;

  function cardHref(title: string) {
    const normalizedTitle = title.toLowerCase();
    const category = isGateMenu
      ? "gates"
      : normalizedTitle.includes("spiral")
        ? "spiral-railings"
        : normalizedTitle.includes("balcony")
          ? "balcony-railings"
          : normalizedTitle.includes("stair")
            ? "stair-railings"
            : "railings";
    return `/products?category=${category}&material=${material}`;
  }

  return (
    <div
      id="site-menu"
      aria-hidden={!menu}
      className={`fixed inset-0 z-40 h-dvh overflow-y-auto overscroll-contain bg-[rgba(18,18,18,0.98)] pt-16 transition-all duration-300 ease-in-out ${
        menu
          ? "visible translate-x-0 opacity-100 pointer-events-auto"
          : "invisible pointer-events-none translate-x-full opacity-0"
      }`}
    >
      <div className="relative mx-auto min-h-full w-full max-w-7xl px-4 pb-8 pt-5 sm:px-8 sm:pt-8 lg:grid lg:grid-cols-3 lg:gap-4 lg:pt-10">
        {/* Mobile close bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 lg:hidden">
          <div className="text-[10px] font-bold tracking-[0.2em] text-textGold uppercase">
            Browse Categories
          </div>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close categories menu"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-textGold/60 hover:text-textGold"
          >
            <X size={18} />
          </button>
        </div>

        <aside className="lg:px-6">
          <div className="hidden text-[9px] font-bold tracking-[0.2em] text-textGold lg:block">
            MENU CATEGORY
            <div className="mt-2 w-8 border-t border-textGold/60" />
          </div>
          <div className="-mx-4 mt-2 flex gap-2 px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 lg:mt-8 lg:flex-col lg:gap-4">
            {menuItems.map((item, index) => {
              const isActive = activeItem === index;
              return (
                <button
                  key={item.data}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveItem(index)}
                  className={`group flex min-h-11 shrink-0 items-center justify-between gap-3 rounded-full border px-4 text-xs tracking-[0.04em] transition-colors touch-manipulation select-none sm:text-sm lg:min-h-0 lg:rounded-none lg:border-0 lg:px-0 lg:py-1 lg:text-lg ${
                    isActive
                      ? "border-textGold/40 bg-textGold/10 text-white lg:bg-transparent"
                      : "border-white/10 text-textGray hover:text-white"
                  }`}
                >
                  <span>{String(index + 1).padStart(2, "0")}. {item.title}</span>
                  <MoveRight className={`hidden w-5 stroke-1 transition-all duration-300 lg:block ${isActive ? "translate-x-1 text-textGold" : ""}`} />
                </button>
              );
            })}
          </div>
        </aside>

        <section className="mt-6 min-w-0 lg:col-span-2 lg:mt-0 lg:px-8">
          <div className="mb-5 flex flex-col gap-3 border-b border-gray-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl">{activeData.headline}</h2>
            <p className="max-w-md text-sm leading-6 text-textGray sm:text-right">{activeData.description}</p>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5 sm:mx-0 sm:gap-4 sm:px-0 lg:gap-6 lg:py-5">
            {activeData.cards.map((data) => (
              <Card key={data.title} href={cardHref(data.title)} onClick={closeMenu} image={data.image} title={data.title} description={data.title} height="h-[240px] sm:h-64 lg:h-63" width="w-[68vw] max-w-[240px] sm:w-56" rounded="rounded-lg" />
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Link href={viewAllHref} onClick={closeMenu} className="inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-full border border-textGold/50 bg-textGold/15 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-textGold transition-colors hover:bg-textGold hover:text-black sm:text-xs">
              {activeData.buttonText}<MoveRight className="w-4 stroke-1 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" onClick={closeMenu} className="inline-flex min-h-11 items-center gap-2 text-[10px] font-bold tracking-[0.08em] text-textGold hover:text-white">
              GET A CUSTOM QUOTE<MoveRight className="w-4 stroke-2" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Menu;
