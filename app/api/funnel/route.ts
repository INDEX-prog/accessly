import { NextResponse } from 'next/server';
import { db, initDatabase } from '@/lib/db';
import type { FunnelEventType, FunnelMetrics } from '@/lib/db';

const FUNNEL_ORDER: FunnelEventType[] = [
  'visit',
  'signup_completed',
  'onboarding_completed',
  'payment_initiated',
  'subscription_created',
];

interface EventCount {
  event_type: string;
  count: number;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    await initDatabase();
    
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);
    
    const dateFilter = new Date();
    dateFilter.setDate(dateFilter.getDate() - days);
    
    const result = await db.execute({
      sql: `
        SELECT event_type, COUNT(DISTINCT session_id) as count 
        FROM funnel_events 
        WHERE datetime(timestamp) >= datetime(?)
        GROUP BY event_type
      `,
      args: [dateFilter.toISOString()],
    });
    
    const eventCounts: Record<string, number> = {};
    (result.rows as unknown as EventCount[]).forEach((row) => {
      eventCounts[row.event_type] = Number(row.count);
    });
    
    const metrics: FunnelMetrics[] = FUNNEL_ORDER.map((eventType, index) => {
      const count = eventCounts[eventType] || 0;
      const previousCount = index === 0 ? count : (eventCounts[FUNNEL_ORDER[index - 1]] || 0);
      
      const conversionRate = previousCount > 0 ? (count / previousCount) * 100 : 0;
      const dropOffRate = 100 - conversionRate;
      
      return {
        event_type: eventType,
        count,
        conversion_rate: Math.round(conversionRate * 100) / 100,
        drop_off_rate: index === 0 ? 0 : Math.round(dropOffRate * 100) / 100,
      };
    });
    
    const totalResult = await db.execute({
      sql: `SELECT COUNT(*) as total FROM funnel_events WHERE datetime(timestamp) >= datetime(?)`,
      args: [dateFilter.toISOString()],
    });
    
    const totalEvents = Number((totalResult.rows[0] as unknown as { total: number }).total) || 0;
    
    const overallConversion = metrics[0].count > 0 
      ? ((metrics[metrics.length - 1].count / metrics[0].count) * 100).toFixed(2)
      : '0';
    
    return NextResponse.json({
      metrics,
      summary: {
        total_events: totalEvents,
        overall_conversion: parseFloat(overallConversion),
        period_days: days,
      },
    });
  } catch (error) {
    console.error('Error fetching funnel metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch funnel metrics' },
      { status: 500 }
    );
  }
}
