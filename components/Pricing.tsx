"use client";

import Link from "next/link";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export default function Pricing() {
  const tiers: PricingTier[] = [
    {
      name: "Starter",
      price: "0€",
      period: "/mois",
      description: "Parfait pour commencer et tester la plateforme",
      features: [
        "Jusqu'à 50 membres",
        "1 espace de contenu",
        "Paiements Stripe basiques",
        "Support par email",
        "Analytics de base",
      ],
      highlighted: false,
      cta: "Commencer gratuitement",
    },
    {
      name: "Pro",
      price: "29€",
      period: "/mois",
      description: "Pour les créateurs qui veulent grandir",
      features: [
        "Membres illimités",
        "Espaces illimités",
        "Tous les modes de paiement",
        "Support prioritaire 24/7",
        "Analytics avancés",
        "Intégrations premium",
        "Domaine personnalisé",
        "API access",
      ],
      highlighted: true,
      cta: "Essai gratuit 14 jours",
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      period: "",
      description: "Pour les équipes et grandes communautés",
      features: [
        "Tout dans Pro",
        "Account manager dédié",
        "SLA personnalisé",
        "Onboarding assisté",
        "Intégrations sur mesure",
        "Facturation personnalisée",
        "Formation équipe",
      ],
      highlighted: false,
      cta: "Contacter les ventes",
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-900/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric-400 font-semibold text-sm tracking-wider uppercase">
            Tarifs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Des prix <span className="text-gradient">simples et transparents</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Commencez gratuitement et évoluez selon vos besoins. Pas de frais cachés,
            pas de surprises.
          </p>
        </div>

        {/* Pricing note */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-electric-500/10 border border-electric-500/30 rounded-full px-4 py-2">
            <svg className="w-5 h-5 text-electric-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-electric-400 text-sm">
              Tarifs en cours de validation — offres de lancement disponibles
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                tier.highlighted
                  ? "bg-gradient-to-b from-electric-500/20 to-navy-800/60 border-2 border-electric-500/50"
                  : "glass-card"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Populaire
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400 ml-1">{tier.period}</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-electric-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-200 ${
                  tier.highlighted
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-4">
            Des questions sur nos tarifs ou fonctionnalités?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#"
              className="text-electric-400 hover:text-electric-300 font-medium flex items-center space-x-2 transition-colors"
            >
              <span>Voir la FAQ complète</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link
              href="#"
              className="text-electric-400 hover:text-electric-300 font-medium flex items-center space-x-2 transition-colors"
            >
              <span>Contacter le support</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
