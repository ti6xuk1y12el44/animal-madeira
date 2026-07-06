"use client";
import { useState } from "react";
import Link from "next/link";

const amounts = [5, 10, 15, 25, 50, 100];

export default function DoarPage() {
  const [selected, setSelected] = useState(15);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);

  const value = custom || selected;

  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Apoiar</p>
          <h1 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Cada euro conta<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15px] text-white/45">
            100% dos donativos vao para esterilizacoes, cuidados veterinarios e alimentacao.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-line bg-white p-8 md:p-10">
            <h2 className="font-display text-xl font-bold">Escolhe o valor</h2>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => { setSelected(a); setCustom(""); }}
                  className={`rounded-xl border py-4 font-display text-lg font-bold transition ${
                    selected === a && !custom
                      ? "border-green bg-green-light text-green"
                      : "border-line hover:border-ink"
                  }`}
                >
                  {a} €
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
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none transition focus:border-green"
                />
                <span className="text-sm font-semibold text-ink/40">€</span>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-line px-5 py-4">
              <input
                type="checkbox"
                checked={monthly}
                onChange={(e) => setMonthly(e.target.checked)}
                className="accent-green"
              />
              <span className="text-[14px] font-medium">Tornar donativo mensal</span>
            </label>

            <div className="mt-8 rounded-xl bg-green-light px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-ink/50">Total</span>
                <span className="font-display text-3xl font-bold text-green">{value} €</span>
              </div>
              {monthly && (
                <p className="mt-1 text-right text-[12px] text-ink/40">por mes</p>
              )}
            </div>

            <button className="mt-6 w-full rounded-full bg-green py-4 text-sm font-semibold text-white transition hover:bg-green-dark">
              Continuar para pagamento
            </button>
            <p className="mt-3 text-center text-[12px] text-ink/30">
              Prototipo — pagamento por integrar (MB Way / Stripe).
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-ink p-6 text-white">
              <h3 className="font-display text-sm font-bold">Para onde vai o teu donativo?</h3>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Esterilizacoes", pct: "40%" },
                  { label: "Cuidados veterinarios", pct: "35%" },
                  { label: "Alimentacao", pct: "15%" },
                  { label: "Operacoes da plataforma", pct: "10%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-[13px]">
                    <span className="text-white/55">{item.label}</span>
                    <span className="font-display font-bold">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-green p-6 text-white">
              <h3 className="font-display text-sm font-bold">O que o teu donativo faz</h3>
              <div className="mt-4 space-y-3">
                {[
                  { val: "5 €", desc: "Alimenta um animal por uma semana." },
                  { val: "15 €", desc: "Vacina um cachorro." },
                  { val: "50 €", desc: "Esteriliza um gato comunitario." },
                  { val: "100 €", desc: "Cobre uma cirurgia de emergencia." },
                ].map((item) => (
                  <div key={item.val} className="flex gap-3 text-[13px]">
                    <span className="shrink-0 font-display font-bold">{item.val}</span>
                    <span className="text-white/55">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-sm font-bold">Outras formas de ajudar</h3>
              <div className="mt-3 space-y-2">
                <Link href="/voluntariar" className="block text-[13px] font-semibold text-green hover:underline">
                  Voluntariar →
                </Link>
                <Link href="/adotar" className="block text-[13px] font-semibold text-green hover:underline">
                  Adotar →
                </Link>
                <Link href="/esterilizar" className="block text-[13px] font-semibold text-green hover:underline">
                  Esterilizar →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}