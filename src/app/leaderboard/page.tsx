'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trophy, TrendingUp, Clock, Filter } from 'lucide-react'
import PrizeProgress from '@/components/ui/PrizeProgress'
import { FLAVOR_CATEGORIES } from '@/lib/types'

// Mock data for demo
const mockTopDonuts = [
  { id: '1', name: 'Original Glazed', slug: 'original-glazed', vote_count: 12847, shop_name: 'Krispy Kreme', state_code: 'NC', flavor_category: 'glazed' },
  { id: '2', name: 'Bacon Maple Bar', slug: 'bacon-maple-bar', vote_count: 11234, shop_name: 'Voodoo Doughnut', state_code: 'OR', flavor_category: 'gourmet' },
  { id: '3', name: 'Boston Cream', slug: 'boston-cream', vote_count: 9876, shop_name: "Dunkin'", state_code: 'MA', flavor_category: 'filled' },
  { id: '4', name: 'Apple Fritter', slug: 'apple-fritter', vote_count: 8543, shop_name: 'Sidecar Doughnuts', state_code: 'CA', flavor_category: 'cake' },
  { id: '5', name: 'Cronut', slug: 'cronut', vote_count: 7891, shop_name: 'Dominique Ansel', state_code: 'NY', flavor_category: 'cronut' },
  { id: '6', name: 'Maple Long John', slug: 'maple-long-john', vote_count: 7234, shop_name: "Stan's Donuts", state_code: 'IL', flavor_category: 'glazed' },
  { id: '7', name: 'Jelly Donut', slug: 'jelly-donut', vote_count: 6987, shop_name: "Dunkin'", state_code: 'MA', flavor_category: 'filled' },
  { id: '8', name: 'Chocolate Cake', slug: 'chocolate-cake', vote_count: 6543, shop_name: 'Top Pot', state_code: 'WA', flavor_category: 'cake' },
  { id: '9', name: 'Cruller', slug: 'cruller', vote_count: 6234, shop_name: 'Doughnut Plant', state_code: 'NY', flavor_category: 'other' },
  { id: '10', name: 'Vegan Chocolate', slug: 'vegan-chocolate', vote_count: 5876, shop_name: 'Donut Friend', state_code: 'CA', flavor_category: 'vegan' },
]

const mockTopShops = [
  { id: '1', name: 'Krispy Kreme', slug: 'krispy-kreme', city: 'Winston-Salem', state_code: 'NC', vote_count: 34521, is_chain: true },
  { id: '2', name: 'Voodoo Doughnut', slug: 'voodoo-doughnut', city: 'Portland', state_code: 'OR', vote_count: 28934, is_chain: true },
  { id: '3', name: "Dunkin'", slug: 'dunkin', city: 'Canton', state_code: 'MA', vote_count: 26789, is_chain: true },
  { id: '4', name: 'Sidecar Doughnuts', slug: 'sidecar-doughnuts', city: 'Costa Mesa', state_code: 'CA', vote_count: 15432, is_chain: false },
  { id: '5', name: 'Federal Donuts', slug: 'federal-donuts', city: 'Philadelphia', state_code: 'PA', vote_count: 12876, is_chain: false },
  { id: '6', name: "Stan's Donuts", slug: 'stans-donuts', city: 'Chicago', state_code: 'IL', vote_count: 11234, is_chain: false },
  { id: '7', name: 'Top Pot Doughnuts', slug: 'top-pot', city: 'Seattle', state_code: 'WA', vote_count: 10987, is_chain: false },
  { id: '8', name: 'Doughnut Plant', slug: 'doughnut-plant', city: 'New York', state_code: 'NY', vote_count: 9876, is_chain: false },
  { id: '9', name: 'Donut Friend', slug: 'donut-friend', city: 'Los Angeles', state_code: 'CA', vote_count: 8765, is_chain: false },
  { id: '10', name: 'Dominique Ansel', slug: 'dominique-ansel', city: 'New York', state_code: 'NY', vote_count: 7654, is_chain: false },
]

