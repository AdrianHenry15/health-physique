import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import imageUrlBuilder from "@sanity/image-url"
import { sanityClient } from "@/sanity/lib/client"

const builder = imageUrlBuilder(sanityClient)

export function imageUrl(source: SanityImageSource) {
  return builder.image(source)
}
