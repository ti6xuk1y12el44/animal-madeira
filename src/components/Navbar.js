"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/adotar", label: "Adotar" },
  { href: "/esterilizar", label: "Esterilizar" },
  { href: "/voluntariar", label: "Voluntariar" },
  { href: "/denunciar", label: "Denunciar" },
  { href: "/emergencia", label: "Emergência" },
  { href: "/abrigos", label: "Abrigos" },
  { href: "/perdidos", label: "Perdidos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          animal<span className="text-green">.</span>madeira
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] font-medium text-ink/60 transition hover:text-ink">
              {l.label}
            </Link>
          ))}
          <Link href="/sobre" className="text-[13px] font-medium text-ink/60 transition hover:text-ink">
            Sobre
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/doar"
            className="rounded-full bg-ink px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-green-dark"
          >
            Doar
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-5 pb-8 pt-6 lg:hidden">
          {[...links, { href: "/sobre", label: "Sobre" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-lg font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/doar"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-ink py-3 text-center text-sm font-semibold text-white"
          >
            Doar
          </Link>
        </nav>
      )}
    </header>
  );
}