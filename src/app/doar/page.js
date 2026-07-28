"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, HandHeart, Scissors, Gift } from "lucide-react";

const amounts = [5, 10, 15, 25, 50, 100];

export default function DoarPage() {
  const [selected, setSelected] = useState(15);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);

  const value = custom || selected;

  return (
    <main>
      <section className="relative overflow-hidden bg-green-900 py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Apoiar</p>
          <h1 className="max-w-[14ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl">
            Cada euro conta<span className="text-green-400">.</span>
          </h1>
          <p className="mt-3 max-w-[50ch] text-[14px] text-white/60">
            100% dos donativos vao para esterilizacoes, cuidados veterinarios e alimentacao.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-line bg-white p-8">
            <h2 className="font-display text-xl font-bold">Escolhe o valor</h2>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => { setSelected(a); setCustom(""); }}
                  className={"rounded-xl border py-4 font-display text-lg font-bold transition " +
                    (selected === a && !custom
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-line hover:border-ink")
                  }
                >
                  {a} EUR
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-[13px] font-semibold">Outro valor</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition focus:border-green-400"
                />
                <span className="text-sm font-semibold text-ink/40">EUR</span>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-line px-5 py-4">
              <input
                type="checkbox"
                checked={monthly}
                onChange={(e) => setMonthly(e.target.checked)}
                className="accent-green-600"
              />
              <span className="text-[14px] font-medium">Tornar donativo mensal</span>
            </label>

            <div className="mt-8 rounded-xl bg-green-50 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-ink/50">Total</span>
                <span className="font-display text-3xl font-bold text-green-700">{value} EUR</span>
              </div>
              {monthly && (
                <p className="mt-1 text-right text-[12px] text-ink/40">por mes</p>
              )}
            </div>

            <button className="mt-6 w-full rounded-full bg-green-600 py-4 text-sm font-semibold text-white transition hover:bg-green-700">
              Continuar para pagamento
            </button>
            <p className="mt-3 text-center text-[12px] text-ink/30">
              Prototipo — pagamento por integrar (MB Way / Stripe).
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl bg-green-800 p-5 text-white">
              <h3 className="mb-4 font-display text-sm font-bold">Para onde vai o teu donativo?</h3>
              <div className="space-y-3">
                {[
                  { Icon: Scissors, label: "Esterilizacoes", pct: "40%" },
                  { Icon: Heart, label: "Cuidados veterinarios", pct: "35%" },
                  { Icon: Gift, label: "Alimentacao", pct: "15%" },
                  { Icon: HandHeart, label: "Operacoes da plataforma", pct: "10%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-2 text-white/55">
                      <item.Icon size={14} /> {item.label}
                    </span>
                    <span className="font-display font-bold">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-green-50 p-5">
              <h3 className="mb-4 font-display text-sm font-bold">O que o teu donativo faz</h3>
              <div className="space-y-3">
                {[
                  { val: "5 EUR", desc: "Alimenta um animal por uma semana." },
                  { val: "15 EUR", desc: "Vacina um cachorro." },
                  { val: "50 EUR", desc: "Esteriliza um gato comunitario." },
                  { val: "100 EUR", desc: "Cobre uma cirurgia de emergencia." },
                ].map((item) => (
                  <div key={item.val} className="flex gap-3 text-[13px]">
                    <span className="shrink-0 font-display font-bold text-green-700">{item.val}</span>
                    <span className="text-ink/50">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-white p-5">
              <h3 className="mb-3 font-display text-sm font-bold">Outras formas de ajudar</h3>
              <div className="space-y-2">
                <Link href="/voluntariar" className="block text-[13px] font-semibold text-green-600 hover:text-green-700">Voluntariar →</Link>
                <Link href="/adotar" className="block text-[13px] font-semibold text-green-600 hover:text-green-700">Adotar →</Link>
                <Link href="/esterilizar" className="block text-[13px] font-semibold text-green-600 hover:text-green-700">Esterilizar →</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}