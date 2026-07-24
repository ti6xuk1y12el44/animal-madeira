"use server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function uploadAnimalPhoto(formData) {
  const file = formData.get("file");
  if (!file || file.size === 0) return { error: "Nenhum ficheiro selecionado" };

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) return { error: "Ficheiro demasiado grande (max 5MB)" };

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) return { error: "Formato invalido (JPG, PNG ou WebP)" };

  const ext = file.name.split(".").pop();
  const fileName = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;

  const supabase = supabaseAdmin();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { error } = await supabase.storage
    .from("animal-photos")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.log("Upload error:", error);
    return { error: "Erro no upload. Tenta de novo." };
  }

  const { data: urlData } = supabase.storage
    .from("animal-photos")
    .getPublicUrl(fileName);

  return { success: true, url: urlData.publicUrl };
}