'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, ExternalLink, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { Donut, Shop } from '@/lib/types'

interface LeaderboardProps {
  type: 'donuts' | 'shops'
  initialData: (Donut | Shop)[]
  limit?: number
  stateCode?: string
  showViewAll?: boolean
}

export default function Leaderboard({
  type,
  initialData,
  limit = 10,
  stateCode,
  showViewAll = true,
}: LeaderboardProps) {
  const [items, setItems] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const table = type === 'donuts' ? 'donuts' : 'shops'

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`${table}_leaderboard`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table,
        },
        async () => {
          // Refetch leaderboard on any update
          setIsLoading(true)
          let query = supabase
            .from(table)
            .select(type === 'donuts' ? '*, shops(name, slug)' : '*')
            .order('vote_count', { ascending: false })
            .limit(limit)

          if (stateCode) {
            query = query.eq('state_code', stateCode)
          }

          const { data } = await query
          if (data) {
            setItems(data as unknown as (Donut | Shop)[])
          }
          setIsLoading(false)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [type, limit, stateCode])

  const getRankBadge = (index: number) => {
    if (index === 0) return 'rank-gold'
    if (index === 1) return 'rank-silver'
    if (index === 2) return 'rank-bronze'
    return 'bg-muted text-foreground/60'
  }

  const isDonut = (item: Donut | Shop): item is Donut => {
    return 'flavor_category' in item
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-donut-pink to-donut-glaze px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {type === 'donuts' ? '🍩' : '🏪'} Top {type === 'donuts' ? 'Donuts' : 'Shops'}
          {stateCode && <span className="text-white/80 text-sm font-normal">in {stateCode}</span>}
        </h3>
      </div>

      {/* List */}
      <div className={`divide-y divide-border ${isLoading ? 'opacity-50' : ''}`}>
        {items.slice(0, limit).map((item, index) => (
          <Link
            key={item.id}
            href={type === 'donuts' ? `/donut/${item.slug}` : `/shop/${item.slug}`}
            className="donut-card flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            {/* Rank */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadge(index)}`}
            >
              {index + 1}
            </div>

            {/* Image */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  {type === 'donuts' ? '🍩' : '🏪'}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
              <p className="text-sm text-foreground/60 truncate">
                {isDonut(item)
                  ? (item as Donut & { shops?: { name: string } }).shops?.name || 'Unknown Shop'
                  : `${(item as Shop).city}, ${(item as Shop).state_code}`}
              </p>
            </div>

            {/* Vote count */}
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="font-bold text-donut-pink counter-value">
                  {item.vote_count.toLocaleString()}
                </div>
                <div className="text-xs text-foreground/50">votes</div>
              </div>
              {index < 3 && (
                <TrendingUp className="w-4 h-4 text-donut-sprinkles-green" />
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* View All */}
      {showViewAll && (
        <Link
          href={
            stateCode
              ? `/state/${stateCode}/${type}`
              : `/leaderboard?tab=${type}`
          }
          className="flex items-center justify-center gap-2 p-4 bg-muted hover:bg-muted/80 transition-colors text-donut-pink font-semibold"
        >
          View Full Leaderboard
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
