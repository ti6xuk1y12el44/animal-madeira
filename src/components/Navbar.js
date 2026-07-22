"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/adotar", label: "Adotar" },
  { href: "/esterilizar", label: "Esterilizar" },
  { href: "/voluntariar", label: "Voluntariar" },
  { href: "/denunciar", label: "Denunciar" },
  { href: "/abrigos", label: "Abrigos" },
  { href: "/perdidos", label: "Perdidos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-800 md:h-8 md:w-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 21c-4-3.5-8-6.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 3.5c0 3.9-4 7-8 10.5Z" />
            </svg>
          </div>
          <span className="font-display text-[14px] font-bold tracking-tight md:text-[15px]">
            Animal Madeira
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-sky/50 transition hover:bg-green-50 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/sobre" className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-sky/50 transition hover:bg-green-50 hover:text-ink">
            Sobre
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/emergencia" className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-green-600 transition hover:bg-green-50">
            SOS
          </Link>
          <Link href="/doar" className="rounded-full bg-green-800 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-green-700">
            Doar
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/doar" className="rounded-full bg-green-800 px-4 py-1.5 text-[12px] font-semibold text-white">
            Doar
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-4 pb-6 pt-3 lg:hidden">
          {[...links, { href: "/sobre", label: "Sobre" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 text-[15px] font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/emergencia"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full border border-green-600 py-2.5 text-center text-sm font-semibold text-green-600"
          >
            SOS Emergencia
          </Link>
        </nav>
      )}
    </header>
  );
}