import Link from 'next/link'
import { ArrowRight, Trophy, MapPin, Gift, Users, TrendingUp, Clock } from 'lucide-react'
import PrizeProgress from '@/components/ui/PrizeProgress'
import { US_STATES } from '@/lib/types'

// Mock data for demo - in production, fetch from Supabase
const mockTopDonuts = [
  { id: '1', name: 'Original Glazed', slug: 'original-glazed', vote_count: 12847, shop_name: 'Krispy Kreme', image_url: null },
  { id: '2', name: 'Bacon Maple Bar', slug: 'bacon-maple-bar', vote_count: 11234, shop_name: 'Voodoo Doughnut', image_url: null },
  { id: '3', name: 'Boston Cream', slug: 'boston-cream', vote_count: 9876, shop_name: "Dunkin'", image_url: null },
  { id: '4', name: 'Apple Fritter', slug: 'apple-fritter', vote_count: 8543, shop_name: 'Sidecar Doughnuts', image_url: null },
  { id: '5', name: 'Cronut', slug: 'cronut', vote_count: 7891, shop_name: 'Dominique Ansel', image_url: null },
]

const mockTopShops = [
  { id: '1', name: 'Krispy Kreme', slug: 'krispy-kreme', city: 'Winston-Salem', state_code: 'NC', vote_count: 34521, is_chain: true },
  { id: '2', name: 'Voodoo Doughnut', slug: 'voodoo-doughnut', city: 'Portland', state_code: 'OR', vote_count: 28934, is_chain: true },
  { id: '3', name: "Dunkin'", slug: 'dunkin', city: 'Canton', state_code: 'MA', vote_count: 26789, is_chain: true },
  { id: '4', name: 'Sidecar Doughnuts', slug: 'sidecar-doughnuts', city: 'Costa Mesa', state_code: 'CA', vote_count: 15432, is_chain: false },
  { id: '5', name: 'Federal Donuts', slug: 'federal-donuts', city: 'Philadelphia', state_code: 'PA', vote_count: 12876, is_chain: false },
]

const mockTotalVotes = 47823

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden sprinkles-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-donut-chocolate mb-6">
              <span className="text-5xl md:text-7xl lg:text-8xl">🍩</span>
              <br />
              America&apos;s Favorite Donut
              <br />
              <span className="text-donut-pink">Decided by You</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Vote for your favorite donuts and shops across all 50 states. 
              <span className="text-donut-pink font-semibold"> Every 2,000th vote wins a $5 DoorDash gift card!</span>
            </p>

            {/* Prize Progress Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <PrizeProgress initialCount={mockTotalVotes} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/vote"
                className="w-full sm:w-auto px-8 py-4 bg-donut-pink text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-colors vote-btn flex items-center justify-center gap-2"
              >
                Cast Your Vote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/leaderboard"
                className="w-full sm:w-auto px-8 py-4 bg-white text-donut-pink border-2 border-donut-pink rounded-full font-bold text-lg hover:bg-donut-pink hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-donut-pink counter-value">
                {mockTotalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-foreground/60">Total Votes Cast</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-donut-chocolate">
                1,247
              </div>
              <div className="text-sm text-foreground/60">Donuts Ranked</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-donut-sprinkles-blue">
                893
              </div>
              <div className="text-sm text-foreground/60">Shops Listed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-donut-sprinkles-green">
                $120
              </div>
              <div className="text-sm text-foreground/60">Prizes Awarded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-donut-chocolate mb-4">
              🏆 Live Leaderboards
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Real-time rankings updated as votes come in. Watch your favorites climb!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Donuts */}
            <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-donut-pink to-donut-glaze px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  🍩 Top Donuts
                </h3>
                <span className="flex items-center gap-1 text-white/80 text-sm">
                  <Clock className="w-4 h-4" />
                  Live
                </span>
              </div>
              <div className="divide-y divide-border">
                {mockTopDonuts.map((donut, index) => (
                  <Link
                    key={donut.id}
                    href={`/donut/${donut.slug}`}
                    className="donut-card flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'bg-muted text-foreground/60'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      🍩
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{donut.name}</h4>
                      <p className="text-sm text-foreground/60 truncate">{donut.shop_name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-donut-pink counter-value">
                        {donut.vote_count.toLocaleString()}
                      </div>
                      <div className="text-xs text-foreground/50">votes</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/leaderboard?tab=donuts"
                className="flex items-center justify-center gap-2 p-4 bg-muted hover:bg-muted/80 transition-colors text-donut-pink font-semibold"
              >
                View All 50 Donuts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Top Shops */}
            <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-donut-chocolate to-donut-glaze px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  🏪 Top Shops
                </h3>
                <span className="flex items-center gap-1 text-white/80 text-sm">
                  <Clock className="w-4 h-4" />
                  Live
                </span>
              </div>
              <div className="divide-y divide-border">
                {mockTopShops.map((shop, index) => (
                  <Link
                    key={shop.id}
                    href={`/shop/${shop.slug}`}
                    className="donut-card flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'bg-muted text-foreground/60'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      🏪
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{shop.name}</h4>
                      <p className="text-sm text-foreground/60 truncate">
                        {shop.city}, {shop.state_code}
                        {shop.is_chain && <span className="ml-2 text-donut-sprinkles-blue">• Chain</span>}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-donut-chocolate counter-value">
                        {shop.vote_count.toLocaleString()}
                      </div>
                      <div className="text-xs text-foreground/50">votes</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/leaderboard?tab=shops"
                className="flex items-center justify-center gap-2 p-4 bg-muted hover:bg-muted/80 transition-colors text-donut-chocolate font-semibold"
              >
                View All 50 Shops
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* State Voting Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-donut-chocolate mb-4">
              🗺️ Vote by State
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              See who&apos;s winning in your state. Local pride, national glory!
            </p>
          </div>

          {/* State Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {US_STATES.map((state) => (
              <Link
                key={state.code}
                href={`/state/${state.code.toLowerCase()}`}
                className="bg-white rounded-lg p-3 text-center hover:bg-donut-pink hover:text-white transition-colors group border border-border"
              >
                <div className="font-bold text-lg group-hover:scale-110 transition-transform">
                  {state.code}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-donut-chocolate mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-donut-pink-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-donut-pink" />
              </div>
              <h3 className="text-xl font-bold text-donut-chocolate mb-2">1. Sign Up Free</h3>
              <p className="text-foreground/60">
                Create an account with email or Google. One vote per day to keep it fair.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-donut-sprinkles-yellow/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-donut-glaze" />
              </div>
              <h3 className="text-xl font-bold text-donut-chocolate mb-2">2. Vote Daily</h3>
              <p className="text-foreground/60">
                Pick your favorite donut or shop. Watch the leaderboards update in real-time!
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-donut-sprinkles-green/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-donut-sprinkles-green" />
              </div>
              <h3 className="text-xl font-bold text-donut-chocolate mb-2">3. Win Prizes</h3>
              <p className="text-foreground/60">
                Every 2,000th vote wins a $5 DoorDash gift card. Order yourself some donuts! 🍩
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-donut-pink to-donut-glaze">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Crown America&apos;s Best Donut?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Your vote matters. The next $5 winner could be you!
          </p>
          <Link
            href="/vote"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-donut-pink rounded-full font-bold text-xl hover:bg-donut-cream transition-colors vote-btn"
          >
            🍩 Vote Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
