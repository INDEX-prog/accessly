import { NextResponse } from 'next/server';
import { db, initDatabase } from '@/lib/db';
import type { FunnelEvent, FunnelEventType } from '@/lib/db';

const VALID_EVENT_TYPES: FunnelEventType[] = [
  'visit',
  'signup_completed',
  'onboarding_completed',
  'payment_initiated',
  'subscription_created',
];

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await initDatabase();
    
    const body = await request.json() as FunnelEvent;
    
    if (!body.event_type || !body.session_id) {
      return NextResponse.json(
        { error: 'Missing required fields: event_type and session_id' },
        { status: 400 }
      );
    }
    
    if (!VALID_EVENT_TYPES.includes(body.event_type)) {
      return NextResponse.json(
        { error: 'Invalid event_type' },
        { status: 400 }
      );
    }
    
    await db.execute({
      sql: `INSERT INTO funnel_events (event_type, session_id, user_id, metadata) VALUES (?, ?, ?, ?)`,
      args: [
        body.event_type,
        body.session_id,
        body.user_id || null,
        body.metadata || null,
      ],
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    await initDatabase();
    
    const result = await db.execute(`
      SELECT event_type, COUNT(*) as count 
      FROM funnel_events 
      GROUP BY event_type
    `);
    
    return NextResponse.json({ events: result.rows });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
