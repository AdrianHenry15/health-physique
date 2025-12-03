import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../live";

export const getAllPosts = async () => {
    const ALL_POSTS = defineQuery(`
        *[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            publishedAt,
            mainImage {
                asset->{
                    _id,
                    url
                },
                alt
            },
            author->{
                _id,
                name
            },
            blogCategories[]->{
                _id,
                title
            },
            body
        }
    `);

    try {
        const posts = await sanityFetch({
            query: ALL_POSTS,
        });

        return posts.data || [];
    } catch (error) {
        console.error("Error fetching all Posts:", error);
        return [];
    }
};
