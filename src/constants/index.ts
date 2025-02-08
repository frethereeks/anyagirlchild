
export const DEFAULT_PAGE_SIZE = 12
export type IDENTIFIED_TABLES = "user" | "menu" | "contact" | "category" | "sales"

export const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/anyagirlchild",
    youtube: "https://www.youtube.com/@anyagirlchild",
    whatsapp: "https://wa.me/+2349088888733",
    instagram: "https://www.instagram.com/anyagirlchild"
}

export const SECRET = process.env.JWT || 'a82357yxa.19848iaa069asf6000196'
export const MAX_AGE = 60 * 60 * 24 * 2 //2days
export const randomInt = Buffer.from(crypto.randomUUID()).toString('base64')

