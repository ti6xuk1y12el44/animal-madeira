"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Plus, Pencil, Trash2, PawPrint, FileText, Users, Mail } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [reports, setReports] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("animals");
  const router = useRouter();
  const supabase = supabaseBrowser();

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin"); return; }
      setUser(user);
      await loadData();
      setLoading(false);
    }
    init();
  }, []);

  async function loadData() {
    const [a, r, v, n] = await Promise.all([
      supabase.from("animals").select("*, shelters(name)").order("created_at", { ascending: false }),
      supabase.from("reports").select("*").order("created_at", { ascending: false }),
      supabase.from("volunteers").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter").select("*").order("created_at", { ascending: false }),
    ]);
    setAnimals(a.data || []);
    setReports(r.data || []);
    setVolunteers(v.data || []);
    setNewsletters(n.data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin");
  }

  async function deleteAnimal(id) {
    if (!confirm("Tens a certeza que queres apagar este animal?")) return;
    await supabase.from("animals").delete().eq("id", id);
    setAnimals(animals.filter((a) => a.id !== id));
  }

  async function toggleAdopted(id, current) {
    await supabase.from("animals").update({ adopted: !current }).eq("id", id);
    setAnimals(animals.map((a) => a.id === id ? { ...a, adopted: !current } : a));
  }

  async function updateReportStatus(id, status) {
    await supabase.from("reports").update({ status }).eq("id", id);
    setReports(reports.map((r) => r.id === id ? { ...r, status } : r));
  }

  if (loading) return <main className="p-10 text-center text-ink/40">A carregar...</main>;

  const tabs = [
    { id: "animals", label: "Animais", Icon: PawPrint, count: animals.length },
    { id: "reports", label: "Denuncias", Icon: FileText, count: reports.length },
    { id: "volunteers", label: "Voluntarios", Icon: Users, count: volunteers.length },
    { id: "newsletter", label: "Newsletter", Icon: Mail, count: newsletters.length },
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Painel Admin</h1>
          <p className="text-[13px] text-ink/40">{user?.email}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] font-semibold transition hover:border-ink">
          <LogOut size={14} /> Sair
        </button>
      </div>

      {/* TABS */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={"flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition " +
              (tab === t.id ? "bg-green-600 text-white" : "bg-white border border-line text-ink/50 hover:border-ink")}
          >
            <t.Icon size={14} />
            {t.label}
            <span className={"rounded-full px-2 py-0.5 text-[10px] font-bold " +
              (tab === t.id ? "bg-white/20" : "bg-green-50 text-green-700")}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* ANIMAIS */}
      {tab === "animals" && (
        <div>
          <div className="mb-4 flex justify-end">
            <Link href="/admin/animals/new" className="flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-green-700">
              <Plus size={14} /> Adicionar animal
            </Link>
          </div>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-line bg-green-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Foto</th>
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Especie</th>
                  <th className="px-4 py-3 font-semibold">Abrigo</th>
                  <th className="px-4 py-3 font-semibold">Estado</th>
                  <th className="px-4 py-3 font-semibold">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {animals.map((a) => (
                  <tr key={a.id} className={"bg-white " + (a.adopted ? "opacity-50" : "")}>
                    <td className="px-4 py-3">
                      {a.photos?.[0] ? (
                        <img src={a.photos[0]} alt={a.name} className="h-10 w-10 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 font-display text-sm font-bold text-green-400">{a.name[0]}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">{a.name}</td>
                    <td className="px-4 py-3">{a.species === "dog" ? "Cao" : "Gato"}</td>
                    <td className="px-4 py-3 text-ink/50">{a.shelters?.name}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleAdopted(a.id, a.adopted)}
                        className={"rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase " +
                          (a.adopted ? "bg-green-100 text-green-700" : "bg-amber-50 text-amber-700")}
                      >
                        {a.adopted ? "Adotado" : "Disponivel"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={"/admin/animals/" + a.id} className="flex h-8 w-8 items-center justify-center rounded-lg border border-line transition hover:border-ink">
                          <Pencil size={14} />
                        </Link>
                        <button onClick={() => deleteAnimal(a.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-red-500 transition hover:border-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DENUNCIAS */}
      {tab === "reports" && (
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={"rounded-full px-2 py-0.5 text-[10px] font-bold uppercase " +
                      (r.type === "cruelty" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700")}>
                      {r.type === "cruelty" ? "Maus-tratos" : "Abandono"}
                    </span>
                    <span className={"rounded-full px-2 py-0.5 text-[10px] font-bold uppercase " +
                      (r.status === "new" ? "bg-blue-50 text-blue-600" : r.status === "forwarded" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500")}>
                      {r.status === "new" ? "Nova" : r.status === "forwarded" ? "Encaminhada" : "Fechada"}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[14px] font-semibold">{r.parish} — {r.location}</h3>
                  <p className="mt-1 text-[13px] text-ink/50">{r.description}</p>
                  <p className="mt-2 text-[12px] text-ink/30">
                    {r.reporter_name} · {r.reporter_phone} · {new Date(r.created_at).toLocaleDateString("pt-PT")}
                  </p>
                </div>
                <div className="flex gap-1">
                  {r.status === "new" && (
                    <button onClick={() => updateReportStatus(r.id, "forwarded")} className="rounded-full bg-green-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-green-700">
                      Encaminhar
                    </button>
                  )}
                  {r.status !== "closed" && (
                    <button onClick={() => updateReportStatus(r.id, "closed")} className="rounded-full border border-line px-3 py-1.5 text-[11px] font-semibold hover:border-ink">
                      Fechar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {reports.length === 0 && <p className="py-10 text-center text-[14px] text-ink/30">Sem denuncias.</p>}
        </div>
      )}

      {/* VOLUNTARIOS */}
      {tab === "volunteers" && (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-line bg-green-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">Telefone</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Area</th>
                <th className="px-4 py-3 font-semibold">Concelho</th>
                <th className="px-4 py-3 font-semibold">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {volunteers.map((v) => (
                <tr key={v.id} className="bg-white">
                  <td className="px-4 py-3 font-semibold">{v.name}</td>
                  <td className="px-4 py-3">{v.phone}</td>
                  <td className="px-4 py-3 text-ink/50">{v.email || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">{v.interest}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/50">{v.parish || "—"}</td>
                  <td className="px-4 py-3 text-ink/30">{new Date(v.created_at).toLocaleDateString("pt-PT")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {volunteers.length === 0 && <p className="py-10 text-center text-[14px] text-ink/30">Sem inscricoes.</p>}
        </div>
      )}

      {/* NEWSLETTER */}
      {tab === "newsletter" && (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-line bg-green-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {newsletters.map((n) => (
                <tr key={n.id} className="bg-white">
                  <td className="px-4 py-3 font-semibold">{n.email}</td>
                  <td className="px-4 py-3 text-ink/30">{new Date(n.created_at).toLocaleDateString("pt-PT")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {newsletters.length === 0 && <p className="py-10 text-center text-[14px] text-ink/30">Sem subscricoes.</p>}
        </div>
      )}
    </main>
  );
}