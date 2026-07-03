"use client";
import { useActionState } from "react";
import { submitReport } from "@/actions/reports";

export default function ReportForm() {
  const [state, action, pending] = useActionState(submitReport, {});

  if (state.success) {
    return (
      <div className="rounded-2xl bg-green-light px-8 py-16 text-center">
        <p className="font-display text-2xl font-bold">Denúncia registada.</p>
        <p className="mt-2 text-[15px] text-ink/50">Obrigado por falares por eles.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      {state.errors?._global && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.errors._global}</p>
      )}

      <div className="flex gap-2">
        <label className="flex-1">
          <input type="radio" name="type" value="abandonment" defaultChecked className="peer hidden" />
          <span className="block cursor-pointer rounded-xl border border-line bg-white px-5 py-4 text-center text-sm font-semibold transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white">
            Animal abandonado
          </span>
        </label>
        <label className="flex-1">
          <input type="radio" name="type" value="cruelty" className="peer hidden" />
          <span className="block cursor-pointer rounded-xl border border-line bg-white px-5 py-4 text-center text-sm font-semibold transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white">
            Maus-tratos
          </span>
        </label>
      </div>

      <fieldset>
        <legend className="mb-4 font-display text-base font-bold">1. Localização</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Morada ou local" name="location" required error={state.errors?.location}
            placeholder="Rua, sítio ou ponto de referência" />
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">
              Concelho <span className="text-green">*</span>
            </label>
            <select name="parish" required
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green">
              <option value="">Escolher…</option>
              {["Funchal","Câmara de Lobos","Ribeira Brava","Ponta do Sol","Calheta","Porto Moniz","São Vicente","Santana","Machico","Santa Cruz","Porto Santo"].map(p =>
                <option key={p} value={p}>{p}</option>
              )}
            </select>
            {state.errors?.parish && <p className="mt-1 text-xs text-red-500">{state.errors.parish}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 font-display text-base font-bold">2. O animal</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">Tipo de animal <span className="text-green">*</span></label>
            <select name="animal_type" required
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green">
              <option value="">Escolher…</option>
              <option value="dog">Cão</option>
              <option value="cat">Gato</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">Quantos animais?</label>
            <select name="animal_count"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green">
              <option>1</option><option>2</option><option>3+</option><option>Não sei</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-[13px] font-semibold">O animal está ferido?</label>
          <div className="flex gap-4">
            {["Sim","Não","Não sei"].map(o =>
              <label key={o} className="flex items-center gap-2 text-sm">
                <input type="radio" name="injured" value={o.toLowerCase()} defaultChecked={o==="Não sei"}
                  className="accent-green" /> {o}
              </label>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 font-display text-base font-bold">3. O que aconteceu</legend>
        <Field label="Descreve o que viste" name="description" required error={state.errors?.description}
          placeholder="Cor, tamanho, estado, o que aconteceu, quando…" textarea />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Quando viste?" name="seen_at" type="date" required />
          <Field label="Hora aproximada" name="seen_time" type="time" />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 font-display text-base font-bold">4. Os teus dados</legend>
        <p className="mb-4 text-[13px] text-ink/40">Confidenciais — vistos apenas pelas entidades competentes.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome" name="reporter_name" required error={state.errors?.reporter_name}
            placeholder="O teu nome" />
          <Field label="Telefone" name="reporter_phone" required error={state.errors?.reporter_phone}
            placeholder="9XX XXX XXX" type="tel" />
        </div>
        <div className="mt-4">
          <Field label="Email (opcional)" name="reporter_email" type="email" placeholder="teu@email.com" />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink py-4 text-sm font-semibold text-white transition hover:bg-green-dark disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {pending ? "A enviar…" : "Enviar denúncia"}
      </button>
    </form>
  );
}


function Field({ label, name, required, error, placeholder, type = "text", textarea }) {
  const cls = "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green";
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold">
        {label} {required && <span className="text-green">*</span>}
      </label>
      {textarea
        ? <textarea name={name} required={required} placeholder={placeholder} rows={4} className={cls + " resize-y"} />
        : <input type={type} name={name} required={required} placeholder={placeholder} className={cls} />
      }
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}