"use server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function submitVolunteer(prevState, formData) {
  const data = Object.fromEntries(formData);
  const errors = {};

  if (!data.name || data.name.length < 2) errors.name = "Nome obrigatorio";
  if (!data.phone || !/^9\d{8}$/.test(data.phone)) errors.phone = "Numero invalido (9 digitos)";
  if (!data.interest) errors.interest = "Escolhe uma area";

  if (Object.keys(errors).length > 0) return { errors };

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("volunteers").insert({
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    interest: data.interest,
    parish: data.parish || null,
    message: data.message || null,
  });

  if (error) return { errors: { _global: "Erro ao registar. Tenta de novo." } };
  return { success: true };
}