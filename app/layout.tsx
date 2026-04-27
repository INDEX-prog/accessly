import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Accessly - Empowering Creators: Manage Access & Subscriptions Effortlessly!",
  description: "Un SaaS de gestion des accès et abonnements pour créateurs de contenu. Gérez vos membres, abonnements et accès en moins de 5 minutes.",
  keywords: "SaaS, subscription management, access management, creators, memberships, gated content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
