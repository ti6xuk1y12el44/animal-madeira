import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-base font-bold">
            animal<span className="text-green">.</span>madeira
          </span>
          <p className="mt-3 max-w-[30ch] text-sm text-ink-50 leading-relaxed">
            Plataforma de bem-estar animal da Madeira. Uma iniciativa Madeira Friends.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-ink-50">Plataforma</h4>
          <Link href="/adotar" className="block py-1 text-sm hover:text-green">Adotar</Link>
          <Link href="/esterilizar" className="block py-1 text-sm hover:text-green">Esterilizar</Link>
          <Link href="/voluntariar" className="block py-1 text-sm hover:text-green">Voluntariar</Link>
          <Link href="/abrigos" className="block py-1 text-sm hover:text-green">Abrigos</Link>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-ink-50">Agir</h4>
          <Link href="/denunciar" className="block py-1 text-sm hover:text-green">Denunciar</Link>
          <Link href="/emergencia" className="block py-1 text-sm hover:text-green">Emergência</Link>
          <Link href="/perdidos" className="block py-1 text-sm hover:text-green">Perdidos</Link>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-ink-50">Aviso</h4>
          <p className="text-sm text-ink-50 leading-relaxed">
            Esta plataforma não substitui autoridades oficiais. Em emergências liga 112.
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-line px-5 py-6 text-xs text-ink-50">
        <span>© 2026 Animal Madeira · Madeira Friends</span>
        <span>Privacidade · Termos</span>
      </div>
    </footer>
  );
}