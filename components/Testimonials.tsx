"use client";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Course Creator',
    content: 'Accessly transformed how I manage my online courses. Setup took literally 3 minutes, and my conversion rate jumped 40% in the first month!',
    avatar: 'SC',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Newsletter Publisher',
    content: 'Finally, a subscription tool that just works. The analytics dashboard helps me understand exactly where readers drop off. Game changer!',
    avatar: 'MJ',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Podcast Host',
    content: 'I switched from a clunky old system to Accessly. My premium podcast subscribers doubled because the checkout process is so smooth.',
    avatar: 'ER',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Community Manager',
    content: 'Managing 5 different membership tiers used to be a nightmare. Now it takes seconds. The team tier features are incredibly powerful.',
    avatar: 'DK',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Digital Artist',
    content: 'As someone who hates dealing with tech, Accessly is a dream. I focus on creating art while it handles all the subscription stuff.',
    avatar: 'LT',
    rating: 5,
  },
  {
    name: 'Alex Rivera',
    role: 'Fitness Coach',
    content: 'The funnel analytics showed me exactly why people weren\'t completing signup. Fixed those issues and revenue went up 60%!',
    avatar: 'AR',
    rating: 5,
  },
];

export default function Testimonials(): React.JSX.Element {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by
            <span className="gradient-text"> Content Creators</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join hundreds of creators who have transformed their subscription business with Accessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-12 opacity-50">
          <div className="text-2xl font-bold text-gray-500">ProductHunt</div>
          <div className="text-2xl font-bold text-gray-500">TechCrunch</div>
          <div className="text-2xl font-bold text-gray-500">Forbes</div>
          <div className="text-2xl font-bold text-gray-500">The Verge</div>
        </div>
      </div>
    </section>
  );
}
