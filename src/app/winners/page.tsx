import Link from 'next/link'
import { Trophy, Gift, Sparkles, Clock } from 'lucide-react'
import PrizeProgress from '@/components/ui/PrizeProgress'

// Mock winners data
const mockWinners = [
  { id: '1', name: 'Sarah M.', state: 'CA', voteNumber: 46000, date: '2026-02-03', donut: 'Apple Fritter' },
  { id: '2', name: 'James T.', state: 'TX', voteNumber: 44000, date: '2026-02-02', donut: 'Kolache' },
  { id: '3', name: 'Emily R.', state: 'NY', voteNumber: 42000, date: '2026-02-02', donut: 'Cronut' },
  { id: '4', name: 'Michael K.', state: 'FL', voteNumber: 40000, date: '2026-02-01', donut: 'Key Lime Donut' },
  { id: '5', name: 'Jessica L.', state: 'OR', voteNumber: 38000, date: '2026-02-01', donut: 'Bacon Maple Bar' },
  { id: '6', name: 'David W.', state: 'IL', voteNumber: 36000, date: '2026-01-31', donut: 'Maple Long John' },
  { id: '7', name: 'Amanda S.', state: 'WA', voteNumber: 34000, date: '2026-01-31', donut: 'Old Fashioned' },
  { id: '8', name: 'Chris P.', state: 'MA', voteNumber: 32000, date: '2026-01-30', donut: 'Boston Cream' },
  { id: '9', name: 'Lauren H.', state: 'PA', voteNumber: 30000, date: '2026-01-30', donut: 'Chocolate Glazed' },
  { id: '10', name: 'Ryan M.', state: 'NC', voteNumber: 28000, date: '2026-01-29', donut: 'Original Glazed' },
]

const mockTotalVotes = 47823
const totalPrizesAwarded = Math.floor(mockTotalVotes / 2000) * 5

export default function WinnersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-r from-donut-glaze to-donut-sprinkles-yellow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Winner Wall 🏆
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Every 2,000th vote wins a $5 DoorDash gift card. Here are our lucky winners!
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">${totalPrizesAwarded}</div>
              <div className="text-sm text-white/80">Total Prizes Awarded</div>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">{mockWinners.length}</div>
              <div className="text-sm text-white/80">Lucky Winners</div>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">23</div>
              <div className="text-sm text-white/80">States Represented</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prize Progress */}
        <div className="mb-8 -mt-12">
          <PrizeProgress initialCount={mockTotalVotes} />
        </div>

        {/* Recent Winners */}
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-donut-glaze/20 to-donut-pink/20 px-6 py-4 flex items-center justify-between border-b border-border">
            <h2 className="text-xl font-bold text-donut-chocolate flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-donut-glaze" />
              Recent Winners
            </h2>
            <div className="flex items-center gap-1 text-donut-sprinkles-green text-sm font-medium">
              <Clock className="w-4 h-4" />
              Updated live
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {mockWinners.map((winner, index) => (
              <div
                key={winner.id}
                className={`flex items-center gap-4 p-4 ${index === 0 ? 'bg-donut-glaze/5' : ''}`}
              >
                {/* Winner badge */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index === 0 ? 'bg-donut-glaze text-white winner-glow' : 'bg-muted text-foreground/60'}`}>
                  {index === 0 ? (
                    <Trophy className="w-6 h-6" />
                  ) : (
                    <Gift className="w-6 h-6" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{winner.name}</h4>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-foreground/60">
                      {winner.state}
                    </span>
                    {index === 0 && (
                      <span className="text-xs bg-donut-glaze/20 text-donut-glaze px-2 py-0.5 rounded-full font-medium">
                        Latest Winner!
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/60">
                    Vote #{winner.voteNumber.toLocaleString()} • Voted for {winner.donut}
                  </p>
                </div>

                {/* Prize */}
                <div className="text-right">
                  <div className="font-bold text-donut-sprinkles-green">$5</div>
                  <div className="text-xs text-foreground/50">{winner.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full p-4 bg-muted hover:bg-muted/80 transition-colors text-donut-pink font-semibold">
            Load More Winners
          </button>
        </div>

        {/* How to Win */}
        <div className="mt-12 bg-gradient-to-r from-donut-pink to-donut-glaze rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">How to Win 🎉</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold mb-1">Sign Up Free</h3>
              <p className="text-white/80 text-sm">Create an account to track your votes</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold mb-1">Vote Daily</h3>
              <p className="text-white/80 text-sm">One vote per day, any donut or shop</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold mb-1">Be Vote #2,000</h3>
              <p className="text-white/80 text-sm">Every 2,000th vote wins instantly!</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/vote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-donut-pink rounded-full font-bold text-lg hover:bg-donut-cream transition-colors vote-btn"
            >
              🍩 Vote Now — Could Be You!
            </Link>
          </div>
        </div>

        {/* Fine Print */}
        <div className="mt-8 text-center text-sm text-foreground/50">
          <p>
            Winners are notified via email within 24 hours. DoorDash gift cards delivered digitally.
            <br />
            <Link href="/rules" className="text-donut-pink hover:underline">
              See full contest rules →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
