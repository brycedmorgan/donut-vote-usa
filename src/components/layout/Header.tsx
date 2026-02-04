'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Trophy, MapPin, User, Sparkles } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-bg-secondary/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:animate-bounce">🍩</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-text-primary leading-tight">
                Donut Vote
              </span>
              <span className="text-xs font-semibold text-donut-pink tracking-wider">
                USA 🇺🇸
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-text-secondary hover:text-donut-pink transition-colors font-medium"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Link>
            <Link
              href="/states"
              className="flex items-center gap-2 text-text-secondary hover:text-donut-pink transition-colors font-medium"
            >
              <MapPin className="w-4 h-4" />
              By State
            </Link>
            <Link
              href="/winners"
              className="flex items-center gap-2 text-text-secondary hover:text-donut-sprinkles-yellow transition-colors font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Winners
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-donut-pink text-white rounded-full font-semibold hover:bg-primary-dark transition-all vote-btn"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-donut-pink transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border bg-bg-secondary">
            <div className="flex flex-col gap-2">
              <Link
                href="/leaderboard"
                className="flex items-center gap-3 text-text-secondary hover:text-donut-pink hover:bg-bg-card transition-colors font-medium px-3 py-3 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Trophy className="w-5 h-5" />
                Leaderboard
              </Link>
              <Link
                href="/states"
                className="flex items-center gap-3 text-text-secondary hover:text-donut-pink hover:bg-bg-card transition-colors font-medium px-3 py-3 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="w-5 h-5" />
                By State
              </Link>
              <Link
                href="/winners"
                className="flex items-center gap-3 text-text-secondary hover:text-donut-sprinkles-yellow hover:bg-bg-card transition-colors font-medium px-3 py-3 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles className="w-5 h-5" />
                Winners
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-donut-pink text-white rounded-full font-semibold hover:bg-primary-dark transition-colors mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                Sign In to Vote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
