import { TCommentProps } from "@/types";

export const allComments: TCommentProps[] = [
    {
        id: "28982340",
        fullname: "Abidemi Johnson",
        email: "abidemijohnson@gmail.com",
        text: "You think I am stupid enough to not know what is going on and figure what you are trying to do? You must think so 'highly' of me if you really believe that.",
        createdAt: new Date("3/25/2024"),
        updatedAt: new Date("3/25/2024"),
        blogId: "8025622",
        replies: []
    },
    {
        id: "28982341",
        fullname: "Sarah Connor",
        email: "sarahconnor@gmail.com",
        text: "This is a very good read. I honestly wanted it to continue making me feel engrossed and pulled in. It really showcased the level of creativity and empathy the author has",
        createdAt: new Date("3/20/2025"),
        updatedAt: new Date("4/20/2025"),
        blogId: "8025622",
        replies: [
            {
                id: "289823410",
                fullname: "Abidemi Johnson",
                email: "abidemijohnson@gmail.com",
                text: "You are right sis. I almost couldn't believe how sold out I was to the article until you mentioned it",
                createdAt: new Date("3/25/2025"),
                updatedAt: new Date("3/25/2025"),
                commentId: "28982341",
            },
            {
                id: "289823411",
                fullname: "Daniel Anderson",
                email: "danielanderson@gmail.com",
                text: "Small teams and individual designers need a space where they can watch the design process unfold, both for themselves and for the people they work with.",
                createdAt: new Date("4/25/2025"),
                updatedAt: new Date("4/25/2025"),
                commentId: "28982341",
            },
        ]
    },
]