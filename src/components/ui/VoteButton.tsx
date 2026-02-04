'use client'

import { useState } from 'react'
import { Heart, Loader2, Check, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface VoteButtonProps {
  donutId?: string
  shopId?: string
  itemName: string
  onVoteSuccess?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline'
}

export default function VoteButton({
  donutId,
  shopId,
  itemName,
  onVoteSuccess,
  size = 'md',
  variant = 'primary',
}: VoteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [voted, setVoted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-donut-pink text-white hover:bg-primary-dark',
    outline: 'bg-white text-donut-pink border-2 border-donut-pink hover:bg-donut-pink hover:text-white',
  }

  const handleVote = async () => {
    const supabase = createClient()
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setError('Please sign in to vote!')
      // Could redirect to login here
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Check if user already voted today
      const today = new Date().toISOString().split('T')[0]
      const { data: existingVote } = await supabase
        .from('votes')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', `${today}T00:00:00`)
        .lte('created_at', `${today}T23:59:59`)
        .single()

      if (existingVote) {
        setError('You already voted today! Come back tomorrow 🍩')
        setIsLoading(false)
        return
      }

      // Get user's state from profile (optional)
      const { data: profile } = await supabase
        .from('profiles')
        .select('state_code')
        .eq('id', user.id)
        .single()

      // Cast vote
      const { error: voteError } = await supabase
        .from('votes')
        .insert({
          user_id: user.id,
          donut_id: donutId || null,
          shop_id: shopId || null,
          state_code: profile?.state_code || null,
        })

      if (voteError) {
        if (voteError.code === '23505') {
          setError('You already voted today!')
        } else {
          throw voteError
        }
        return
      }

      setVoted(true)
      onVoteSuccess?.()

      // Celebrate!
      setTimeout(() => {
        // Could trigger confetti here
      }, 100)

    } catch (err) {
      console.error('Vote error:', err)
      setError('Something went wrong. Try again!')
    } finally {
      setIsLoading(false)
    }
  }

  if (voted) {
    return (
      <button
        disabled
        className={`${sizeClasses[size]} rounded-full font-semibold flex items-center justify-center gap-2 bg-donut-sprinkles-green text-white cursor-default`}
      >
        <Check className="w-5 h-5" />
        Voted for {itemName}!
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleVote}
        disabled={isLoading}
        className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full font-semibold flex items-center justify-center gap-2 vote-btn disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Voting...
          </>
        ) : (
          <>
            <Heart className="w-5 h-5" />
            Vote for {itemName}
          </>
        )}
      </button>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}
