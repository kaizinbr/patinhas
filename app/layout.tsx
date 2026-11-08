import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import { walsheim, walsheimCondensed } from "@/app/fonts";
import Navbar from "@/components/core/nav";

export const metadata: Metadata = {
    title: "Patinhas | Dados de pesquisa",
    description: "Gráficos e dados da pesquisa do projeto Patinhas.",
};

const passo = localFont({
    variable: "--font-main",
    src: "../resources/fonts/PassoVariableTest.ttf",
    display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="pt-br"
            className={cn(
                "h-full",
                "antialiased",
                "font-sans",
                passo.className,
                "font-main",
                `${walsheim.variable} ${walsheimCondensed.variable}`
            )}
        >
            <body className="min-h-full flex flex-col">
                <Navbar />
                {children}</body>
        </html>
    );
}
