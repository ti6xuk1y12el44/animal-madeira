"use client";
import { useActionState } from "react";
import { subscribeNewsletter } from "@/actions/newsletter";
import { Mail } from "lucide-react";

export default function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, {});

  return (
    <section className="bg-green-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row">
        <div className="flex items-center gap-3 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Mail size={16} />
          </span>
          <div>
            <h3 className="text-[13px] font-bold">Fica a par de campanhas, historias e novidades.</h3>
            <p className="text-[13px] text-white/60">Subscreve a nossa newsletter e ajuda mais animais.</p>
          </div>
        </div>
        {state.success ? (
          <p className="text-[13px] font-semibold text-white">{state.message}</p>
        ) : (
          <form action={action} className="flex w-full gap-2 sm:w-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="O teu email"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] text-white placeholder-white/30 outline-none sm:w-56"
            />
            <button
              type="submit"
              disabled={pending}
              className="shrink-0 rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-green-800 transition hover:bg-green-50 disabled:opacity-50"
            >
              {pending ? "..." : "Subscrever"}
            </button>
          </form>
        )}
        {state.error && <p className="text-[12px] text-red-300">{state.error}</p>}
      </div>
    </section>
  );
}