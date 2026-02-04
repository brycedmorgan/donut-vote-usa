import Link from 'next/link'
import { MapPin, Trophy, ChevronRight } from 'lucide-react'
import { US_STATES } from '@/lib/types'

// Mock data for state rankings
const stateVotes: Record<string, { votes: number; topDonut: string; topShop: string }> = {
  'CA': { votes: 8234, topDonut: 'Apple Fritter', topShop: 'Sidecar Doughnuts' },
  'TX': { votes: 7123, topDonut: 'Kolache', topShop: 'Shipley Do-Nuts' },
  'NY': { votes: 6987, topDonut: 'Cronut', topShop: 'Doughnut Plant' },
  'FL': { votes: 5432, topDonut: 'Key Lime', topShop: 'The Salty Donut' },
  'OR': { votes: 4876, topDonut: 'Bacon Maple Bar', topShop: 'Voodoo Doughnut' },
  'IL': { votes: 4234, topDonut: 'Maple Long John', topShop: "Stan's Donuts" },
  'MA': { votes: 3987, topDonut: 'Boston Cream', topShop: "Dunkin'" },
  'WA': { votes: 3654, topDonut: 'Old Fashioned', topShop: 'Top Pot' },
  'PA': { votes: 3456, topDonut: 'Chocolate Glazed', topShop: 'Federal Donuts' },
  'NC': { votes: 3234, topDonut: 'Original Glazed', topShop: 'Krispy Kreme' },
}

// Generate random votes for states without data
const getStateData = (code: string) => {
  if (stateVotes[code]) return stateVotes[code]
  const votes = Math.floor(Math.random() * 2000) + 100
  return { votes, topDonut: 'Glazed', topShop: 'Local Favorite' }
}

// Sort states by vote count
const sortedStates = [...US_STATES].sort((a, b) => {
  return getStateData(b.code).votes - getStateData(a.code).votes
})

export default function StatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-donut-sprinkles-blue to-donut-pink py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Vote by State
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              See who&apos;s winning in your state! Find local favorites and crown your state&apos;s best donut.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top States */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-donut-chocolate mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-donut-glaze" />
            Most Active States
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedStates.slice(0, 6).map((state, index) => {
              const data = getStateData(state.code)
              return (
                <Link
                  key={state.code}
                  href={`/state/${state.code.toLowerCase()}`}
                  className="donut-card bg-white rounded-xl p-6 border border-border hover:border-donut-pink transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'bg-muted text-foreground/60'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-foreground">{state.name}</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mt-1">
                        {data.votes.toLocaleString()} total votes
                      </p>
                    </div>
                    <span className="text-3xl font-bold text-donut-pink">{state.code}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🍩</span>
                      <span className="text-foreground/70">Top Donut:</span>
                      <span className="font-medium text-foreground">{data.topDonut}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏪</span>
                      <span className="text-foreground/70">Top Shop:</span>
                      <span className="font-medium text-foreground">{data.topShop}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-end text-donut-pink font-medium text-sm">
                    View Leaderboard
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All States Grid */}
        <div>
          <h2 className="text-2xl font-bold text-donut-chocolate mb-6">
            All 50 States + DC
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {US_STATES.map((state) => {
              const data = getStateData(state.code)
              return (
                <Link
                  key={state.code}
                  href={`/state/${state.code.toLowerCase()}`}
                  className="donut-card bg-white rounded-lg p-4 border border-border hover:border-donut-pink hover:shadow-md transition-all text-center group"
                >
                  <div className="text-3xl font-bold text-donut-chocolate group-hover:text-donut-pink transition-colors">
                    {state.code}
                  </div>
                  <div className="text-sm text-foreground/60 truncate mt-1">
                    {state.name}
                  </div>
                  <div className="text-xs text-donut-pink font-medium mt-2">
                    {data.votes.toLocaleString()} votes
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* State Battle Teaser */}
        <div className="mt-16 bg-gradient-to-r from-donut-pink to-donut-glaze rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">🥊 State Battles Coming Soon!</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Texas vs California. New York vs Massachusetts. Which state has the best donuts? 
            Weekly showdowns with special prizes for the winning state!
          </p>
          <button className="px-8 py-3 bg-white text-donut-pink rounded-full font-bold hover:bg-donut-cream transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  )
}
