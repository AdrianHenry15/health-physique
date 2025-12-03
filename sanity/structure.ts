import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title("Blog")
        .items([
            S.documentTypeListItem("post").title("Posts"),
            S.documentTypeListItem("blogCategory").title("Blog Categories"),
            S.documentTypeListItem("author").title("Authors"),
            S.divider(),
            S.documentTypeListItem("newsletter").title("Newsletters"),
            S.documentTypeListItem("promotion").title("Promotions"),
            S.documentTypeListItem("faq").title("Faqs"),
            S.documentTypeListItem("faqCategory").title("Faq Categories"),
            ...S.documentTypeListItems().filter(
                (item) =>
                    item.getId() &&
                    !["post", "faqCategory", "blogCategory", "author", "newsletter", "promotion", "faq"].includes(item.getId()!),
            ),
        ]);
