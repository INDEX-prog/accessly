"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-card p-12 md:p-16 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-electric-600/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à simplifier votre gestion
              <br />
              <span className="text-gradient">d&apos;abonnements?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Rejoignez des centaines de créateurs qui font confiance à Accessly
              pour gérer leurs membres et monétiser leur contenu. Commencez
              gratuitement, sans engagement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Commencer gratuitement
                <svg
                  className="inline-block w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link href="#" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                Voir une démo
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-electric-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Configuration en 5 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-electric-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sans carte de crédit</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-electric-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Annulez à tout moment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
