"use server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function submitReport(prevState, formData) {
  const data = Object.fromEntries(formData);
  const errors = {};

  if (!data.parish) errors.parish = "Escolhe o concelho";
  if (!data.location || data.location.length < 5) errors.location = "Indica o local com mais detalhe";
  if (!data.description || data.description.length < 20) errors.description = "Descreve com mais detalhe (mín. 20 caracteres)";
  if (!data.reporter_name || data.reporter_name.length < 2) errors.reporter_name = "Nome obrigatório";
  if (!/^9\d{8}$/.test(data.reporter_phone || "")) errors.reporter_phone = "Número inválido (9 dígitos)";

  if (Object.keys(errors).length > 0) return { errors };

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("reports").insert({
    type: data.type || "abandonment",
    parish: data.parish,
    location: data.location,
    description: data.description,
    seen_at: data.seen_at || new Date().toISOString(),
    reporter_name: data.reporter_name,
    reporter_phone: data.reporter_phone,
    reporter_email: data.reporter_email || null,
  });

  if (error) {
    console.log("SUPABASE ERROR:", error);
    return { errors: { _global: "Erro ao registar. Tenta de novo." } };
  }
  return { success: true };
}