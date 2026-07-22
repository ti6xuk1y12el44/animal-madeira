import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-900 pb-8 pt-12 text-white/70 md:pt-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 21c-4-3.5-8-6.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 3.5c0 3.9-4 7-8 10.5Z" />
                </svg>
              </div>
              <span className="font-display text-sm font-bold text-white">Animal Madeira</span>
            </div>
            <p className="mt-3 max-w-[28ch] text-[13px] leading-relaxed text-white/35">
              Plataforma de bem-estar animal da ilha da Madeira. Uma iniciativa Madeira Friends.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.12em] text-white/25">Plataforma</h4>
            <Link href="/adotar" className="block py-1 text-[13px] hover:text-gold">Adotar</Link>
            <Link href="/voluntariar" className="block py-1 text-[13px] hover:text-gold">Voluntariar</Link>
            <Link href="/esterilizar" className="block py-1 text-[13px] hover:text-gold">Esterilizar</Link>
            <Link href="/abrigos" className="block py-1 text-[13px] hover:text-gold">Abrigos</Link>
          </div>
          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.12em] text-white/25">Agir</h4>
            <Link href="/denunciar" className="block py-1 text-[13px] hover:text-gold">Denunciar</Link>
            <Link href="/emergencia" className="block py-1 text-[13px] hover:text-gold">Emergencia</Link>
            <Link href="/perdidos" className="block py-1 text-[13px] hover:text-gold">Perdidos</Link>
            <Link href="/doar" className="block py-1 text-[13px] hover:text-gold">Doar</Link>
          </div>
          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.12em] text-white/25">Aviso</h4>
            <p className="text-[13px] leading-relaxed text-white/35">
              Esta plataforma nao substitui autoridades oficiais. Em emergencias liga 112.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/8 pt-6 text-[12px] text-white/20 sm:flex-row sm:justify-between">
          <span>2026 Animal Madeira · Madeira Friends</span>
          <span>Privacidade · Termos</span>
        </div>
      </div>
    </footer>
  );
}