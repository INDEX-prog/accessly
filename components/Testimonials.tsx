"use client";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Accessly a transformé la façon dont je gère ma communauté. En 5 minutes, tout était configuré et mes membres avaient accès à leur contenu.",
      author: "Marie Dubois",
      role: "Créatrice de contenu lifestyle",
      avatar: "MD",
    },
    {
      quote:
        "Enfin une solution simple qui fait exactement ce dont j'ai besoin. Plus de jonglage entre plusieurs outils, tout est centralisé.",
      author: "Thomas Martin",
      role: "Formateur en ligne",
      avatar: "TM",
    },
    {
      quote:
        "Le support est incroyable et la plateforme évolue constamment. C'est le partenaire idéal pour faire grandir mon business de créateur.",
      author: "Sophie Laurent",
      role: "Coach & Auteure",
      avatar: "SL",
    },
  ];

  const stats: { value: string; label: string }[] = [
    { value: "5 min", label: "Premier succès" },
    { value: "98%", label: "Satisfaction client" },
    { value: "24/7", label: "Support disponible" },
    { value: "0€", label: "Pour commencer" },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Bar */}
        <div className="glass-card p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-electric-400 font-semibold text-sm tracking-wider uppercase">
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Ce que disent <span className="text-gradient">nos créateurs</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Rejoignez des centaines de créateurs qui ont simplifié leur gestion
            d&apos;abonnements avec Accessly.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:bg-navy-700/40 transition-all duration-300"
            >
              {/* Quote Icon */}
              <svg
                className="w-10 h-10 text-electric-500/30 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-500 to-electric-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Logos */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm mb-8">
            Intégrations disponibles avec vos outils préférés
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Discord", "Slack", "Notion", "Zapier", "Stripe"].map((tool, i) => (
              <div
                key={i}
                className="text-gray-400 font-semibold text-lg px-4 py-2 border border-navy-700 rounded-lg"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
