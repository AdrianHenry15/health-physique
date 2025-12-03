import { groq } from "next-sanity";
import { client } from "../../client";

export async function getPostBySlug(slug: string) {
    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{
            title,
            body,
            publishedAt,
            "mainImageUrl": mainImage.asset->url,
            "author": author->{
                name,
                "imageUrl": image.asset->url
            },
            "categories": blogCategories[]->{
                _id,
                title
            }
        }`,
        { slug },
    );
}
