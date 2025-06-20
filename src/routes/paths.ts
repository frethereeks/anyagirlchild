/**
 * Auth Routes.
 * This is a list of routes or pages that are used for authentication. e.g login, register etc
 */
export const authRoutes = {
    // auth
    signin: "/auth/login",
    signup: "/auth/signup",
    verify: "/auth/verify",
    logout: "/auth/logout",
};

/**
 * Admin Routes
 * This is a list of routes or pages that are used for authentication of the admin. e.g dashboard, orders management etc
 */
export const adminRoutes = {
    admindashboard: "/dashboard/overview",
    admingallery: "/dashboard/gallery",
    admincontact: "/dashboard/contact",
    adminadmin: "/dashboard/admins",
    admindonations: "/dashboard/donations",
    adminsettings: "/dashboard/settings",
    adminblogs: "/dashboard/blogs",
}

/**
 * Public Routes
 * This is a list of routes or pages that are accessible to the everyone without a need to login  e.g homepage, menu, contact us etc
 */
export const publicRoutes = {
    home: "/",
    about: "/about",
    blog: "/blog",
    singleBlog: (id: string) => `/blog/${id}`,
    gallery: "/gallery",
    contact: "/contact",
    donation: "/donation",
    partner: "/partner",
    search: "/search",
    error: "/error",
    sitemap: "/sitemap.xml",
    privacyPolicy: "/privacy-policy",
    termsAndConditions: "/terms-and-conditions",
}
/**
 * App Route Paths
 * This is a combination of all the available routes/pages i.e. authRoutes, adminRoutes, publicRoutes etc
 */
export const appRoutePaths = {
    ...authRoutes,
    ...adminRoutes,
    ...publicRoutes,
    // googleMap: `https://maps.app.goo.gl/7q2hgr9obyQ3n1BUA`
    googleMap: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63046.03375002715!2d7.4210509825374!3d9.029321524200391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1035165ba88bee7d%3A0xdf337f9cbe52f432!2sWara%2C%20Kebbi%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1731548770732!5m2!1sen!2sus`
}