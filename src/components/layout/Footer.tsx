import Link from 'next/link'
import { Truck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-donut-chocolate text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🍩</span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-tight">
                  Donut Vote USA
                </span>
                <span className="text-sm text-donut-pink-light">
                  America&apos;s favorite donut, decided by you.
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm max-w-md">
              Vote for your favorite donuts and shops across all 50 states. 
              Every 2,000th vote wins a $5 DoorDash gift card!
            </p>
            
            {/* DoorDash Partnership */}
            <div className="mt-6 flex items-center gap-2 text-donut-sprinkles-yellow">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-medium">
                Powered by DoorDash
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/leaderboard" className="text-white/70 hover:text-donut-pink transition-colors">
                  National Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/states" className="text-white/70 hover:text-donut-pink transition-colors">
                  Vote by State
                </Link>
              </li>
              <li>
                <Link href="/winners" className="text-white/70 hover:text-donut-pink transition-colors">
                  Winner Wall
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-white/70 hover:text-donut-pink transition-colors">
                  Submit a Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Info</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 hover:text-donut-pink transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-white/70 hover:text-donut-pink transition-colors">
                  Contest Rules
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-donut-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-donut-pink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Donut Vote USA. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">
              A GullStack Project
            </span>
            <span className="text-2xl">🦅</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
