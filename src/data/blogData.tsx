import { ASSET_URL } from "@/assets";
import { StaticImageData } from "next/image";

export type TBlogProps = {
    image: StaticImageData | string
} & TBlogItemProp

export const blogData: TBlogProps[] = [
    {
        id: "8025620",
        title: "The Ultimate Furniture Guide for 2024",
        slug: "the-ultimate-furniture-guide-for-2024",
        category: "Collection",
        image: ASSET_URL["healthcare_nurse"],
        text: "<p>The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.</p><p>The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.</p><p>The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element. A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method.</p>",
        author: {
            id: "38025602",
            firstname: "Frederick",
            lastname: "Jones",
            image: "willow_lounge_chairs.jpg",
        },
        createdAt: new Date("4/14/2024"),
    },
    {
        id: "8025621",
        title: "Designing Dreams: Unraveling the Art of Furniture Colors",
        slug: "designing-dreams-unraveling-the-art-of-furniture-colors",
        category: "Home Decor",
        image: ASSET_URL["hungry_man"],
        text: "<p>The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.</p><p>The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.</p><p>The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element. A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method.</p>",
        author: {
            id: "38025621",
            firstname: "Godstime",
            lastname: "John",
            image: "keegan_checks_chairs.jpg",
        },
        createdAt: new Date("4/9/2024"),
    },
    {
        id: "8025622",
        title: "Elevate your Home: Get Ready for Karam-Revolution",
        slug: "elevate-your-home-get-ready-for-karam-revolution",
        category: "Inspiration",
        image: ASSET_URL["wallet"],
        text: "<p>The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.</p><p>The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.</p><p>The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element. A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method.</p>",
        author: {
            id: "38025622",
            firstname: "Esther",
            lastname: "Obama",
            image: "carravio_slim_chair.jpg",
        },
        createdAt: new Date("3/25/2024"),
    },
    {
        id: "8025623",
        title: "Discover the Perfect Combination to Spice up your Private Rooms",
        slug: "discover-the-perfect-combination-to-spice-up-your-private-rooms",
        category: "Home Decor",
        image: ASSET_URL["donation_vanunload"],
        text: "<p>The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.</p><p>The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.</p><p>The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element. A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method.</p>",
        author: {
            id: "38025623",
            firstname: "Angela",
            lastname: "Banks",
            image: "large_lagoon_lounge.jpg",
        },
        createdAt: new Date("3/3/2024"),
    },
]