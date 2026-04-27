"use client";

import { useState, useEffect } from 'react';
import type { FunnelMetrics } from '@/lib/db';
import { FUNNEL_STEP_LABELS } from '@/lib/tracking';

interface FunnelData {
  metrics: FunnelMetrics[];
  summary: {
    total_events: number;
    overall_conversion: number;
    period_days: number;
  };
}

export default function FunnelDashboard(): React.JSX.Element {
  const [data, setData] = useState<FunnelData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<number>(30);

  useEffect(() => {
    const fetchFunnelData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/funnel?days=${period}`);
        if (!response.ok) {
          throw new Error('Failed to fetch funnel data');
        }
        const result = await response.json() as FunnelData;
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFunnelData();
  }, [period]);

  const getBarWidth = (count: number, maxCount: number): number => {
    if (maxCount === 0) return 0;
    return Math.max((count / maxCount) * 100, 5);
  };

  const getConversionColor = (rate: number): string => {
    if (rate >= 50) return 'text-green-400';
    if (rate >= 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDropOffColor = (rate: number): string => {
    if (rate <= 25) return 'text-green-400';
    if (rate <= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-8 w-8 text-cyan-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="ml-3 text-gray-400">Loading funnel data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12 text-red-400">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const maxCount = data ? Math.max(...data.metrics.map((m) => m.count)) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Conversion Funnel</h2>
          <p className="text-gray-400 text-sm mt-1">
            Track your visitor journey from first visit to subscription
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">Period:</span>
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="bg-navy-800 border border-navy-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {data && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Events</p>
                  <p className="text-2xl font-bold text-white">{data.summary.total_events.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Overall Conversion</p>
                  <p className={`text-2xl font-bold ${getConversionColor(data.summary.overall_conversion)}`}>
                    {data.summary.overall_conversion}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Subscriptions</p>
                  <p className="text-2xl font-bold text-white">
                    {data.metrics.find((m) => m.event_type === 'subscription_created')?.count || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-6">Funnel Steps</h3>
            <div className="space-y-6">
              {data.metrics.map((metric, index) => (
                <div key={metric.event_type} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {index + 1}
                      </span>
                      <span className="text-white font-medium">
                        {FUNNEL_STEP_LABELS[metric.event_type]}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <span className="text-white font-bold">{metric.count.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm ml-1">users</span>
                      </div>
                      {index > 0 && (
                        <>
                          <div className="text-right w-24">
                            <span className={`font-semibold ${getConversionColor(metric.conversion_rate)}`}>
                              {metric.conversion_rate}%
                            </span>
                            <span className="text-gray-500 text-xs block">conversion</span>
                          </div>
                          <div className="text-right w-24">
                            <span className={`font-semibold ${getDropOffColor(metric.drop_off_rate)}`}>
                              {metric.drop_off_rate}%
                            </span>
                            <span className="text-gray-500 text-xs block">drop-off</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="ml-11">
                    <div className="h-3 bg-navy-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${getBarWidth(metric.count, maxCount)}%` }}
                      />
                    </div>
                  </div>
                  {index < data.metrics.length - 1 && (
                    <div className="absolute left-4 top-10 w-0.5 h-8 bg-navy-700" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Drop-off Analysis</h3>
            <div className="space-y-4">
              {data.metrics.slice(1).map((metric, index) => {
                const previousStep = data.metrics[index];
                const dropOff = previousStep.count - metric.count;
                return (
                  <div key={metric.event_type} className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg">
                    <div className="flex items-center">
                      <svg className={`w-5 h-5 mr-3 ${getDropOffColor(metric.drop_off_rate)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      <div>
                        <p className="text-white font-medium">
                          {FUNNEL_STEP_LABELS[previousStep.event_type]} → {FUNNEL_STEP_LABELS[metric.event_type]}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {dropOff.toLocaleString()} users dropped off
                        </p>
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${getDropOffColor(metric.drop_off_rate)}`}>
                      -{metric.drop_off_rate}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Insight: Top UX Blockers Addressed</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">1.</span>
                    <span><strong>Signup Friction Reduced:</strong> Two-step signup with social login options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">2.</span>
                    <span><strong>Onboarding Value Clarified:</strong> Clear first-value goal (5-min setup)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">3.</span>
                    <span><strong>Payment Friction Reduced:</strong> Free trial messaging, no CC required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
