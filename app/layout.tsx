import type { Metadata } from "next";
import { Anton, Bebas_Neue, Inter, JetBrains_Mono, Stardos_Stencil } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const stencil = Stardos_Stencil({
  variable: "--font-stencil",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'KILLER "THE HAMMER" DOE — Official Sponsorship Hub',
  description:
    "UFC fighter ready to break your brand into millions of fight fans. Sponsorship packages, audience reach, and partnership opportunities.",
  openGraph: {
    title: 'KILLER "THE HAMMER" DOE — Sponsorship Hub',
    description: "Put your brand on the most feared fighter in the cage.",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${anton.variable} ${bebas.variable} ${jetbrains.variable} ${stencil.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground">
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            className: "!font-mono !uppercase !text-xs !tracking-wider",
          }}
        />
      </body>
    </html>
  );
}
