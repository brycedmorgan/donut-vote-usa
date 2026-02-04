'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Trophy, MapPin, User } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🍩</span>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-donut-chocolate leading-tight">
                Donut Vote
              </span>
              <span className="text-xs font-semibold text-donut-pink tracking-wider">
                USA 🇺🇸
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-foreground/80 hover:text-donut-pink transition-colors font-medium"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Link>
            <Link
              href="/states"
              className="flex items-center gap-2 text-foreground/80 hover:text-donut-pink transition-colors font-medium"
            >
              <MapPin className="w-4 h-4" />
              By State
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-donut-pink text-white rounded-full font-semibold hover:bg-primary-dark transition-colors vote-btn"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
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
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 text-foreground/80 hover:text-donut-pink transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Trophy className="w-5 h-5" />
                Leaderboard
              </Link>
              <Link
                href="/states"
                className="flex items-center gap-2 text-foreground/80 hover:text-donut-pink transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="w-5 h-5" />
                By State
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-donut-pink text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
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
