import { House } from 'lucide-astro'
import { Building } from 'lucide-astro'
import { Presentation } from 'lucide-astro'
import { UserSearch } from 'lucide-astro'
import { Mail } from 'lucide-astro'

// lucide-astro のアイコンコンポーネント型(全アイコン共通)
type LucideIcon = typeof House

export interface IconData {
  name: string
  icon: LucideIcon
}

export const IconData: IconData[] = [
  { name: 'home', icon: House },
  { name: 'company', icon: Building },
  { name: 'services', icon: Presentation },
  { name: 'recruit', icon: UserSearch },
  { name: 'contact', icon: Mail },
]
