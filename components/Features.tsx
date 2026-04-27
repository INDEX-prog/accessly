"use client";

export default function Features() {
  const features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Gestion des accès sécurisée",
      description:
        "Contrôlez qui accède à votre contenu premium avec des liens sécurisés et des permissions granulaires.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      title: "Abonnements automatisés",
      description:
        "Automatisez la facturation récurrente et les renouvellements. Plus de gestion manuelle des paiements.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Analytics en temps réel",
      description:
        "Suivez vos revenus, la croissance de vos membres et les taux de conversion avec des tableaux de bord intuitifs.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Gestion des membres",
      description:
        "Organisez vos membres en segments, gérez les niveaux d'accès et communiquez facilement avec eux.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Intégrations puissantes",
      description:
        "Connectez Accessly à vos outils préférés: Discord, Slack, Notion, Zapier et bien plus encore.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Sécurité de niveau entreprise",
      description:
        "Vos données et celles de vos membres sont protégées avec un chiffrement de bout en bout.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric-400 font-semibold text-sm tracking-wider uppercase">
            Fonctionnalités
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Tout ce dont vous avez besoin pour
            <br />
            <span className="text-gradient">réussir en tant que créateur</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Une plateforme complète conçue pour vous aider à gérer, monétiser et
            développer votre communauté de membres.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:bg-navy-700/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-electric-500/20 rounded-xl flex items-center justify-center text-electric-400 mb-4 group-hover:bg-electric-500/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-electric-400 font-semibold text-sm tracking-wider uppercase">
                Premier succès en 5 minutes
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4">
                Configurez votre premier accès en quelques clics
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Notre objectif: vous permettre d&apos;atteindre votre première valeur en moins de 5
                minutes. Créez un espace, ajoutez vos contenus, et partagez le lien avec vos
                membres.
              </p>
              <ul className="space-y-3">
                {[
                  "Créez votre espace en 30 secondes",
                  "Importez vos membres existants",
                  "Configurez vos niveaux d'abonnement",
                  "Commencez à recevoir des paiements",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-300">
                    <svg
                      className="w-5 h-5 text-electric-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-900/80 rounded-xl p-6 border border-navy-700/50">
              {/* Mini onboarding preview */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-electric-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1 h-2 bg-electric-500 rounded-full" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-electric-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1 h-2 bg-electric-500 rounded-full" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-electric-500/50 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1 h-2 bg-navy-700 rounded-full">
                    <div className="h-2 bg-electric-500 rounded-full w-1/2" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm">
                    4
                  </div>
                  <div className="flex-1 h-2 bg-navy-700 rounded-full" />
                </div>
                <div className="mt-6 p-4 bg-navy-800/60 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Progression</div>
                  <div className="text-2xl font-bold text-white">62% complété</div>
                  <div className="text-electric-400 text-sm mt-1">~2 min restantes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
