import { defineQuery } from "next-sanity"
import { sanityClient } from "../../client"

export const getAllAuthors = async () => {
  const ALL_AUTHORS = defineQuery(`
        *[_type == "author"] | order(name asc) {
            _id,
            name,
            image
        }
    `)

  try {
    // Fetch data using sanityClient
    const authors = await sanityClient.fetch(ALL_AUTHORS)

    // Return the list of authors, or an empty array if none are found
    return authors || []
  } catch (error) {
    console.error("Error fetching all Authors:", error)
    return []
  }
}
