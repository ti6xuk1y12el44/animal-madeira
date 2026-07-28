"use client";
import { useState, useEffect, use } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/PhotoUpload";

export default function EditAnimalPage({ params }) {
  const { id } = use(params);
  const [shelters, setShelters] = useState([]);
  const [animal, setAnimal] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabase = supabaseBrowser();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin"); return; }

      const [shelterRes, animalRes] = await Promise.all([
        supabase.from("shelters").select("id, name").order("name"),
        supabase.from("animals").select("*").eq("id", id).single(),
      ]);

      setShelters(shelterRes.data || []);

      if (animalRes.data) {
        setAnimal(animalRes.data);
        setPhotoUrl(animalRes.data.photos?.[0] || null);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.target);

    const updates = {
      name: form.get("name"),
      shelter_id: form.get("shelter_id"),
      species: form.get("species"),
      sex: form.get("sex"),
      age_months: parseInt(form.get("age_months")) || 0,
      size: form.get("size") || null,
      sterilised: form.get("sterilised") === "on",
      vaccinated: form.get("vaccinated") === "on",
      urgent: form.get("urgent") === "on",
      description: form.get("description") || null,
      photos: photoUrl ? [photoUrl] : [],
    };

    const { error: err } = await supabase.from("animals").update(updates).eq("id", id);

    if (err) {
      setError("Erro ao atualizar: " + err.message);
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  if (!animal) return <main className="p-10 text-center text-ink/40">A carregar...</main>;

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <button onClick={() => router.push("/admin/dashboard")} className="mb-6 text-[13px] font-semibold text-ink/40 hover:text-ink">
        ← Voltar ao dashboard
      </button>
      <h1 className="font-display text-2xl font-bold">Editar {animal.name}</h1>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Foto</label>
          <PhotoUpload onUpload={(url) => setPhotoUrl(url)} currentUrl={photoUrl} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">Nome <span className="text-green-600">*</span></label>
            <input name="name" required defaultValue={animal.name} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-green-400" />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">Abrigo <span className="text-green-600">*</span></label>
            <select name="shelter_id" required defaultValue={animal.shelter_id} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-green-400">
              <option value="">Escolher...</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">Especie <span className="text-green-600">*</span></label>
            <select name="species" required defaultValue={animal.species} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-green-400">
              <option value="dog">Cao</option>
              <option value="cat">Gato</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">Sexo</label>
            <select name="sex" defaultValue={animal.sex || ""} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-green-400">
              <option value="">—</option>
              <option value="m">Macho</option>
              <option value="f">Femea</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold">Idade (meses) <span className="text-green-600">*</span></label>
            <input name="age_months" type="number" min="0" required defaultValue={animal.age_months} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-green-400" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Porte (caes)</label>
          <select name="size" defaultValue={animal.size || ""} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-green-400">
            <option value="">Nao aplicavel</option>
            <option value="small">Pequeno</option>
            <option value="medium">Medio</option>
            <option value="large">Grande</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold">Descricao</label>
          <textarea name="description" rows={3} defaultValue={animal.description || ""} className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-green-400" />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-[13px] font-medium">
            <input type="checkbox" name="sterilised" defaultChecked={animal.sterilised} className="accent-green-600" /> Esterilizado
          </label>
          <label className="flex items-center gap-2 text-[13px] font-medium">
            <input type="checkbox" name="vaccinated" defaultChecked={animal.vaccinated} className="accent-green-600" /> Vacinado
          </label>
          <label className="flex items-center gap-2 text-[13px] font-medium">
            <input type="checkbox" name="urgent" defaultChecked={animal.urgent} className="accent-green-600" /> Adocao urgente
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-green-600 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "A guardar..." : "Guardar alteracoes"}
        </button>
      </form>
    </main>
  );
}