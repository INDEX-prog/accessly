"use client";

import { useState } from 'react';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 19,
    description: 'Perfect for solo creators just getting started',
    features: [
      'Up to 100 subscribers',
      '3 access links',
      'Basic analytics',
      'Email support',
      'Standard checkout',
    ],
    highlighted: false,
    cta: 'Start Free Trial',
  },
  {
    name: 'Pro',
    price: 49,
    description: 'For growing creators who need more power',
    features: [
      'Up to 1,000 subscribers',
      'Unlimited access links',
      'Advanced analytics & funnel',
      'Priority support',
      'Custom branding',
      'API access',
      'Membership tiers',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Team',
    price: 99,
    description: 'For teams and established creators',
    features: [
      'Unlimited subscribers',
      'Unlimited everything',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Team collaboration',
      'Advanced security',
    ],
    highlighted: false,
    cta: 'Contact Sales',
  },
];

export default function Pricing(): React.JSX.Element {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  const getPrice = (monthlyPrice: number): number => {
    return isAnnual ? Math.round(monthlyPrice * 0.8) : monthlyPrice;
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/30 to-navy-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          <div className="inline-flex items-center bg-navy-800/50 rounded-full p-1 border border-navy-700">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-1 text-xs text-cyan-300">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-cyan-500/20 to-navy-800/50 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-navy-800/50 border border-navy-700 hover:border-cyan-500/50'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-cyan-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">${getPrice(tier.price)}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                {isAnnual && (
                  <p className="text-cyan-400 text-sm mt-2">
                    Billed annually (${getPrice(tier.price) * 12}/year)
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  tier.highlighted
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-navy-700 hover:bg-navy-600 text-white border border-navy-600'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-cyan-400 text-sm mt-2">
            Pricing being validated through market testing
          </p>
        </div>
      </div>
    </section>
  );
}
