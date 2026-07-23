"use client";
import { useState } from "react";

export default function ClinicList({ parishes, clinics }) {
  const [active, setActive] = useState(parishes[0] || "");
  const filtered = clinics.filter((c) => c.parish === active);

  return (
    <>
      <aside>
        <div className="sticky top-20">
          <h2 className="mb-4 font-display text-base font-bold">1. Escolhe o concelho</h2>
          <div className="space-y-1.5">
            {parishes.map((p) => {
              const count = clinics.filter((c) => c.parish === p).length;
              return (
                <button
                  key={p}
                  onClick={() => setActive(p)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    active === p
                      ? "bg-ink text-white"
                      : "border border-line bg-white text-ink/80 hover:border-ink hover:text-ink"
                  }`}
                >
                  <span>{p}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    active === p ? "bg-green text-white" : "bg-green-light text-green"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold">2. {active}</h2>
          <span className="text-[13px] text-ink/40">Liga sempre antes para confirmar.</span>
        </div>

        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold">{c.name}</h3>
                    {c.is_campaign && (
                      <span className="rounded-full bg-green px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                        Campanha
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-ink/45">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <CostBadge cost={c.cost} label={c.cost_label} />
                    {c.services_dog && (
                      <span className="rounded-full bg-green-light px-2.5 py-1 text-[11px] font-semibold text-green">Cães</span>
                    )}
                    {c.services_cat && (
                      <span className="rounded-full bg-green-light px-2.5 py-1 text-[11px] font-semibold text-green">Gatos</span>
                    )}
                    {c.campaign_dates && (
                      <span className="rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-ink/50">
                        {c.campaign_dates}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right text-[13px]">
                  {c.phone && <p className="font-display font-bold">{c.phone}</p>}
                  {c.email && <p className="mt-1 text-ink/40">{c.email}</p>}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="rounded-2xl border border-line bg-white px-8 py-16 text-center text-[15px] text-ink/40">
              Sem clínicas registadas neste concelho de momento.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function CostBadge({ cost, label }) {
  const styles = {
    free: "bg-green-light text-green",
    low: "bg-amber-50 text-amber-700",
    paid: "bg-paper text-ink/50",
  };

  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[cost] || styles.paid}`}>
      {label}
    </span>
  );
}