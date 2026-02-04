import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Trophy, ArrowLeft, TrendingUp } from 'lucide-react'
import { US_STATES } from '@/lib/types'
import PrizeProgress from '@/components/ui/PrizeProgress'

// Mock data for state leaderboards
const mockStateData: Record<string, { donuts: Array<{ id: string; name: string; slug: string; shop: string; votes: number }>; shops: Array<{ id: string; name: string; slug: string; city: string; votes: number }> }> = {
  'ca': {
    donuts: [
      { id: '1', name: 'Apple Fritter', slug: 'apple-fritter', shop: 'Sidecar Doughnuts', votes: 2341 },
      { id: '2', name: 'Cruller', slug: 'cruller', shop: "Randy's Donuts", votes: 1987 },
      { id: '3', name: 'Maple Bar', slug: 'maple-bar', shop: 'Donut Friend', votes: 1654 },
      { id: '4', name: 'Vegan Chocolate', slug: 'vegan-chocolate', shop: 'Donut Friend', votes: 1432 },
      { id: '5', name: 'Glazed Old Fashioned', slug: 'glazed-old-fashioned', shop: 'Sidecar Doughnuts', votes: 1287 },
    ],
    shops: [
      { id: '1', name: 'Sidecar Doughnuts', slug: 'sidecar-doughnuts', city: 'Costa Mesa', votes: 4521 },
      { id: '2', name: "Randy's Donuts", slug: 'randys-donuts', city: 'Inglewood', votes: 3876 },
      { id: '3', name: 'Donut Friend', slug: 'donut-friend', city: 'Los Angeles', votes: 3234 },
      { id: '4', name: 'Blue Star Donuts', slug: 'blue-star', city: 'San Francisco', votes: 2987 },
      { id: '5', name: 'Psycho Donuts', slug: 'psycho-donuts', city: 'San Jose', votes: 2654 },
    ],
  },
  'tx': {
    donuts: [
      { id: '1', name: 'Kolache', slug: 'kolache', shop: 'Shipley Do-Nuts', votes: 2876 },
      { id: '2', name: 'Glazed', slug: 'glazed', shop: 'Shipley Do-Nuts', votes: 2345 },
      { id: '3', name: 'Apple Filled', slug: 'apple-filled', shop: 'Round Rock Donuts', votes: 1987 },
      { id: '4', name: 'Chocolate Long John', slug: 'chocolate-long-john', shop: 'Southern Maid', votes: 1654 },
      { id: '5', name: 'Bear Claw', slug: 'bear-claw', shop: 'Shipley Do-Nuts', votes: 1432 },
    ],
    shops: [
      { id: '1', name: 'Shipley Do-Nuts', slug: 'shipley', city: 'Houston', votes: 5234 },
      { id: '2', name: 'Round Rock Donuts', slug: 'round-rock', city: 'Round Rock', votes: 4123 },
      { id: '3', name: 'Southern Maid Donuts', slug: 'southern-maid', city: 'Dallas', votes: 3654 },
      { id: '4', name: 'Hurts Donut Co', slug: 'hurts-donut', city: 'Frisco', votes: 2987 },
      { id: '5', name: 'Gourdoughs', slug: 'gourdoughs', city: 'Austin', votes: 2654 },
    ],
  },
}

