// app/layout.tsx   ← This is the ROOT layout
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ClientLayout from "@/components/ClientLayout"; // We'll create this next

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "My Store",
    description: "Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ClientLayout>{children}</ClientLayout>
                <Toaster />
            </body>
        </html>
    );
}