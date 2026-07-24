"use client";
import { useState } from "react";
import { uploadAnimalPhoto } from "@/actions/upload";
import { Camera, X, Loader2 } from "lucide-react";

export default function PhotoUpload({ onUpload, currentUrl }) {
  const [preview, setPreview] = useState(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadAnimalPhoto(formData);

    if (result.error) {
      setError(result.error);
      setPreview(currentUrl || null);
    } else {
      setPreview(result.url);
      onUpload(result.url);
    }

    setUploading(false);
  }

  function handleRemove() {
    setPreview(null);
    setError(null);
    onUpload(null);
  }

  return (
    <div>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="h-40 w-40 rounded-xl object-cover" />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
              <Loader2 size={20} className="animate-spin text-white" />
            </div>
          )}
          {!uploading && (
            <button
              onClick={handleRemove}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
              type="button"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ) : (
        <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-green-50 transition hover:border-green-400">
          <Camera size={24} className="text-green-600" />
          <span className="text-[11px] font-semibold text-ink/40">Adicionar foto</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="mt-2 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}