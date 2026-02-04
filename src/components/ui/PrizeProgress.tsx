'use client'

import { useEffect, useState } from 'react'
import { Gift, Zap } from 'lucide-react'
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
    <div className={`rounded-2xl p-6 ${isCloseToWinner ? 'bg-gradient-to-r from-donut-pink to-donut-glaze winner-glow' : 'bg-white'} shadow-lg border border-border`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gift className={`w-6 h-6 ${isCloseToWinner ? 'text-white' : 'text-donut-pink'}`} />
          <span className={`font-bold text-lg ${isCloseToWinner ? 'text-white' : 'text-foreground'}`}>
            Next $5 DoorDash Winner
          </span>
        </div>
        {isCloseToWinner && (
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">SO CLOSE!</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative h-4 bg-muted rounded-full overflow-hidden mb-3">
        <div
          className={`h-full progress-bar rounded-full ${isAnimating ? 'transition-all duration-500' : ''}`}
          style={{ width: `${progressPercent}%` }}
        />
        {/* Sprinkle dots on progress bar */}
        <div className="absolute inset-0 flex items-center justify-evenly pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < Math.floor(progressPercent / 20) ? 'bg-white/50' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className={isCloseToWinner ? 'text-white/80' : 'text-foreground/60'}>
          Total votes: <span className={`font-bold counter-value ${isAnimating ? 'text-donut-pink scale-110 inline-block transition-transform' : ''}`}>
            {totalVotes.toLocaleString()}
          </span>
        </span>
        <span className={isCloseToWinner ? 'text-white font-bold' : 'text-donut-pink font-bold'}>
          {votesUntilNext.toLocaleString()} votes to go!
        </span>
      </div>

      {/* Winner number indicator */}
      <div className={`mt-3 text-center text-sm ${isCloseToWinner ? 'text-white/70' : 'text-foreground/50'}`}>
        Vote #{nextWinnerNumber.toLocaleString()} wins! Could it be you? 🎉
      </div>
    </div>
  )
}
