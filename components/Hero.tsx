"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  useEffect(() => {
    // Track visit event on page load
    trackEvent("visit");
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-electric-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-electric-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,144,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-electric-500/10 border border-electric-500/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-electric-500 rounded-full animate-pulse" />
          <span className="text-electric-400 text-sm font-medium">
            Nouveau: Configuration en moins de 5 minutes
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-white">Gérez vos accès et</span>
          <br />
          <span className="text-gradient">abonnements sans effort</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          La solution tout-en-un pour les créateurs de contenu. Gérez vos membres,
          automatisez vos abonnements et monétisez votre contenu en quelques clics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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
          <Link href="#features" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            Découvrir les fonctionnalités
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-electric-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Configuration rapide</span>
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
            <span>Support 24/7</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative">
          <div className="glass-card p-2 max-w-4xl mx-auto">
            <div className="bg-navy-900 rounded-xl overflow-hidden">
              {/* Mock Dashboard */}
              <div className="bg-navy-800/50 px-4 py-3 flex items-center space-x-2 border-b border-navy-700/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-gray-500 text-sm">dashboard.accessly.io</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-navy-800/60 rounded-lg p-4">
                    <div className="text-electric-400 text-sm mb-1">Abonnés actifs</div>
                    <div className="text-2xl font-bold text-white">2,847</div>
                    <div className="text-green-400 text-xs mt-1">+12.5% ce mois</div>
                  </div>
                  <div className="bg-navy-800/60 rounded-lg p-4">
                    <div className="text-electric-400 text-sm mb-1">Revenus MRR</div>
                    <div className="text-2xl font-bold text-white">€14,230</div>
                    <div className="text-green-400 text-xs mt-1">+8.2% ce mois</div>
                  </div>
                  <div className="bg-navy-800/60 rounded-lg p-4">
                    <div className="text-electric-400 text-sm mb-1">Taux de rétention</div>
                    <div className="text-2xl font-bold text-white">94.2%</div>
                    <div className="text-green-400 text-xs mt-1">+2.1% ce mois</div>
                  </div>
                </div>
                <div className="h-32 bg-navy-800/40 rounded-lg flex items-end justify-around px-4 pb-4">
                  <div className="w-8 bg-electric-500/60 rounded-t" style={{ height: "40%" }} />
                  <div className="w-8 bg-electric-500/60 rounded-t" style={{ height: "55%" }} />
                  <div className="w-8 bg-electric-500/60 rounded-t" style={{ height: "45%" }} />
                  <div className="w-8 bg-electric-500/60 rounded-t" style={{ height: "70%" }} />
                  <div className="w-8 bg-electric-500/60 rounded-t" style={{ height: "65%" }} />
                  <div className="w-8 bg-electric-500/60 rounded-t" style={{ height: "80%" }} />
                  <div className="w-8 bg-electric-500 rounded-t" style={{ height: "90%" }} />
                </div>
              </div>
            </div>
          </div>
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-electric-500/20 via-transparent to-electric-600/20 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
