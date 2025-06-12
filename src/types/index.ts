import type { Blog, Comment, Reply, Donation, Gallery, Contact, User, Logger } from "@prisma/client"

export type THeaderLinks = {
    id: number;
    title: string;
    link: string;
}

export type TBlog = Pick<Blog, "id" | "title" | "slug" | "image" | "text" | "status" | "createdAt" | "userId">
export type TComment = Pick<Comment, "id" | "fullname" | "email" | "text" | "blogId" | "createdAt" | "updatedAt">
export type TReplyProps = Pick<Reply, "id" | "fullname" | "email" | "text" | "commentId" | "createdAt" | "updatedAt">
export type TAdminProps = Pick<User, "id" | "firstname" | "lastname" | "email" | "image" | "password" | "role" | "status" | "token" | "createdAt" | "updatedAt">
export type TContactProps = Pick<Contact, "id" | "fullname" | "email" | "message" | "status" | "createdAt" | "updatedAt">
export type TDonationProps = Pick<Donation, "id" | "fullname" | "email" | "amount" | "currency" | "message" | "status" | "reference" | "visiblity" | "createdAt" | "updatedAt">
export type TGalleryProps = Pick<Gallery, "id" | "title" | "image" | "status" | "createdAt" | "updatedAt">
export type TLoggerProps = Pick<Logger, "id" | "message" | "userId" | "status" | "createdAt" | "updatedAt">


export type TAuthUser = Pick<TAdminProps, "id" | "firstname" | "lastname" | "image" | "email" | "role">

export type TBlogItemProp = TBlog & {
    user: {
        id: string
        firstname: string
        lastname: string
        image: string
    },
    comments: TCommentProps[]
}

export type TCommentProps = TComment & {
    replies: TReplyProps[]
}

export type TAuthProps = {
    firstname: string
    lastname: string
    email: string
    password: string
    confPassword: string
}
// export type TDonationProps = TDonation & {
//     updatedBy: string
// }

// export type TGalleryProps = TDonation & {
//     updatedBy: string
//     userId: string
// }