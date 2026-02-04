import Link from 'next/link'
import { ArrowRight, Trophy, MapPin, Gift, Users, TrendingUp, Clock, Zap, Star } from 'lucide-react'
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
            {/* Big donut emoji with glow */}
            <div className="relative inline-block mb-6">
              <span className="text-7xl md:text-8xl lg:text-9xl animate-bounce">🍩</span>
              <div className="absolute -inset-4 bg-donut-pink/20 blur-3xl rounded-full -z-10"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
              America&apos;s Favorite Donut
              <br />
              <span className="gradient-text">Decided by You</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              Vote for your favorite donuts and shops across all 50 states. 
              <span className="text-donut-sprinkles-yellow font-semibold"> Every 2,000th vote wins a $5 DoorDash gift card! 🎁</span>
            </p>

            {/* Prize Progress Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <PrizeProgress initialCount={mockTotalVotes} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/vote"
                className="w-full sm:w-auto px-8 py-4 bg-donut-pink text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-all vote-btn flex items-center justify-center gap-2 glow-pink"
              >
                🗳️ Cast Your Vote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/leaderboard"
                className="w-full sm:w-auto px-8 py-4 bg-bg-card text-donut-sprinkles-blue border border-border rounded-full font-bold text-lg hover:border-donut-sprinkles-blue transition-all flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent"></div>
      </section>

      {/* Stats Bar */}
      <section className="bg-bg-secondary py-8 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-bg-card border border-border">
              <div className="text-3xl md:text-4xl font-bold text-donut-pink counter-value">
                {mockTotalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-text-muted">Total Votes 🗳️</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-card border border-border">
              <div className="text-3xl md:text-4xl font-bold text-donut-sprinkles-blue">
                1,247
              </div>
              <div className="text-sm text-text-muted">Donuts Ranked 🍩</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-card border border-border">
              <div className="text-3xl md:text-4xl font-bold text-donut-glaze">
                893
              </div>
              <div className="text-sm text-text-muted">Shops Listed 🏪</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-card border border-border">
              <div className="text-3xl md:text-4xl font-bold text-donut-sprinkles-green">
                $120
              </div>
              <div className="text-sm text-text-muted">Prizes Awarded 💰</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              🏆 Live Leaderboards
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Real-time rankings updated as votes come in. Watch your favorites climb!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Donuts */}
            <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-donut-pink/20 to-donut-glaze/20 px-6 py-4 flex items-center justify-between border-b border-border">
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  🍩 Top Donuts
                </h3>
                <span className="flex items-center gap-1 text-donut-sprinkles-green text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Live
                </span>
              </div>
              <div className="divide-y divide-border">
                {mockTopDonuts.map((donut, index) => (
                  <Link
                    key={donut.id}
                    href={`/donut/${donut.slug}`}
                    className="donut-card flex items-center gap-4 p-4 hover:bg-bg-card transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'bg-bg-card text-text-muted'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-bg-card flex items-center justify-center text-2xl border border-border">
                      🍩
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary truncate">{donut.name}</h4>
                      <p className="text-sm text-text-muted truncate">{donut.shop_name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-donut-pink counter-value">
                        {donut.vote_count.toLocaleString()}
                      </div>
                      <div className="text-xs text-text-muted">votes</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/leaderboard?tab=donuts"
                className="flex items-center justify-center gap-2 p-4 bg-bg-card hover:bg-border/50 transition-colors text-donut-pink font-semibold border-t border-border"
              >
                View All 50 Donuts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Top Shops */}
            <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-donut-glaze/20 to-donut-sprinkles-blue/20 px-6 py-4 flex items-center justify-between border-b border-border">
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  🏪 Top Shops
                </h3>
                <span className="flex items-center gap-1 text-donut-sprinkles-green text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Live
                </span>
              </div>
              <div className="divide-y divide-border">
                {mockTopShops.map((shop, index) => (
                  <Link
                    key={shop.id}
                    href={`/shop/${shop.slug}`}
                    className="donut-card flex items-center gap-4 p-4 hover:bg-bg-card transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'bg-bg-card text-text-muted'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-bg-card flex items-center justify-center text-2xl border border-border">
                      🏪
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary truncate">{shop.name}</h4>
                      <p className="text-sm text-text-muted truncate">
                        {shop.city}, {shop.state_code}
                        {shop.is_chain && <span className="ml-2 text-donut-sprinkles-blue">• Chain</span>}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-donut-glaze counter-value">
                        {shop.vote_count.toLocaleString()}
                      </div>
                      <div className="text-xs text-text-muted">votes</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/leaderboard?tab=shops"
                className="flex items-center justify-center gap-2 p-4 bg-bg-card hover:bg-border/50 transition-colors text-donut-glaze font-semibold border-t border-border"
              >
                View All 50 Shops
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* State Voting Section */}
      <section className="py-16 bg-bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              🗺️ Vote by State
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              See who&apos;s winning in your state. Local pride, national glory!
            </p>
          </div>

          {/* State Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {US_STATES.map((state) => (
              <Link
                key={state.code}
                href={`/state/${state.code.toLowerCase()}`}
                className="state-card bg-bg-card rounded-lg p-3 text-center hover:bg-donut-pink/20 transition-all group border border-border"
              >
                <div className="font-bold text-lg text-text-secondary group-hover:text-donut-pink transition-colors">
                  {state.code}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How It Works 🎯
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-bg-secondary border border-border">
              <div className="w-20 h-20 bg-donut-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-donut-pink/30">
                <Users className="w-10 h-10 text-donut-pink" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">1. Sign Up Free</h3>
              <p className="text-text-muted">
                Create an account with email or Google. One vote per day to keep it fair.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-bg-secondary border border-border">
              <div className="w-20 h-20 bg-donut-sprinkles-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-donut-sprinkles-blue/30">
                <TrendingUp className="w-10 h-10 text-donut-sprinkles-blue" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">2. Vote Daily</h3>
              <p className="text-text-muted">
                Pick your favorite donut or shop. Watch the leaderboards update in real-time!
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-bg-secondary border border-border">
              <div className="w-20 h-20 bg-donut-sprinkles-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-donut-sprinkles-green/30">
                <Gift className="w-10 h-10 text-donut-sprinkles-green" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">3. Win Prizes</h3>
              <p className="text-text-muted">
                Every 2,000th vote wins a $5 DoorDash gift card. Order yourself some donuts! 🍩
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-donut-pink/20 via-donut-glaze/20 to-donut-sprinkles-yellow/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Star className="w-12 h-12 text-donut-sprinkles-yellow mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Ready to Crown America&apos;s Best Donut? 👑
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Your vote matters. The next $5 winner could be you!
          </p>
          <Link
            href="/vote"
            className="inline-flex items-center gap-2 px-10 py-5 bg-donut-pink text-white rounded-full font-bold text-xl hover:bg-primary-dark transition-all vote-btn glow-pink"
          >
            🍩 Vote Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
