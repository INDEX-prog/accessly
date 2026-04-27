import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function initDatabase(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS funnel_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      session_id TEXT NOT NULL,
      user_id TEXT,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      metadata TEXT
    )
  `);
  
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_event_type ON funnel_events(event_type)
  `);
  
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_timestamp ON funnel_events(timestamp)
  `);
}

export type FunnelEventType = 
  | 'visit' 
  | 'signup_completed' 
  | 'onboarding_completed' 
  | 'payment_initiated' 
  | 'subscription_created';

export interface FunnelEvent {
  id?: number;
  event_type: FunnelEventType;
  session_id: string;
  user_id?: string;
  timestamp?: string;
  metadata?: string;
}

export interface FunnelMetrics {
  event_type: FunnelEventType;
  count: number;
  conversion_rate: number;
  drop_off_rate: number;
}
