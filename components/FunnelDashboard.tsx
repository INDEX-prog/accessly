"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getStoredEvents,
  calculateFunnelMetrics,
  clearEvents,
  trackEvent,
  type AnalyticsEvent,
  type FunnelMetrics,
  type FunnelEvent,
} from "@/lib/analytics";

interface FunnelStage {
  name: string;
  event: FunnelEvent;
  count: number;
  conversionRate: number;
  dropOff: number;
}

export default function FunnelDashboard() {
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadData = useCallback(() => {
    const storedEvents = getStoredEvents();
    setEvents(storedEvents);
    setMetrics(calculateFunnelMetrics(storedEvents));
    setLastRefresh(new Date());
    console.log("[Accessly Dashboard] Data refreshed:", storedEvents.length, "events");
  }, []);

  useEffect(() => {
    loadData();
    // Auto-refresh every 5 seconds
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleClearEvents = (): void => {
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les événements?")) {
      clearEvents();
      loadData();
    }
  };

  const simulateEvent = (event: FunnelEvent): void => {
    trackEvent(event, `user_${Date.now()}`);
    loadData();
  };

  if (!metrics) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="text-electric-400">Chargement...</div>
      </div>
    );
  }

  const funnelStages: FunnelStage[] = [
    {
      name: "Visites",
      event: "visit",
      count: metrics.visits,
      conversionRate: 100,
      dropOff: 0,
    },
    {
      name: "Inscriptions",
      event: "signup_completed",
      count: metrics.signups,
      conversionRate: metrics.visitToSignup,
      dropOff: 100 - metrics.visitToSignup,
    },
    {
      name: "Onboarding",
      event: "onboarding_completed",
      count: metrics.onboardingCompleted,
      conversionRate: metrics.signupToOnboarding,
      dropOff: 100 - metrics.signupToOnboarding,
    },
    {
      name: "Paiement initié",
      event: "payment_initiated",
      count: metrics.paymentsInitiated,
      conversionRate: metrics.onboardingToPayment,
      dropOff: 100 - metrics.onboardingToPayment,
    },
    {
      name: "Abonnement créé",
      event: "subscription_created",
      count: metrics.subscriptionsCreated,
      conversionRate: metrics.paymentToSubscription,
      dropOff: 100 - metrics.paymentToSubscription,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Funnel Analytics Dashboard
              </h1>
              <p className="text-gray-400">
                Suivi des conversions et drop-off du funnel Accessly
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                Dernière MAJ: {lastRefresh.toLocaleTimeString("fr-FR")}
              </span>
              <button
                onClick={loadData}
                className="btn-secondary text-sm px-4 py-2"
              >
                <svg
                  className="w-4 h-4 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Rafraîchir
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {funnelStages.map((stage, index) => (
            <div key={index} className="glass-card p-4">
              <div className="text-gray-400 text-sm mb-1">{stage.name}</div>
              <div className="text-2xl font-bold text-white">{stage.count}</div>
              {index > 0 && (
                <div
                  className={`text-xs mt-1 ${
                    stage.conversionRate >= 50
                      ? "text-green-400"
                      : stage.conversionRate >= 25
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {stage.conversionRate}% conversion
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Funnel Visualization */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Visualisation du Funnel
          </h2>
          <div className="space-y-4">
            {funnelStages.map((stage, index) => {
              const maxCount = Math.max(metrics.visits, 1);
              const widthPercent = (stage.count / maxCount) * 100;

              return (
                <div key={index} className="relative">
                  <div className="flex items-center mb-2">
                    <span className="w-32 text-gray-400 text-sm">{stage.name}</span>
                    <span className="text-white font-medium">{stage.count}</span>
                    {index > 0 && (
                      <span className="ml-auto text-sm">
                        <span
                          className={
                            stage.conversionRate >= 50
                              ? "text-green-400"
                              : stage.conversionRate >= 25
                              ? "text-yellow-400"
                              : "text-red-400"
                          }
                        >
                          {stage.conversionRate}%
                        </span>
                        <span className="text-gray-500 ml-2">
                          (drop: {stage.dropOff}%)
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="h-8 bg-navy-800 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-electric-500 to-electric-600 rounded-lg transition-all duration-500"
                      style={{ width: `${Math.max(widthPercent, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall Conversion */}
          <div className="mt-8 pt-6 border-t border-navy-700">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400">Conversion globale</span>
                <span className="text-sm text-gray-500 ml-2">
                  (visite → abonnement)
                </span>
              </div>
              <span className="text-2xl font-bold text-gradient">
                {metrics.overallConversion}%
              </span>
            </div>
          </div>
        </div>

        {/* First Value Benchmark */}
        <div className="glass-card p-6 mb-8 border-l-4 border-electric-500">
          <h2 className="text-xl font-semibold text-white mb-4">
            🎯 First Value Benchmark
          </h2>
          <p className="text-gray-400 mb-4">
            Objectif: Les utilisateurs atteignent leur première valeur (onboarding_completed) 
            en moins de 5 minutes après inscription.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-navy-800/60 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Inscriptions</div>
              <div className="text-2xl font-bold text-white">{metrics.signups}</div>
            </div>
            <div className="bg-navy-800/60 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Onboarding complété</div>
              <div className="text-2xl font-bold text-white">
                {metrics.onboardingCompleted}
              </div>
            </div>
            <div className="bg-navy-800/60 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Taux de complétion</div>
              <div
                className={`text-2xl font-bold ${
                  metrics.signupToOnboarding >= 70
                    ? "text-green-400"
                    : metrics.signupToOnboarding >= 40
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {metrics.signupToOnboarding}%
              </div>
            </div>
          </div>
        </div>

        {/* Test Controls */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            🧪 Contrôles de test
          </h2>
          <p className="text-gray-400 mb-4">
            Simulez des événements pour tester le dashboard
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => simulateEvent("visit")}
              className="bg-navy-700 hover:bg-navy-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              + Visite
            </button>
            <button
              onClick={() => simulateEvent("signup_completed")}
              className="bg-navy-700 hover:bg-navy-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              + Inscription
            </button>
            <button
              onClick={() => simulateEvent("onboarding_completed")}
              className="bg-navy-700 hover:bg-navy-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              + Onboarding
            </button>
            <button
              onClick={() => simulateEvent("payment_initiated")}
              className="bg-navy-700 hover:bg-navy-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              + Paiement initié
            </button>
            <button
              onClick={() => simulateEvent("subscription_created")}
              className="bg-navy-700 hover:bg-navy-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              + Abonnement
            </button>
            <button
              onClick={handleClearEvents}
              className="bg-red-900/50 hover:bg-red-900/70 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors ml-auto"
            >
              Effacer tout
            </button>
          </div>
        </div>

        {/* Recent Events */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            📋 Événements récents ({events.length})
          </h2>
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucun événement enregistré. Visitez la page d&apos;accueil ou utilisez
              les contrôles de test ci-dessus.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-navy-700">
                    <th className="pb-3 pr-4">Événement</th>
                    <th className="pb-3 pr-4">Session ID</th>
                    <th className="pb-3 pr-4">User ID</th>
                    <th className="pb-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {events
                    .slice()
                    .reverse()
                    .slice(0, 20)
                    .map((event, index) => (
                      <tr
                        key={index}
                        className="border-b border-navy-800/50 text-sm"
                      >
                        <td className="py-3 pr-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              event.event === "visit"
                                ? "bg-gray-700 text-gray-300"
                                : event.event === "signup_completed"
                                ? "bg-blue-900/50 text-blue-400"
                                : event.event === "onboarding_completed"
                                ? "bg-green-900/50 text-green-400"
                                : event.event === "payment_initiated"
                                ? "bg-yellow-900/50 text-yellow-400"
                                : "bg-purple-900/50 text-purple-400"
                            }`}
                          >
                            {event.event}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-gray-400 font-mono text-xs">
                          {event.sessionId.substring(0, 20)}...
                        </td>
                        <td className="py-3 pr-4 text-gray-400">
                          {event.userId || "-"}
                        </td>
                        <td className="py-3 text-gray-400">
                          {new Date(event.timestamp).toLocaleString("fr-FR")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Console Log Verification Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            💡 Ouvrez la console du navigateur (F12) pour voir les logs de
            vérification des événements
          </p>
        </div>
      </div>
    </div>
  );
}
