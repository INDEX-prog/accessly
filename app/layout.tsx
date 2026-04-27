import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Accessly - Empowering Creators: Manage Access & Subscriptions Effortlessly!',
  description: 'Un SaaS de gestion des accès et abonnements pour créateurs de contenu. Manage your content access and subscriptions with ease.',
  keywords: ['SaaS', 'subscriptions', 'access management', 'content creators', 'membership'],
  authors: [{ name: 'Accessly' }],
  openGraph: {
    title: 'Accessly - Manage Access & Subscriptions Effortlessly',
    description: 'The complete platform for content creators to manage access and subscriptions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
