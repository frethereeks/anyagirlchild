import type { Blog, Comment, Reply, Donation, Gallery, Contact, User, Logger } from "@prisma/client"
import { JSX } from "react";

export type THeaderLinks = {
    id: number;
    title: string;
    link: string;
}

export type TThematicProps = {
    id: string
    title: string
    description: string
    activities: string[]
}

export type TBlog = Omit<Blog, "updatedAt">
export type TComment = Pick<Comment, "id" | "fullname" | "email" | "text" | "blogId" | "createdAt" | "updatedAt">
export type TReplyProps = Pick<Reply, "id" | "fullname" | "email" | "text" | "commentId" | "createdAt" | "updatedAt">
export type TAdminProps = Pick<User, "id" | "firstname" | "lastname" | "email" | "image" | "password" | "role" | "status" | "token" | "createdAt" | "updatedAt">
export type TContactProps = Pick<Contact, "id" | "fullname" | "email" | "message" | "status" | "createdAt" | "updatedAt">
export type TDonationProps = Omit<Donation, "updatedBy">
export type TGalleryProps = Omit<Gallery, "updatedBy" | "userId">
export type TLoggerProps = Pick<Logger, "id" | "message" | "userId" | "status" | "createdAt" | "updatedAt">

export type Prettify<T> = {
    [P in keyof T]: T[P];
} & {}

export type TAuthUser = Pick<TAdminProps, "id" | "firstname" | "lastname" | "image" | "email" | "role">

export type TBlogItemProp = Prettify<TBlog & {
    user: {
        id: string
        firstname: string
        lastname: string
        image: string
    },
    comments: TCommentProps[]
}>

export type TCommentProps = Prettify<TComment & {
    replies: TReplyProps[]
}>

export type TAuthProps = {
    firstname: string
    lastname: string
    email: string
    password: string
    confPassword: string
}

export type MisVisProps = {
    id: string;
    title: string;
    icon: JSX.Element;
    description: string;
}