// Generate default data for other states
const getStateData = (code: string) => {
  const lowerCode = code.toLowerCase()
  if (mockStateData[lowerCode]) return mockStateData[lowerCode]
  
  return {
    donuts: [
      { id: '1', name: 'Original Glazed', slug: 'original-glazed', shop: 'Local Bakery', votes: Math.floor(Math.random() * 1000) + 500 },
      { id: '2', name: 'Chocolate Frosted', slug: 'chocolate-frosted', shop: 'Local Bakery', votes: Math.floor(Math.random() * 800) + 300 },
      { id: '3', name: 'Boston Cream', slug: 'boston-cream', shop: 'Local Bakery', votes: Math.floor(Math.random() * 600) + 200 },
      { id: '4', name: 'Maple Bar', slug: 'maple-bar', shop: 'Local Bakery', votes: Math.floor(Math.random() * 500) + 100 },
      { id: '5', name: 'Jelly Filled', slug: 'jelly-filled', shop: 'Local Bakery', votes: Math.floor(Math.random() * 400) + 50 },
    ],
    shops: [
      { id: '1', name: 'Local Favorite Donuts', slug: 'local-favorite', city: 'Main St', votes: Math.floor(Math.random() * 2000) + 1000 },
      { id: '2', name: 'Downtown Bakery', slug: 'downtown-bakery', city: 'Downtown', votes: Math.floor(Math.random() * 1500) + 500 },
      { id: '3', name: 'Morning Glory Donuts', slug: 'morning-glory', city: 'Midtown', votes: Math.floor(Math.random() * 1000) + 300 },
      { id: '4', name: 'Sweet Spot', slug: 'sweet-spot', city: 'Uptown', votes: Math.floor(Math.random() * 800) + 200 },
      { id: '5', name: 'The Donut Shop', slug: 'the-donut-shop', city: 'Eastside', votes: Math.floor(Math.random() * 600) + 100 },
    ],
  }
}

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function StatePage({ params }: PageProps) {
  const { code } = await params
  const upperCode = code.toUpperCase()
  const state = US_STATES.find(s => s.code === upperCode)
  
  if (!state) {
    notFound()
  }

  const data = getStateData(code)
  const totalVotes = [...data.donuts, ...data.shops].reduce((sum, item) => sum + item.votes, 0)

  const getRankBadge = (index: number) => {
    if (index === 0) return 'rank-gold'
    if (index === 1) return 'rank-silver'
    if (index === 2) return 'rank-bronze'
    return 'bg-muted text-foreground/60'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-donut-chocolate to-donut-pink py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/states"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All States
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{state.code}</span>
            </div>
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold">{state.name}</h1>
              <p className="text-white/80 flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4" />
                {totalVotes.toLocaleString()} total votes
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prize Progress */}
        <div className="max-w-2xl mx-auto mb-8 -mt-8">
          <PrizeProgress initialCount={47823} />
        </div>

        {/* Leaderboards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Donuts */}
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-donut-pink to-donut-glaze px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🍩 Top Donuts in {state.code}
              </h2>
              <Trophy className="w-5 h-5 text-white/80" />
            </div>
            <div className="divide-y divide-border">
              {data.donuts.map((donut, index) => (
                <Link
                  key={donut.id}
                  href={`/donut/${donut.slug}`}
                  className="donut-card flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadge(index)}`}
                  >
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    🍩
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{donut.name}</h4>
                    <p className="text-sm text-foreground/60 truncate">{donut.shop}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-donut-pink counter-value">
                      {donut.votes.toLocaleString()}
                    </div>
                    <div className="text-xs text-foreground/50">votes</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Shops */}
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-donut-chocolate to-donut-glaze px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🏪 Top Shops in {state.code}
              </h2>
              <Trophy className="w-5 h-5 text-white/80" />
            </div>
            <div className="divide-y divide-border">
              {data.shops.map((shop, index) => (
                <Link
                  key={shop.id}
                  href={`/shop/${shop.slug}`}
                  className="donut-card flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadge(index)}`}
                  >
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    🏪
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{shop.name}</h4>
                    <p className="text-sm text-foreground/60 truncate">{shop.city}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-donut-chocolate counter-value">
                      {shop.votes.toLocaleString()}
                    </div>
                    <div className="text-xs text-foreground/50">votes</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-donut-chocolate mb-4">
            Know a great donut shop in {state.name}?
          </h3>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-8 py-4 bg-donut-pink text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-colors vote-btn"
          >
            Submit a Shop
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return US_STATES.map((state) => ({
    code: state.code.toLowerCase(),
  }))
}
