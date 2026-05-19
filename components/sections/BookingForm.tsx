"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/effects/Reveal";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { createLead } from "@/lib/firebase/collections";
import { LeadSchema, type Lead, type Package, type Site } from "@/lib/schemas";

type Props = { site: Site; packages: Package[] };

export function BookingForm({ site, packages }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<Lead>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      company: "",
      contactName: "",
      email: "",
      phone: "",
      budget: "",
      packageInterest: "",
      fightDateInterest: site.nextFightDate ?? "",
      message: "",
    },
  });

  const onSubmit = async (data: Lead) => {
    setSubmitting(true);
    try {
      if (isFirebaseConfigured()) {
        await createLead(data);
      } else {
        // Fallback when Firebase not configured — POST to API route
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to submit");
      }
      setSuccess(true);
      form.reset();
      toast.success("REQUEST RECEIVED. WE'LL BE IN TOUCH WITHIN 24H.");
    } catch (e) {
      toast.error(`SUBMISSION FAILED — ${e instanceof Error ? e.message : "TRY AGAIN"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="book" className="relative bg-black">
      <SectionDivider label="BOOK A SPONSORSHIP / START THE DEAL" number="// 10" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left side — pitch */}
          <Reveal>
            <div>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-8">
                READY TO
                <br />
                <span className="blood-text">STRIKE A DEAL?</span>
              </h2>
              <p className="font-mono text-sm md:text-base text-white/80 uppercase tracking-wider leading-relaxed mb-8">
                » Tell us who you are, how much you want to invest, and which fight you want your
                logo on. We respond in <span className="text-[#dc143c]">24 hours.</span>
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "DIRECT LINE TO THE MANAGEMENT TEAM.",
                  "CUSTOM PROPOSAL WITHIN 48H.",
                  "TRANSPARENT PRICING, NO INFLATED CPMs.",
                  "FULL CAMPAIGN REPORTING POST-FIGHT.",
                ].map((line) => (
                  <div key={line} className="flex gap-3 font-mono text-xs uppercase tracking-wider text-white/70">
                    <ArrowRight className="w-4 h-4 text-[#dc143c] mt-0.5 shrink-0" />
                    {line}
                  </div>
                ))}
              </div>

              {/* Direct contacts */}
              <div className="bg-black border border-[#dc143c]/30 p-6 space-y-3">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-3">
                  ◆ PREFER DIRECT?
                </div>
                {site.managerEmail && (
                  <a
                    href={`mailto:${site.managerEmail}`}
                    className="block font-display text-xl text-white hover:text-[#dc143c] transition-colors"
                  >
                    📧 {site.managerEmail}
                  </a>
                )}
                {site.managerPhone && (
                  <a
                    href={`tel:${site.managerPhone}`}
                    className="block font-display text-xl text-white hover:text-[#dc143c] transition-colors"
                  >
                    ☎ {site.managerPhone}
                  </a>
                )}
                {site.managerWhatsapp && (
                  <a
                    href={`https://wa.me/${site.managerWhatsapp.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-display text-xl text-white hover:text-[#dc143c] transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 inline mr-2" />
                    WHATSAPP
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* Right side — form */}
          <Reveal delay={0.15}>
            <div className="relative bg-gradient-to-b from-[#1a0000]/40 to-black border-2 border-[#dc143c]/40 p-6 md:p-10">
              <div className="absolute -top-3 left-6 bg-black px-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c]">
                INTAKE FORM // SECURE
              </div>

              {success ? (
                <div className="text-center py-16 space-y-4">
                  <div className="font-display text-6xl blood-text">RECEIVED.</div>
                  <p className="font-mono text-sm uppercase tracking-wider text-white/80">
                    » Our team will reach out within 24 hours.
                  </p>
                  <Button
                    type="button"
                    onClick={() => setSuccess(false)}
                    variant="outline"
                    className="rounded-none border-2 border-white/40 hover:border-[#dc143c] hover:bg-[#dc143c] hover:text-white font-display tracking-wider"
                  >
                    SEND ANOTHER →
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                              COMPANY *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="ACME CORP"
                                className="bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono uppercase tracking-wider"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                              YOUR NAME *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="JOHN SMITH"
                                className="bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono uppercase tracking-wider"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                              EMAIL *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                placeholder="you@brand.com"
                                className="bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono lowercase"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                              PHONE
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="+1 555 0100"
                                className="bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                              BUDGET RANGE *
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono uppercase">
                                  <SelectValue placeholder="SELECT BUDGET" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-none">
                                <SelectItem value="under-10k">UNDER $10K</SelectItem>
                                <SelectItem value="10-50k">$10K — $50K</SelectItem>
                                <SelectItem value="50-150k">$50K — $150K</SelectItem>
                                <SelectItem value="150-500k">$150K — $500K</SelectItem>
                                <SelectItem value="500k+">$500K+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="packageInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                              PACKAGE INTEREST
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono uppercase">
                                  <SelectValue placeholder="PICK A PACKAGE" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-none">
                                <SelectItem value="custom">CUSTOM</SelectItem>
                                {packages.map((p) => (
                                  <SelectItem key={p.tier} value={p.tier}>
                                    {p.name} — ${p.priceUSD.toLocaleString()}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                            CAMPAIGN BRIEF *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              placeholder="TELL US ABOUT YOUR BRAND, TARGET AUDIENCE, AND WHAT YOU WANT TO ACHIEVE."
                              className="bg-black border-white/20 focus:border-[#dc143c] rounded-none font-mono"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-14 rounded-none font-display text-xl tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white border-2 border-[#dc143c] disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          SUBMITTING...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          LAUNCH REQUEST
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
