"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou password incorretos.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <form onSubmit={handleLogin} className="mt-8 space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</p>}
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-green-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "A entrar..." : "Entrar"}
      </button>
    </form>
  );
}