"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { getSite, setSite } from "@/lib/firebase/collections";
import { PLACEHOLDER_SITE } from "@/lib/placeholder-data";
import { SiteSchema, type Site } from "@/lib/schemas";

export default function ProfileAdminPage() {
  const [loading, setLoading] = useState(true);

  const form = useForm<Site>({
    resolver: zodResolver(SiteSchema),
    defaultValues: PLACEHOLDER_SITE,
  });

  useEffect(() => {
    getSite()
      .then((data) => {
        if (data) form.reset(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: Site) => {
    try {
      await setSite(data);
      toast.success("PROFILE SAVED");
    } catch (err) {
      toast.error(`SAVE FAILED — ${err instanceof Error ? err.message : "TRY AGAIN"}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#dc143c] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-4xl md:text-5xl text-white tracking-wider">FIGHTER PROFILE</h1>
        <p className="font-mono text-xs text-white/60 uppercase tracking-wider mt-2">
          » Hero section, record, tagline, manager contact, media kit URL.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="fighterName" label="FIGHTER NAME" form={form} />
            <Field name="nickname" label="NICKNAME (NO QUOTES)" form={form} />
          </div>
          <Field name="weightClass" label="WEIGHT CLASS" form={form} />
          <Field name="tagline" label="HERO TAGLINE" form={form} type="textarea" />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Field name="record.wins" label="W" form={form} type="number" />
            <Field name="record.losses" label="L" form={form} type="number" />
            <Field name="record.draws" label="D" form={form} type="number" />
            <Field name="record.knockouts" label="KO" form={form} type="number" />
            <Field name="record.submissions" label="SUB" form={form} type="number" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="heroPosterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                    HERO POSTER IMAGE
                  </FormLabel>
                  <FormControl>
                    <MediaUploader
                      value={field.value}
                      onChange={field.onChange}
                      folder="hero/posters"
                      accept="image/*"
                      label="UPLOAD HERO PHOTO"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heroVideoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                    HERO BG VIDEO (MP4)
                  </FormLabel>
                  <FormControl>
                    <MediaUploader
                      value={field.value}
                      onChange={field.onChange}
                      folder="hero/videos"
                      accept="video/*"
                      label="UPLOAD HERO VIDEO"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field name="nextFightDate" label="NEXT FIGHT (ISO DATE)" form={form} helper="e.g. 2026-09-14T22:00:00Z" />
            <Field name="nextFightOpponent" label="OPPONENT" form={form} />
            <Field name="nextFightVenue" label="VENUE" form={form} />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field name="managerEmail" label="MANAGER EMAIL" form={form} type="email" />
            <Field name="managerPhone" label="MANAGER PHONE" form={form} />
            <Field name="managerWhatsapp" label="WHATSAPP (E.164)" form={form} />
          </div>

          <Field name="mediaKitUrl" label="MEDIA KIT PDF URL" form={form} type="url" />
          <Field name="bioShort" label="SHORT BIO (FOOTER)" form={form} type="textarea" />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="rounded-none font-display tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white h-12 px-8"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            SAVE PROFILE
          </Button>
        </form>
      </Form>
    </div>
  );
}

import type { UseFormReturn, FieldPath } from "react-hook-form";

function Field({
  name,
  label,
  form,
  type = "text",
  helper,
}: {
  name: FieldPath<Site>;
  label: string;
  form: UseFormReturn<Site>;
  type?: "text" | "textarea" | "number" | "email" | "url";
  helper?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
            {label}
          </FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                {...field}
                value={(field.value as string) ?? ""}
                className="bg-black border-white/20 rounded-none font-mono"
              />
            ) : (
              <Input
                {...field}
                type={type === "number" ? "number" : type === "email" ? "email" : type === "url" ? "url" : "text"}
                value={(field.value as string | number) ?? (type === "number" ? 0 : "")}
                onChange={(e) =>
                  field.onChange(
                    type === "number" ? parseFloat(e.target.value) || 0 : e.target.value,
                  )
                }
                className="bg-black border-white/20 rounded-none font-mono"
              />
            )}
          </FormControl>
          {helper && (
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{helper}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
