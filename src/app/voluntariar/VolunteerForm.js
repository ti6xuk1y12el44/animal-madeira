"use client";
import { useActionState } from "react";
import { submitVolunteer } from "@/actions/volunteers";

export default function VolunteerForm({ interest, onClose }) {
  const [state, action, pending] = useActionState(submitVolunteer, {});

  if (state.success) {
    return (
      <div className="rounded-2xl bg-green-50 px-8 py-12 text-center">
        <p className="font-display text-xl font-bold">Inscricao recebida!</p>
        <p className="mt-2 text-[14px] text-ink/40">Vamos contactar-te em breve.</p>
        <button onClick={onClose} className="mt-6 rounded-full bg-green-800 px-6 py-3 text-[13px] font-semibold text-white">
          Fechar
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="interest" value={interest} />

      {state.errors?._global && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.errors._global}</p>
      )}

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">
          Nome <span className="text-green-600">*</span>
        </label>
        <input name="name" required placeholder="O teu nome" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400" />
        {state.errors?.name && <p className="mt-1 text-xs text-red-500">{state.errors.name}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">
            Telefone <span className="text-green-600">*</span>
          </label>
          <input name="phone" type="tel" required placeholder="9XX XXX XXX" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400" />
          {state.errors?.phone && <p className="mt-1 text-xs text-red-500">{state.errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Email</label>
          <input name="email" type="email" placeholder="teu@email.com" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">Concelho</label>
        <select name="parish" className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400">
          <option value="">Escolher...</option>
          {["Funchal","Camara de Lobos","Ribeira Brava","Ponta do Sol","Calheta","Porto Moniz","Sao Vicente","Santana","Machico","Santa Cruz","Porto Santo"].map(p =>
            <option key={p} value={p}>{p}</option>
          )}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">Mensagem (opcional)</label>
        <textarea name="message" rows={3} placeholder="Disponibilidade, experiencia, motivacao..." className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400" />
      </div>

      <button type="submit" disabled={pending} className="w-full rounded-full bg-green-800 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50">
        {pending ? "A enviar..." : "Enviar inscricao"}
      </button>
    </form>
  );
}