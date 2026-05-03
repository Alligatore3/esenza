export interface Product {
  slug: string
  name: string
  subTitle: string
  price: number
  image: string
  images: { url: string; alt: string | null }[]
  imageAlt: string
  description: string
  howToPrepare: string
  tips: string
}
