export const config = {
    APP_NAME: "Anyagirl Child Foundation",
    APP_DESECRIPTION: "Anya Girlchild Foundation was born from a deep-seated personal experience with the challenges many young girls face in pursuing an education and achieving their full potential.",
    APP_PRIMARY_API_BASE_URL: process.env.NEXT_PUBLIC_APP_PRIMARY_API_BASE_URL || "http://localhost:3000",
    APP_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    APP_PRIMARY_API_REFRESH_TOKEN_KEY: "jwt", //has to be in sync with api
    APP_PRIMARY_API_ACCESS_TOKEN_KEY: "accessToken", //does not have to be in sync with api
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "ANYAGIRLCHILD_9ase7xq2",
    NEXT_MAIL: {
        HOST: process.env.NEXT_MAIL_HOST,
        PORT: process.env.NEXT_MAIL_PORT,
        USERNAME: process.env.NEXT_MAIL_USERNAME,
        PASSWORD: process.env.NEXT_MAIL_PASSWORD,
        RECEIVER: process.env.NEXT_MAIL_RECEIVER,
        NOREPLY: process.env.NEXT_MAIL_NOREPLY,
        FROM: process.env.NEXT_MAIL_USERNAME,
        BCC: process.env.NEXT_MAIL_BCC,
    },
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || "",
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    APP_SESSION_MAX_AGE: 30 * 24 * 60 * 60,
    TOKEN_ENCRYPTION_KEY: process.env.TOKEN_ENCRYPTION_KEY || "Uwz0^axz!12i9a%yaxp0w",
    PAYSTACK: {
        PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PKEY || "PUBL1CKEY=W#NTW0RK",
        SECRET_KEY: process.env.NEXT_PAYSTACK_SKEY || "SECR3T=W#NTW0RK",
    },
    CLOUDINARY: {
        API_KEY: process.env.NEXT_CLOUDINARY_API_KEY || "674181944781841", //look into not exposing this values whether via api endpoint or next ....
        UPLOAD_PRESET: process.env.NEXT_CLOUDINARY_UPLOAD_PRESET || "TH#5I5wR0NG",
        CLOUD_NAME: process.env.NEXT_CLOUDINARY_CLOUD_NAME || "MU5TB3wR0NG",
        API_SECRET: process.env.NEXT_CLOUDINARY_API_SECRET || "D0nT3xP053"
    },
}