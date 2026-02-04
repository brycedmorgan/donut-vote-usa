# 🍩 Donut Vote USA

**America's favorite donut, decided by real votes — live, by state + nationwide.**

> Every 2,000th vote wins a $5 DoorDash gift card!

## The Concept

Donut Vote USA is a viral voting platform where users vote for their favorite donuts and donut shops across all 50 states. The site features:

- **Live Leaderboards**: Real-time rankings updated via Supabase Realtime
- **Prize System**: Every 2,000th vote wins a $5 DoorDash gift card (instant win)
- **State Battles**: See who's winning in your state
- **Daily Voting**: One vote per user per 24 hours (email/OAuth verification)
- **Winner Wall**: Hall of fame for prize winners

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database**: Supabase (Postgres + Auth + Realtime + Storage)
- **Deployment**: Vercel
- **Icons**: Lucide React

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/brycedmorgan/donut-vote-usa.git
cd donut-vote-usa
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:
   - `scripts/schema.sql` (creates tables, triggers, RLS policies)
   - `scripts/seed-data.sql` (populates with real donut shops)
3. Enable Auth providers (Email, Google, Apple) in Authentication settings
4. Copy your project URL and keys

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

```bash
vercel
```

Add the same environment variables in Vercel project settings.

## Features

### MVP (Built)
- ✅ Homepage with live leaderboards
- ✅ National donut + shop rankings
- ✅ State-by-state voting
- ✅ Prize progress bar (real-time)
- ✅ Auth (Email magic link, Google, Apple)
- ✅ Vote page with search/filter
- ✅ Winners wall / hall of fame
- ✅ Mobile responsive design
- ✅ Supabase Realtime subscriptions

### Phase 2 (Planned)
- [ ] Shop profile pages with DoorDash ordering
- [ ] User profiles with vote streaks
- [ ] Photo uploads + reviews
- [ ] "Rising Fast" trending section
- [ ] State vs State weekly battles
- [ ] Donut personality quiz
- [ ] Submit new shop form (moderated)
- [ ] Email notifications for winners

## Database Schema

- `shops` - Donut shops (name, location, DoorDash link, vote count)
- `donuts` - Individual donuts (name, shop, flavor category, vote count)
- `votes` - User votes (one per user per day)
- `vote_counter` - Global counter for prize system
- `winners` - Prize winners
- `profiles` - User profiles with streaks
- `reviews` - User reviews + photos

## Prize System

The prize system is handled by database triggers:

1. When a vote is inserted, `trigger_increment_vote_counts` updates:
   - Donut vote count
   - Shop vote count
   - Global vote counter
   - User's total votes

2. `trigger_check_winner` checks if the global count is divisible by 2,000:
   - Creates a winner record
   - Marks user as winner
   - (In production: triggers email notification)

## Monetization

1. **DoorDash Partnership** - Revenue share on orders
2. **Featured Listings** - Shops pay for premium placement
3. **State Sponsorships** - "Official Donut of Texas"
4. **Display Ads** - Coffee/donut-related brands
5. **Premium Users** - Vote twice daily, custom profiles

## Marketing Ideas

- "Cast your vote before the next 2,000th winner steals your glory"
- TikTok creators eating donuts + live voting reactions
- Influencer seeding with DoorDash credits
- National Donut Day (June 6) special events
- Reddit posts in r/donuts, city subreddits

## License

MIT

---

Built with 🍩 by GullStack
