'use client'

import { useEffect, useState } from 'react'
import { Gift, Zap, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface PrizeProgressProps {
  initialCount?: number
}

export default function PrizeProgress({ initialCount = 0 }: PrizeProgressProps) {
  const [totalVotes, setTotalVotes] = useState(initialCount)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const PRIZE_INTERVAL = 2000
  const votesUntilNext = PRIZE_INTERVAL - (totalVotes % PRIZE_INTERVAL)
  const progressPercent = ((totalVotes % PRIZE_INTERVAL) / PRIZE_INTERVAL) * 100
  const nextWinnerNumber = Math.ceil(totalVotes / PRIZE_INTERVAL) * PRIZE_INTERVAL || PRIZE_INTERVAL

  useEffect(() => {
    const supabase = createClient()
    
    // Subscribe to realtime vote counter updates
    const channel = supabase
      .channel('vote_counter_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'vote_counter',
        },
        (payload) => {
          const newCount = payload.new.total_votes
          setIsAnimating(true)
          setTotalVotes(newCount)
          setTimeout(() => setIsAnimating(false), 500)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const isCloseToWinner = votesUntilNext <= 50

  return (
    <div className={`rounded-2xl p-6 border ${isCloseToWinner ? 'bg-gradient-to-r from-donut-pink/30 to-donut-glaze/30 border-donut-pink winner-glow' : 'bg-bg-secondary border-border'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isCloseToWinner ? 'bg-donut-pink/20' : 'bg-bg-card'}`}>
            <Gift className={`w-5 h-5 ${isCloseToWinner ? 'text-donut-pink' : 'text-donut-sprinkles-yellow'}`} />
          </div>
          <span className={`font-bold text-lg ${isCloseToWinner ? 'text-text-primary' : 'text-text-primary'}`}>
            Next $5 DoorDash Winner 🎁
          </span>
        </div>
        {isCloseToWinner && (
          <div className="flex items-center gap-1 bg-donut-sprinkles-red/20 text-donut-sprinkles-red px-3 py-1 rounded-full">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">SO CLOSE!</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative h-4 bg-bg-card rounded-full overflow-hidden mb-3 border border-border">
        <div
          className={`h-full progress-bar rounded-full ${isAnimating ? 'transition-all duration-500' : ''}`}
          style={{ width: `${progressPercent}%` }}
        />
        {/* Milestone dots */}
        <div className="absolute inset-0 flex items-center justify-evenly pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < Math.floor(progressPercent / 20) ? 'bg-white/60' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-muted">
          Total votes: <span className={`font-bold counter-value ${isAnimating ? 'text-donut-pink scale-110 inline-block transition-transform' : 'text-text-primary'}`}>
            {totalVotes.toLocaleString()}
          </span>
        </span>
        <span className={`font-bold ${isCloseToWinner ? 'text-donut-sprinkles-red' : 'text-donut-pink'}`}>
          {votesUntilNext.toLocaleString()} votes to go! 🔥
        </span>
      </div>

      {/* Winner number indicator */}
      <div className="mt-3 text-center">
        <span className={`text-sm ${isCloseToWinner ? 'text-donut-sprinkles-yellow' : 'text-text-muted'}`}>
          Vote #{nextWinnerNumber.toLocaleString()} wins! Could it be you? 
          <Sparkles className="w-4 h-4 inline ml-1 text-donut-sprinkles-yellow" />
        </span>
      </div>
    </div>
  )
}
