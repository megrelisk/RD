"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/storage";

type Props = {
  value?: string;
  onChange: (url: string | undefined) => void;
  folder?: string;
  accept?: string;
  label?: string;
};

export function MediaUploader({
  value,
  onChange,
  folder = "uploads",
  accept = "image/*",
  label = "UPLOAD MEDIA",
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const handle = async (file: File) => {
    setBusy(true);
    setProgress(0);
    try {
      const { url } = await uploadFile(folder, file, setProgress);
      onChange(url);
      toast.success("UPLOADED");
    } catch (err) {
      toast.error(`UPLOAD FAILED — ${err instanceof Error ? err.message : "TRY AGAIN"}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative w-full aspect-video bg-black border border-[#dc143c]/40 overflow-hidden group">
          {accept.includes("video") ? (
            <video src={value} controls className="w-full h-full object-cover" />
          ) : (
            <Image src={value} alt="Uploaded" fill sizes="50vw" className="object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute top-2 right-2 bg-black/80 hover:bg-[#dc143c] text-white p-2 transition-colors"
            aria-label="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="w-full aspect-video border-2 border-dashed border-white/20 hover:border-[#dc143c] flex flex-col items-center justify-center gap-2 transition-colors bg-black/40"
        >
          {busy ? (
            <>
              <Loader2 className="w-6 h-6 text-[#dc143c] animate-spin" />
              <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                UPLOADING {Math.round(progress)}%
              </span>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 text-white/40" />
              <span className="font-mono text-xs uppercase tracking-wider text-white/60">{label}</span>
            </>
          )}
        </button>
      )}

      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handle(file);
          e.target.value = "";
        }}
      />

      {/* Fallback: paste URL */}
      <div className="flex gap-2">
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value || undefined)}
          placeholder="OR PASTE URL"
          className="bg-black border-white/20 rounded-none font-mono text-xs"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="rounded-none border-white/20 font-mono text-xs"
        >
          BROWSE
        </Button>
      </div>
    </div>
  );
}
