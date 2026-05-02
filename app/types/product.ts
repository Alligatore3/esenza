export interface PrepStep {
  icon: string
  label: string
  labelJa: string
}

export interface Product {
  slug: string
  name: string
  nameJa: string
  price: number
  image: string
  images: string[]
  imageAlt: string
  badge: string | null
  badgeColor: 'green' | 'yellow' | 'white' | null
  shortDescription: string
  shortDescriptionJa: string
  description: string
  descriptionJa: string
  tags: string[]
  category: 'sweet' | 'savory' | 'breakfast'
  isVegan: boolean
  isGlutenFree: boolean
  featured: boolean
  prepSteps: PrepStep[]
}
