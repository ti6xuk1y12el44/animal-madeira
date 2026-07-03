import ReportForm from "./ReportForm";

export const metadata = { title: "Denunciar · Animal Madeira" };

export default function DenunciarPage() {
  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Denúncia confidencial</p>
          <h1 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Fala por quem não pode<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] text-white/45">
            A tua denúncia é confidencial e segue apenas para as entidades com poder de atuar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <ReportForm />

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-sm font-bold">Notas importantes</h3>
              <ul className="mt-3 space-y-2 text-[13px] text-ink/50">
                <li>• A tua identidade é mantida confidencial.</li>
                <li>• Não confrontes ninguém — a tua segurança primeiro.</li>
                <li>• Podes ser contactado para mais detalhes.</li>
                <li>• Denúncias falsas têm consequências legais.</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-ink p-6 text-white">
              <h3 className="font-display text-sm font-bold">Para onde vai?</h3>
              <p className="mt-2 text-[13px] text-white/45">
                Autoridade de bem-estar animal, câmara municipal e PSP quando aplicável.
              </p>
            </div>
            <div className="rounded-2xl bg-green p-6 text-white">
              <h3 className="font-display text-sm font-bold">Perigo imediato?</h3>
              <p className="mt-2 text-[13px] text-white/55">Não esperes — liga já.</p>
              <a href="tel:112" className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink">
                Ligar 112
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}