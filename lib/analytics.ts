// Analytics Event Types for Accessly Funnel Tracking
// Canonical events: visit, signup_completed, onboarding_completed, payment_initiated, subscription_created

export type FunnelEvent =
  | "visit"
  | "signup_completed"
  | "onboarding_completed"
  | "payment_initiated"
  | "subscription_created";

export interface AnalyticsEvent {
  event: FunnelEvent;
  timestamp: number;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, string | number | boolean>;
}

// Generate a simple session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// Get or create session ID from localStorage
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let sessionId = localStorage.getItem("accessly_session_id");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("accessly_session_id", sessionId);
  }
  return sessionId;
}

// Track an analytics event
export function trackEvent(
  event: FunnelEvent,
  userId?: string,
  metadata?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;

  const analyticsEvent: AnalyticsEvent = {
    event,
    timestamp: Date.now(),
    sessionId: getSessionId(),
    userId,
    metadata,
  };

  // Store event in localStorage for the dashboard
  const events = getStoredEvents();
  events.push(analyticsEvent);
  localStorage.setItem("accessly_analytics_events", JSON.stringify(events));

  // Log to console for verification
  console.log(`[Accessly Analytics] Event tracked:`, analyticsEvent);
}

// Get all stored events
export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem("accessly_analytics_events");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Clear all events (for testing)
export function clearEvents(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessly_analytics_events");
}

// Calculate funnel metrics
export interface FunnelMetrics {
  visits: number;
  signups: number;
  onboardingCompleted: number;
  paymentsInitiated: number;
  subscriptionsCreated: number;
  visitToSignup: number;
  signupToOnboarding: number;
  onboardingToPayment: number;
  paymentToSubscription: number;
  overallConversion: number;
}

export function calculateFunnelMetrics(events: AnalyticsEvent[]): FunnelMetrics {
  const visits = events.filter((e) => e.event === "visit").length;
  const signups = events.filter((e) => e.event === "signup_completed").length;
  const onboardingCompleted = events.filter((e) => e.event === "onboarding_completed").length;
  const paymentsInitiated = events.filter((e) => e.event === "payment_initiated").length;
  const subscriptionsCreated = events.filter((e) => e.event === "subscription_created").length;

  const safePercent = (num: number, denom: number): number => {
    if (denom === 0) return 0;
    return Math.round((num / denom) * 100);
  };

  return {
    visits,
    signups,
    onboardingCompleted,
    paymentsInitiated,
    subscriptionsCreated,
    visitToSignup: safePercent(signups, visits),
    signupToOnboarding: safePercent(onboardingCompleted, signups),
    onboardingToPayment: safePercent(paymentsInitiated, onboardingCompleted),
    paymentToSubscription: safePercent(subscriptionsCreated, paymentsInitiated),
    overallConversion: safePercent(subscriptionsCreated, visits),
  };
}
