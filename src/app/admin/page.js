import LoginForm from "./LoginForm";

export const metadata = { title: "Admin · Animal Madeira" };

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-display text-2xl font-bold">Painel Admin</h1>
      <p className="mt-2 text-[14px] text-ink/50">Acesso restrito a administradores e abrigos.</p>
      <LoginForm />
    </main>
  );
}