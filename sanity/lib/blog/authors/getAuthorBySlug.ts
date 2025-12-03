import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const getauthorBySlug = async (slug: string) => {
    const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == "author" && slug.current == $slug] | order(name asc) [0]
`);

    try {
        // Use sanityFetch to send the query with the slug as a parameter
        const author = await sanityFetch({
            query: AUTHOR_BY_ID_QUERY,
            params: {
                slug,
            },
        });

        // Return the product data or null if not found
        return author.data || null;
    } catch (error) {
        console.error("Error fetching author by ID:", error);
        return null;
    }
};
