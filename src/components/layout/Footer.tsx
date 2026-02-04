import Link from 'next/link'
import { Truck, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <span className="text-4xl group-hover:animate-bounce">🍩</span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-text-primary leading-tight">
                  Donut Vote USA
                </span>
                <span className="text-sm text-donut-pink">
                  America&apos;s favorite donut, decided by you.
                </span>
              </div>
            </Link>
            <p className="text-text-muted text-sm max-w-md mb-4">
              Vote for your favorite donuts and shops across all 50 states. 
              Every 2,000th vote wins a $5 DoorDash gift card! 🎉
            </p>
            
            {/* DoorDash Partnership */}
            <div className="flex items-center gap-2 text-donut-sprinkles-yellow">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-medium">
                Powered by DoorDash
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg text-text-primary mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/leaderboard" className="text-text-muted hover:text-donut-pink transition-colors">
                  🏆 National Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/states" className="text-text-muted hover:text-donut-pink transition-colors">
                  🗺️ Vote by State
                </Link>
              </li>
              <li>
                <Link href="/winners" className="text-text-muted hover:text-donut-sprinkles-yellow transition-colors">
                  ✨ Winner Wall
                </Link>
              </li>
              <li>
                <Link href="/vote" className="text-text-muted hover:text-donut-sprinkles-green transition-colors">
                  🗳️ Cast Your Vote
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg text-text-primary mb-4">Info</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-muted hover:text-donut-pink transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-text-muted hover:text-donut-pink transition-colors">
                  Contest Rules
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-muted hover:text-donut-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-muted hover:text-donut-pink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Donut Vote USA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com/donutvoteusa" className="text-text-muted hover:text-donut-sprinkles-blue transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://github.com/brycedmorgan/donut-vote-usa" className="text-text-muted hover:text-text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <span className="text-text-muted text-sm flex items-center gap-2">
              A GullStack Project
              <span className="text-xl">🦅</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
