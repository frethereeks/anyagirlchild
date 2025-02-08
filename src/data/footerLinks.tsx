import { FootLinkProps } from '@/types'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoWhatsapp } from 'react-icons/io'
import { IoMailUnread } from 'react-icons/io5'



export const footerLinks : FootLinkProps[] = [
    {
        id: 82347231,
        title: "EDIMCS",
        label: "EDIMCS is one of the largest cooperative organizations in Nigeria and in the world, with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal.",
        sublinks: []
    },
    {
        id: 82347232,
        title: "Quick Links",
        label: "",
        sublinks: [
            {
                id: 823472321,
                title: "Home",
                url: "/",
                icon: ""
            },
            {
                id: 823472322,
                title: "About",
                url: "/about",
                icon: ""
            },
            {
                id: 823472323,
                title: "Money Pool",
                url: "/money-pool",
                icon: ""
            },
            {
                id: 823472324,
                title: "Contact",
                url: "/contact",
                icon: ""
            },
        ]
    },
    {
        id: 82347233,
        title: "Social",
        label: "",
        sublinks: [
            {
                id: 823472331,
                title: "Facebook",
                url: "https://www.facebook.com/profile.php?id=61553709279648&mibextid=ZbWKwL",
                icon: <IoLogoFacebook className="text-inherit" />,
            },
            {
                id: 823472332,
                title: "Instagram",
                url: "https://instagram.com/edimcs_ng?igshid=OGQ5ZDc2ODk2ZA",
                icon: <IoLogoInstagram className="text-inherit" />
            },
            {
                id: 823472333,
                title: "Whatsapp",
                url: "https://wa.link/t01thy",
                icon: <IoLogoWhatsapp className="text-inherit" />
            },
            {
                id: 823472334,
                title: "Send a Mail",
                url: "mailto: admin@edimcs.com",
                icon: <IoMailUnread className="text-inherit" />
            },
        ]
    },
    {
        id: 82347234,
        title: "Legal & Sitemap",
        label: "",
        sublinks: [
            {
                id: 823472341,
                title: "Privacy Policy",
                url: "/privacy-policy",
                icon: ""
            },
            {
                id: 823472342,
                title: "Terms & Condition",
                url: "/terms-and-conditions",
                icon: ""
            },
            {
                id: 823472343,
                title: "Cookie Policy",
                url: "/cookie-policy",
                icon: ""
            },
            {
                id: 823472344,
                title: "Sitemap",
                url: "/sitemap.xml",
                icon: ""
            },
        ]
    },
    
    

]