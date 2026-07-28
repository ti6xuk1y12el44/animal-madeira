import ReportForm from "./ReportForm";
import { Shield, AlertTriangle, Phone } from "lucide-react";

export const metadata = { title: "Denunciar · Animal Madeira" };

export default function DenunciarPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-green-900 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Denuncia confidencial</p>
            <h1 className="max-w-[14ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl">
              Fala por quem nao pode<span className="text-green-400">.</span>
            </h1>
            <p className="mt-3 max-w-[52ch] text-[14px] text-white/60">
              A tua denuncia e confidencial e segue apenas para as entidades com poder de atuar.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <ReportForm />

          <aside className="space-y-4">
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <Shield size={16} className="text-green-600" />
                <h3 className="font-display text-sm font-bold">Notas importantes</h3>
              </div>
              <ul className="space-y-2 text-[13px] text-ink/60">
                <li>• A tua identidade e mantida confidencial.</li>
                <li>• Nao confrontes ninguem — a tua seguranca primeiro.</li>
                <li>• Podes ser contactado para mais detalhes.</li>
                <li>• Denuncias falsas tem consequencias legais.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-800 p-5 text-white">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle size={16} />
                <h3 className="font-display text-sm font-bold">Para onde vai?</h3>
              </div>
              <p className="text-[13px] text-white/55">
                Autoridade de bem-estar animal, camara municipal e PSP quando aplicavel.
              </p>
            </div>
            <div className="rounded-xl bg-red-600 p-5 text-white">
              <div className="mb-3 flex items-center gap-2">
                <Phone size={16} />
                <h3 className="font-display text-sm font-bold">Perigo imediato?</h3>
              </div>
              <p className="text-[13px] text-white/55">Nao esperes — liga ja.</p>
              <a href="tel:112" className="mt-3 inline-block rounded-full bg-white px-5 py-2 text-[12px] font-semibold text-red-600 transition hover:bg-red-50">
                Ligar 112
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}