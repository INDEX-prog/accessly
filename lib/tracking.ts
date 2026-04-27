import type { FunnelEventType } from './db';

export function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('accessly_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('accessly_session_id', sessionId);
  }
  return sessionId;
}

export async function trackEvent(
  eventType: FunnelEventType,
  userId?: string,
  metadata?: Record<string, unknown>
): Promise<boolean> {
  try {
    const sessionId = getSessionId();
    
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        session_id: sessionId,
        user_id: userId,
        metadata: metadata ? JSON.stringify(metadata) : null,
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to track event:', error);
    return false;
  }
}

export const FUNNEL_STEPS: FunnelEventType[] = [
  'visit',
  'signup_completed',
  'onboarding_completed',
  'payment_initiated',
  'subscription_created',
];

export const FUNNEL_STEP_LABELS: Record<FunnelEventType, string> = {
  visit: 'Visit',
  signup_completed: 'Signup',
  onboarding_completed: 'Onboarding',
  payment_initiated: 'Payment Started',
  subscription_created: 'Subscribed',
};
