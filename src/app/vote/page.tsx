'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Heart, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import PrizeProgress from '@/components/ui/PrizeProgress'
import { FLAVOR_CATEGORIES } from '@/lib/types'

// Mock data for demo
const mockDonuts = [
  { id: '1', name: 'Original Glazed', slug: 'original-glazed', shop: 'Krispy Kreme', state: 'NC', votes: 12847, flavor: 'glazed' },
  { id: '2', name: 'Bacon Maple Bar', slug: 'bacon-maple-bar', shop: 'Voodoo Doughnut', state: 'OR', votes: 11234, flavor: 'gourmet' },
  { id: '3', name: 'Boston Cream', slug: 'boston-cream', shop: "Dunkin'", state: 'MA', votes: 9876, flavor: 'filled' },
  { id: '4', name: 'Apple Fritter', slug: 'apple-fritter', shop: 'Sidecar Doughnuts', state: 'CA', votes: 8543, flavor: 'cake' },
  { id: '5', name: 'Cronut', slug: 'cronut', shop: 'Dominique Ansel', state: 'NY', votes: 7891, flavor: 'cronut' },
  { id: '6', name: 'Maple Long John', slug: 'maple-long-john', shop: "Stan's Donuts", state: 'IL', votes: 7234, flavor: 'glazed' },
  { id: '7', name: 'Strawberry Frosted', slug: 'strawberry-frosted', shop: "Dunkin'", state: 'MA', votes: 6543, flavor: 'glazed' },
  { id: '8', name: 'Chocolate Cake', slug: 'chocolate-cake', shop: 'Top Pot', state: 'WA', votes: 5876, flavor: 'cake' },
]

const mockShops = [
  { id: '1', name: 'Krispy Kreme', slug: 'krispy-kreme', city: 'Winston-Salem', state: 'NC', votes: 34521 },
  { id: '2', name: 'Voodoo Doughnut', slug: 'voodoo-doughnut', city: 'Portland', state: 'OR', votes: 28934 },
  { id: '3', name: "Dunkin'", slug: 'dunkin', city: 'Canton', state: 'MA', votes: 26789 },
  { id: '4', name: 'Sidecar Doughnuts', slug: 'sidecar-doughnuts', city: 'Costa Mesa', state: 'CA', votes: 15432 },
  { id: '5', name: 'Federal Donuts', slug: 'federal-donuts', city: 'Philadelphia', state: 'PA', votes: 12876 },
]

export default function VotePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'donuts' | 'shops'>('donuts')
  const [flavorFilter, setFlavorFilter] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const filteredDonuts = mockDonuts.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shop.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFlavor = !flavorFilter || d.flavor === flavorFilter
    return matchesSearch && matchesFlavor
  })

  const filteredShops = mockShops.filter(s => {
    return s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-donut-pink to-donut-glaze py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cast Your Vote! 🍩
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            You get one vote per day. Make it count! Search for your favorite donut or shop below.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prize Progress */}
        <div className="mb-8 -mt-12">
          <PrizeProgress initialCount={47823} />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search donuts or shops..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-donut-pink focus:border-transparent text-lg"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-full p-1 shadow border border-border">
            <button
              onClick={() => setActiveTab('donuts')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                activeTab === 'donuts'
                  ? 'bg-donut-pink text-white'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              🍩 Donuts
            </button>
            <button
              onClick={() => setActiveTab('shops')}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                activeTab === 'shops'
                  ? 'bg-donut-chocolate text-white'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              🏪 Shops
            </button>
          </div>
        </div>

        {/* Flavor Filter (Donuts only) */}
        {activeTab === 'donuts' && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => setFlavorFilter(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                flavorFilter === null
                  ? 'bg-donut-pink text-white'
                  : 'bg-white text-foreground/60 hover:bg-muted border border-border'
              }`}
            >
              All
            </button>
            {FLAVOR_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFlavorFilter(cat.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
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

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {activeTab === 'donuts' ? (
              filteredDonuts.length > 0 ? (
                filteredDonuts.map((donut) => (
                  <div
                    key={donut.id}
                    className={`flex items-center gap-4 p-4 transition-colors cursor-pointer ${
                      selectedItem === donut.id ? 'bg-donut-pink/10' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedItem(selectedItem === donut.id ? null : donut.id)}
                  >
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-3xl flex-shrink-0">
                      🍩
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground">{donut.name}</h4>
                      <p className="text-sm text-foreground/60">{donut.shop} • {donut.state}</p>
                    </div>
                    <div className="text-right mr-2">
                      <div className="font-bold text-donut-pink counter-value">
                        {donut.votes.toLocaleString()}
                      </div>
                      <div className="text-xs text-foreground/50">votes</div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all vote-btn ${
                        selectedItem === donut.id
                          ? 'bg-donut-pink text-white'
                          : 'bg-muted text-foreground/60 hover:bg-donut-pink hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${selectedItem === donut.id ? 'fill-current' : ''}`} />
                      Vote
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-foreground/50">
                  No donuts found. Try a different search!
                </div>
              )
            ) : (
              filteredShops.length > 0 ? (
                filteredShops.map((shop) => (
                  <div
                    key={shop.id}
                    className={`flex items-center gap-4 p-4 transition-colors cursor-pointer ${
                      selectedItem === shop.id ? 'bg-donut-chocolate/10' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedItem(selectedItem === shop.id ? null : shop.id)}
                  >
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-3xl flex-shrink-0">
                      🏪
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground">{shop.name}</h4>
                      <p className="text-sm text-foreground/60">{shop.city}, {shop.state}</p>
                    </div>
                    <div className="text-right mr-2">
                      <div className="font-bold text-donut-chocolate counter-value">
                        {shop.votes.toLocaleString()}
                      </div>
                      <div className="text-xs text-foreground/50">votes</div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all vote-btn ${
                        selectedItem === shop.id
                          ? 'bg-donut-chocolate text-white'
                          : 'bg-muted text-foreground/60 hover:bg-donut-chocolate hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${selectedItem === shop.id ? 'fill-current' : ''}`} />
                      Vote
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-foreground/50">
                  No shops found. Try a different search!
                </div>
              )
            )}
          </div>
        </div>

        {/* Selected Item CTA */}
        {selectedItem && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg md:hidden">
            <button className="w-full px-6 py-4 bg-donut-pink text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 vote-btn">
              <Heart className="w-5 h-5 fill-current" />
              Confirm Vote
            </button>
          </div>
        )}

        {/* Can't find it? */}
        <div className="mt-8 text-center">
          <p className="text-foreground/60 mb-4">
            Can&apos;t find your favorite? 
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 text-donut-pink font-semibold hover:underline"
          >
            Submit a new donut or shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
