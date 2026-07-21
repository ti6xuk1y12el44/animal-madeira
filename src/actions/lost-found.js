"use server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function submitLostFound(prevState, formData) {
  const data = Object.fromEntries(formData);
  const errors = {};

  if (!data.type) errors.type = "Escolhe o tipo";
  if (!data.species) errors.species = "Escolhe a especie";
  if (!data.title || data.title.length < 3) errors.title = "Titulo muito curto";
  if (!data.parish) errors.parish = "Escolhe o concelho";
  if (!data.contact_phone || !/^9\d{8}$/.test(data.contact_phone)) errors.contact_phone = "Numero invalido (9 digitos)";

  if (Object.keys(errors).length > 0) return { errors };

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("lost_found").insert({
    type: data.type,
    species: data.species,
    title: data.title,
    parish: data.parish,
    description: data.description || null,
    contact_phone: data.contact_phone,
  });

  if (error) {
    console.log("SUPABASE ERROR:", error);
    return { errors: { _global: "Erro ao registar. Tenta de novo." } };
  }
  return { success: true };
}