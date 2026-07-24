"use server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function subscribeNewsletter(prevState, formData) {
  const email = formData.get("email");

  if (!email || !email.includes("@")) {
    return { error: "Email invalido" };
  }

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("newsletter").insert({ email });

  if (error && error.code === "23505") {
    return { success: true, message: "Ja estavas subscrito!" };
  }

  if (error) {
    return { error: "Erro ao subscrever. Tenta de novo." };
  }

  return { success: true, message: "Subscrito com sucesso!" };
}