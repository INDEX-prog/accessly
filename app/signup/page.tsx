"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Step = "signup" | "onboarding" | "payment" | "complete";

interface FormData {
  email: string;
  password: string;
  name: string;
  spaceName: string;
  spaceType: string;
}

export default function SignupPage() {
  const [step, setStep] = useState<Step>("signup");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    spaceName: "",
    spaceType: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      trackEvent("signup_completed", formData.email, { method: "email" });
      console.log("[Accessly] Signup completed for:", formData.email);
      setIsLoading(false);
      setStep("onboarding");
    }, 1000);
  };

  const handleOnboarding = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      trackEvent("onboarding_completed", formData.email, {
        spaceName: formData.spaceName,
        spaceType: formData.spaceType,
      });
      console.log("[Accessly] Onboarding completed - First value achieved!");
      setIsLoading(false);
      setStep("payment");
    }, 800);
  };

  const handlePaymentInit = (): void => {
    setIsLoading(true);
    trackEvent("payment_initiated", formData.email, { plan: "pro" });
    console.log("[Accessly] Payment initiated");
    
    setTimeout(() => {
      trackEvent("subscription_created", formData.email, { 
        plan: "pro",
        amount: 29 
      });
      console.log("[Accessly] Subscription created!");
      setIsLoading(false);
      setStep("complete");
    }, 1500);
  };

  const handleSkipPayment = (): void => {
    setStep("complete");
  };

  const spaceTypes: { value: string; label: string; icon: string }[] = [
    { value: "membership", label: "Communauté / Membership", icon: "👥" },
    { value: "course", label: "Cours en ligne", icon: "📚" },
    { value: "newsletter", label: "Newsletter premium", icon: "📧" },
    { value: "coaching", label: "Coaching / Consulting", icon: "🎯" },
    { value: "other", label: "Autre", icon: "✨" },
  ];

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-electric-500 to-electric-700 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Accessly</span>
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            {["Inscription", "Configuration", "Paiement", "Terminé"].map(
              (label, index) => {
                const stepOrder: Step[] = ["signup", "onboarding", "payment", "complete"];
                const currentIndex = stepOrder.indexOf(step);
                const isActive = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isActive
                          ? "bg-electric-500 text-white"
                          : "bg-navy-800 text-gray-500"
                      } ${isCurrent ? "ring-2 ring-electric-400 ring-offset-2 ring-offset-navy-950" : ""}`}
                    >
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <div
                        className={`w-8 h-1 mx-1 ${
                          index < currentIndex ? "bg-electric-500" : "bg-navy-800"
                        }`}
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* Step: Signup */}
          {step === "signup" && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Créez votre compte
              </h1>
              <p className="text-gray-400 mb-6">
                Commencez gratuitement, sans carte de crédit
              </p>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                    placeholder="jean@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Création en cours...
                    </span>
                  ) : (
                    "Créer mon compte"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-gray-500 text-sm">
                Déjà un compte?{" "}
                <Link href="#" className="text-electric-400 hover:text-electric-300">
                  Se connecter
                </Link>
              </p>
            </div>
          )}

          {/* Step: Onboarding */}
          {step === "onboarding" && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Configurez votre premier espace
              </h1>
              <p className="text-gray-400 mb-6">
                🎯 Objectif: première valeur en moins de 5 minutes
              </p>

              <form onSubmit={handleOnboarding} className="space-y-4">
                <div>
                  <label htmlFor="spaceName" className="block text-sm font-medium text-gray-300 mb-2">
                    Nom de votre espace
                  </label>
                  <input
                    type="text"
                    id="spaceName"
                    value={formData.spaceName}
                    onChange={(e) => setFormData({ ...formData, spaceName: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent"
                    placeholder="Ma communauté premium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Type de contenu
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {spaceTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${
                          formData.spaceType === type.value
                            ? "bg-electric-500/20 border-2 border-electric-500"
                            : "bg-navy-800 border-2 border-navy-700 hover:border-navy-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="spaceType"
                          value={type.value}
                          checked={formData.spaceType === type.value}
                          onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                          className="sr-only"
                        />
                        <span className="text-2xl mr-3">{type.icon}</span>
                        <span className="text-white">{type.label}</span>
                        {formData.spaceType === type.value && (
                          <svg className="w-5 h-5 text-electric-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.spaceType}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Configuration...
                    </span>
                  ) : (
                    "Créer mon espace"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step: Payment */}
          {step === "payment" && (
            <div>
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-400 font-medium">
                    🎉 Première valeur atteinte! Votre espace est prêt.
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">
                Passez à Pro pour débloquer tout
              </h1>
              <p className="text-gray-400 mb-6">
                Membres illimités, analytics avancés, intégrations premium
              </p>

              <div className="glass-card p-6 mb-6">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">29€</span>
                  <span className="text-gray-400 ml-1">/mois</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Membres illimités",
                    "Espaces illimités",
                    "Analytics avancés",
                    "Support prioritaire 24/7",
                    "Intégrations premium",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-electric-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handlePaymentInit}
                  disabled={isLoading}
                  className="w-full btn-primary py-4 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Traitement...
                    </span>
                  ) : (
                    "S'abonner à Pro — 29€/mois"
                  )}
                </button>
              </div>

              <button
                onClick={handleSkipPayment}
                className="w-full text-gray-400 hover:text-white transition-colors text-sm"
              >
                Continuer avec la version gratuite →
              </button>
            </div>
          )}

          {/* Step: Complete */}
          {step === "complete" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">
                Bienvenue sur Accessly! 🎉
              </h1>
              <p className="text-gray-400 mb-8">
                Votre espace &quot;{formData.spaceName}&quot; est prêt. Vous pouvez
                maintenant inviter vos premiers membres.
              </p>

              <div className="space-y-4">
                <Link
                  href="/dashboard"
                  className="block w-full btn-primary py-4"
                >
                  Aller au Dashboard
                </Link>
                <Link
                  href="/"
                  className="block w-full btn-secondary py-4"
                >
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-navy-900 to-navy-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,144,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-electric-600/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center max-w-md">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Première valeur en 5 minutes
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Configurez votre premier espace d&apos;accès, invitez vos membres et
            commencez à monétiser votre contenu immédiatement.
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-electric-400">2,847</div>
              <div className="text-gray-500 text-sm">Créateurs actifs</div>
            </div>
            <div className="w-px bg-navy-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-electric-400">€1.2M</div>
              <div className="text-gray-500 text-sm">Générés ce mois</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
