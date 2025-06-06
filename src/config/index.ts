export const config = {
    APP_NAME: "Anyagirl Child Foundation",
    APP_DESECRIPTION: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    APP_PRIMARY_API_BASE_URL: process.env.NEXT_PUBLIC_APP_PRIMARY_API_BASE_URL || "http://localhost:3000",
    APP_PRIMARY_API_REFRESH_TOKEN_KEY: "jwt", //has to be in sync with api
    APP_PRIMARY_API_ACCESS_TOKEN_KEY: "accessToken", //does not have to be in sync with api
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "ANYAGIRLCHILD_9ase7xq2",
    NEXT_MAIL_FROM: process.env.NEXT_MAIL_FROM,
    NEXT_MAIL_BCC: process.env.NEXT_MAIL_BCC,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || "",
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    APP_SESSION_MAX_AGE: 30 * 24 * 60 * 60,
    TOKEN_ENCRYPTION_KEY: process.env.TOKEN_ENCRYPTION_KEY || "Uwz0^axz!12i9a%yaxp0w",
    NEXT_PUBLIC_PAYSTACK_KEY: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "iNVAIWO2439Q2346",
    CLOUDINARY: {
        API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "674181944781841", //look into not exposing this values wither via api endpoint or next ....
        UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "egfpi8od",
        CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dnl81n8vu",
        API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || "sssshhhhh"
    },
}

// https://res.cloudinary.com/dnl81n8vu/image/upload/v1748023354/