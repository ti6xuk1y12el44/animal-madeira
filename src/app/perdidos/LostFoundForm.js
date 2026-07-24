"use client";
import PhotoUpload from "@/components/PhotoUpload";
import { useActionState } from "react";
import { submitLostFound } from "@/actions/lost-found";

const [photoUrl, setPhotoUrl] = useState(null);

export default function LostFoundForm({ type, onClose }) {
  const [state, action, pending] = useActionState(submitLostFound, {});

  if (state.success) {
    return (
      <div className="rounded-2xl bg-green-50 px-8 py-12 text-center">
        <p className="font-display text-xl font-bold">Publicado com sucesso!</p>
        <p className="mt-2 text-[14px] text-ink/40">O teu anuncio ja esta visivel na plataforma.</p>
        <button onClick={onClose} className="mt-6 rounded-full bg-green-800 px-6 py-3 text-[13px] font-semibold text-white">
          Fechar
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="type" value={type} />

      {state.errors?._global && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.errors._global}</p>
      )}

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">
          Titulo <span className="text-green-600">*</span>
        </label>
        <input
          name="title"
          required
          placeholder={type === "lost" ? "Ex: Maggie — Podengo castanho" : "Ex: Gato tigrado sem chip"}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400"
        />
        {state.errors?.title && <p className="mt-1 text-xs text-red-500">{state.errors.title}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">
            Especie <span className="text-green-600">*</span>
          </label>
          <select name="species" required className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400">
            <option value="">Escolher...</option>
            <option value="dog">Cao</option>
            <option value="cat">Gato</option>
            <option value="other">Outro</option>
          </select>
          {state.errors?.species && <p className="mt-1 text-xs text-red-500">{state.errors.species}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">
            Concelho <span className="text-green-600">*</span>
          </label>
          <select name="parish" required className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400">
            <option value="">Escolher...</option>
            {["Funchal","Camara de Lobos","Ribeira Brava","Ponta do Sol","Calheta","Porto Moniz","Sao Vicente","Santana","Machico","Santa Cruz","Porto Santo"].map(p =>
              <option key={p} value={p}>{p}</option>
            )}
          </select>
          {state.errors?.parish && <p className="mt-1 text-xs text-red-500">{state.errors.parish}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">Descricao</label>
        <textarea
          name="description"
          rows={3}
          placeholder="Cor, tamanho, onde foi visto, coleira, chip..."
          className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">
          Telefone de contacto <span className="text-green-600">*</span>
        </label>
        <input
          name="contact_phone"
          type="tel"
          required
          placeholder="9XX XXX XXX"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400"
        />
        {state.errors?.contact_phone && <p className="mt-1 text-xs text-red-500">{state.errors.contact_phone}</p>}
      </div>
<div>
        <label className="mb-1.5 block text-[13px] font-semibold">Foto (opcional)</label>
        <PhotoUpload onUpload={(url) => setPhotoUrl(url)} />
        <input type="hidden" name="photo" value={photoUrl || ""} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-green-800 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {pending ? "A publicar..." : "Publicar anuncio"}
      </button>
    </form>
  );
}