const mockTotalVotes = 47823

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'donuts' | 'shops'>('donuts')
  const [flavorFilter, setFlavorFilter] = useState<string | null>(null)

  const getRankBadge = (index: number) => {
    if (index === 0) return 'rank-gold'
    if (index === 1) return 'rank-silver'
    if (index === 2) return 'rank-bronze'
    return 'bg-muted text-foreground/60'
  }

  const filteredDonuts = flavorFilter
    ? mockTopDonuts.filter(d => d.flavor_category === flavorFilter)
    : mockTopDonuts

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-donut-pink to-donut-glaze py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              National Leaderboard
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Real-time rankings across all 50 states. Updated live as votes come in!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prize Progress */}
        <div className="max-w-2xl mx-auto mb-8 -mt-12">
          <PrizeProgress initialCount={mockTotalVotes} />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg border border-border">
            <button
              onClick={() => setActiveTab('donuts')}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'donuts'
                  ? 'bg-donut-pink text-white'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              🍩 Top Donuts
            </button>
            <button
              onClick={() => setActiveTab('shops')}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'shops'
                  ? 'bg-donut-chocolate text-white'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              🏪 Top Shops
            </button>
          </div>
        </div>

        {/* Flavor Filter (Donuts only) */}
        {activeTab === 'donuts' && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setFlavorFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                flavorFilter === null
                  ? 'bg-donut-pink text-white'
                  : 'bg-white text-foreground/60 hover:bg-muted border border-border'
              }`}
            >
              All Flavors
            </button>
            {FLAVOR_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFlavorFilter(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  flavorFilter === cat.value
                    ? 'bg-donut-pink text-white'
                    : 'bg-white text-foreground/60 hover:bg-muted border border-border'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Leaderboard List */}
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-donut-chocolate/10 to-donut-pink/10 px-6 py-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2 text-foreground/60">
              <Filter className="w-4 h-4" />
              <span className="text-sm">
                Showing top {activeTab === 'donuts' ? filteredDonuts.length : mockTopShops.length} {activeTab}
              </span>
            </div>
            <div className="flex items-center gap-1 text-donut-sprinkles-green text-sm font-medium">
              <Clock className="w-4 h-4" />
              Live Updates
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-border">
            {activeTab === 'donuts' ? (
              filteredDonuts.map((donut, index) => (
                <Link
                  key={donut.id}
                  href={`/donut/${donut.slug}`}
                  className="donut-card flex items-center gap-4 p-4 md:p-6 hover:bg-muted/50 transition-colors"
                >
                  {/* Rank */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadge(index)}`}
                  >
                    {index + 1}
                  </div>

                  {/* Image */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-muted flex items-center justify-center text-3xl flex-shrink-0">
                    🍩
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-foreground truncate">{donut.name}</h4>
                    <p className="text-sm text-foreground/60 truncate">
                      {donut.shop_name} • {donut.state_code}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-muted rounded-full text-xs text-foreground/60">
                      {FLAVOR_CATEGORIES.find(c => c.value === donut.flavor_category)?.emoji}{' '}
                      {FLAVOR_CATEGORIES.find(c => c.value === donut.flavor_category)?.label}
                    </span>
                  </div>

                  {/* Vote count */}
                  <div className="text-right">
                    <div className="font-bold text-xl md:text-2xl text-donut-pink counter-value">
                      {donut.vote_count.toLocaleString()}
                    </div>
                    <div className="text-xs text-foreground/50">votes</div>
                    {index < 3 && (
                      <div className="flex items-center gap-1 justify-end mt-1 text-donut-sprinkles-green text-xs">
                        <TrendingUp className="w-3 h-3" />
                        Rising
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              mockTopShops.map((shop, index) => (
                <Link
                  key={shop.id}
                  href={`/shop/${shop.slug}`}
                  className="donut-card flex items-center gap-4 p-4 md:p-6 hover:bg-muted/50 transition-colors"
                >
                  {/* Rank */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadge(index)}`}
                  >
                    {index + 1}
                  </div>

                  {/* Image */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-muted flex items-center justify-center text-3xl flex-shrink-0">
                    🏪
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-foreground truncate">{shop.name}</h4>
                    <p className="text-sm text-foreground/60 truncate">
                      {shop.city}, {shop.state_code}
                    </p>
                    {shop.is_chain && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-donut-sprinkles-blue/20 text-donut-sprinkles-blue rounded-full text-xs">
                        🔗 National Chain
                      </span>
                    )}
                  </div>

                  {/* Vote count */}
                  <div className="text-right">
                    <div className="font-bold text-xl md:text-2xl text-donut-chocolate counter-value">
                      {shop.vote_count.toLocaleString()}
                    </div>
                    <div className="text-xs text-foreground/50">votes</div>
                    {index < 3 && (
                      <div className="flex items-center gap-1 justify-end mt-1 text-donut-sprinkles-green text-xs">
                        <TrendingUp className="w-3 h-3" />
                        Rising
                      </div>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-white text-donut-pink border-2 border-donut-pink rounded-full font-semibold hover:bg-donut-pink hover:text-white transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}
