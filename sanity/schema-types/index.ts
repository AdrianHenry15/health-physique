import { type SchemaTypeDefinition } from "sanity"

import { blockContentType } from "./blogs/block-content-type"
import { blogCategoryType } from "./blogs/blog-category-type"
import { postType } from "./blogs/post-type"
import { authorType } from "./blogs/author-type"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, postType, authorType, blogCategoryType],
}
