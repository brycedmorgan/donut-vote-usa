export interface Shop {
  id: string
  name: string
  slug: string
  description: string | null
  address: string | null
  city: string | null
  state: string
  state_code: string
  zip: string | null
  lat: number | null
  lng: number | null
  phone: string | null
  website: string | null
  doordash_url: string | null
  image_url: string | null
  is_chain: boolean
  is_featured: boolean
  vote_count: number
  created_at: string
  updated_at: string
}

export interface Donut {
  id: string
  name: string
  slug: string
  description: string | null
  shop_id: string | null
  flavor_category: 'glazed' | 'filled' | 'cake' | 'vegan' | 'gourmet' | 'cronut' | 'other'
  image_url: string | null
  is_signature: boolean
  vote_count: number
  created_at: string
  updated_at: string
  // Joined fields
  shop_name?: string
  shop_slug?: string
  state_code?: string
}

export interface Vote {
  id: string
  user_id: string
  donut_id: string | null
  shop_id: string | null
  ip_hash: string | null
  state_code: string | null
  created_at: string
}

export interface Winner {
  id: string
  user_id: string | null
  vote_id: string | null
  vote_number: number
  prize_amount: number
  prize_type: string
  email: string | null
  claimed: boolean
  claimed_at: string | null
  created_at: string
}

export interface Profile {
  id: string
  display_name: string | null
  avatar_url: string | null
  state_code: string | null
  vote_streak: number
  total_votes: number
  is_winner: boolean
  created_at: string
  updated_at: string
}

export interface VoteCounter {
  id: number
  total_votes: number
  last_winner_vote: number
  updated_at: string
}

export interface Review {
  id: string
  user_id: string
  donut_id: string | null
  shop_id: string | null
  rating: number
  review_text: string | null
  photo_url: string | null
  created_at: string
}

// US States for leaderboards
export const US_STATES: { code: string; name: string }[] = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'Washington DC' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
]

export const FLAVOR_CATEGORIES = [
  { value: 'glazed', label: 'Glazed', emoji: '✨' },
  { value: 'filled', label: 'Filled', emoji: '🍓' },
  { value: 'cake', label: 'Cake', emoji: '🍰' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'gourmet', label: 'Gourmet', emoji: '👨‍🍳' },
  { value: 'cronut', label: 'Cronut', emoji: '🥐' },
  { value: 'other', label: 'Other', emoji: '🍩' },
] as const
