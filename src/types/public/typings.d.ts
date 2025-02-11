type THeaderLinks = {
    id: number;
    title: string;
    link: string;
}

type TBlogItemProp = {
    id: string
    title: string
    slug: string
    // image?: string,
    status?: "Active" | "Pending" | "Disabled"
    text: string,
    category: string,
    createdAt: Date | string,
    author?: {
        id: string
        firstname: string
        lastname: string
        image: string
    },
}