"use server"
import { authOptions } from "@/lib/authOptions";
import plimit from "p-limit"
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { capitalize, emailTemplate, logAction, prisma } from "@/lib";
import { appRoutePaths } from "@/routes/paths";
import { $Enums } from "@prisma/client";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs"
import { generateSlug } from "@/lib";
import { blogFolder, galleryFolder, IDENTIFIED_TABLES, profileFolder } from "@/constants";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { config } from "@/config";
import { TCommentProps } from "@/types";
import { sendMail } from "@/lib/logAction";
import path from "path";

// console.log({config})

const limit = plimit(10)

// common form data
const userData = (data: FormData) => ({
    firstname: data?.get("firstname")?.valueOf() as string,
    lastname: data?.get("lastname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    image: data?.get("image")?.valueOf() as File,
    plainPassword: data?.get("password")?.valueOf() as string,
    verifyPassword: data?.get("verifyPassword")?.valueOf() as string,
    role: data?.get("role")?.valueOf() as $Enums.Role || "Root",
})

const donationData = (data: FormData) => ({
    fullname: data?.get("fullname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    currency: data?.get("currency")?.valueOf() as string,
    amount: data?.get("amount")?.valueOf() as unknown as number,
    message: data?.get("message")?.valueOf() as string,
    reference: data?.get("reference")?.valueOf() as string,
    status: data?.get("status")?.valueOf() as $Enums.DoneStatus,
})

const contactData = (data: FormData) => ({
    fullname: data?.get("fullname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    phone: data?.get("phone")?.valueOf() as string,
    message: data?.get("message")?.valueOf() as string,
    status: data?.get("status")?.valueOf() as $Enums.ContactStatus,
})

const blogData = (data: FormData) => ({
    title: data?.get("title")?.valueOf() as string,
    image: data?.get("image")?.valueOf() as File,
    text: data?.get("text")?.valueOf() as string,
    status: data?.get("status")?.valueOf() as $Enums.ViewStatus,
})


export const fetchUserDetails = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const data = await prisma.user.findFirst({
        where: { id: user?.id },
        select: { id: true, firstname: true, lastname: true, image: true, email: true, password: true, role: true, status: true }
    })
    // console.log({ user, data })
    if (!data) {
        signOut()
        redirect(appRoutePaths.signin)
    }
    return data;
}

export const verifyUser = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        signOut()
        redirect(appRoutePaths.signin)
    }
    return user;
}


// Reset and Password Functions
export const handleReset = async (email: string) => {
    const validMail = await prisma.user.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have a user with this email...Please, confirm and try again` };
    try {
        const token = randomUUID()
        const user = await prisma.user.update({
            where: { email },
            data: { token }
        })
        const fullname = `${user.firstname} ${user.lastname}`
        // User EMail
        const button = `<a href="${config.APP_PRIMARY_API_BASE_URL}/auth/verify?email=${email}&token=${token}" target="_blank" style="font-weight: 700; background: #16a394; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px; line-height: 20px; text-align: center; margin: 0 auto; width: max-content; padding: 4px 24px; margin-top: 4px;">Click Here</a>`;
        const message = `A password reset was initiated by <a href="${appRoutePaths.adminuser}" class="color: inherit !important; font-weight: 700;">#${user.id}: ${capitalize(fullname)}</a>`
        await logAction({ userId: user.id, actionType: "reset", message, html: emailTemplate({ message: button, intro: `We have received your request to reset your password. Click the button below or ignore this message if you didn't initiate this action.` }), emailNotification: true, receiver: user.email })

        // Admin EMail Copy
        await logAction({ userId: user.id, actionType: "reset", message, html: emailTemplate({ message, intro: `${capitalize(fullname)} initiated a password reset!` }), emailNotification: true, })
        revalidatePath(appRoutePaths.signin)
        return { error: false, message: `Password Reset Link has been sent to your email...` };
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "reset", message: `Activity: Password Reset Handling. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
    }
}

export const handlePasswordReset = async ({ email, password: plainPassword }: { email: string, password: string }) => {
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    const validMail = await prisma.user.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have an account with this email...Please, confirm and try again` };
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { password, token: "" }
        })
        const fullname = `${user.firstname} ${user.lastname}`
        await logAction({ userId: user.id, actionType: "reset", message: `<a href="${appRoutePaths.adminuser}" class="color: inherit !important; font-weight: 700;">#${user.id}: ${capitalize(fullname)}</a> successfully performed a password reset on ${new Date(user.updatedAt).toDateString()}` })
        revalidatePath(appRoutePaths.signin)
        return { error: false, message: `Password reset is successful.` };
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "reset", message: `Activity: Password Update/Change. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

export const handleTokenVerification = async (email: string, token: string) => {
    try {
        const validMail = await prisma.user.findFirst({ where: { email, token } })
        if (!validMail) return { error: true, message: `We do not have an account with these details...Perhaps, this is an old link` };
        else {
            await logAction({ userId: "Visitor", actionType: "reset", message: `User with email: <a href="${appRoutePaths.adminuser}" class="color: inherit !important; font-weight: 700;">${capitalize(email)}</a> came for password reset` })
            return { error: false, message: `Success! Please, complete the process by choosing a new password` }
        };
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "reset", message: `Activity: Email token verification. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

// Analytics Data
export const fetchDashboardData = async () => {
    const user = await verifyUser()
    try {
        const [adminData, donationData, galleryData, blogData] = await prisma.$transaction([
            prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.donation.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.gallery.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.blog
                .findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        ])
        return { error: false, message: 'Dashboard data fetched successfully', data: { adminData, donationData, galleryData, blogData } }
    } catch (error) {
        await logAction({ userId: user.id, actionType: "view", message: `Activity: Fetch Dashbaord Data. Error: ${error}`, isError: true })
        return { error: true, message: 'Unable to fetch dashboard data. Please, try again', data: { adminData: [], donationData: [], galleryData: [], blogData: [] } }
    }
}

export const fetchDonationStats = async ({
    year,
    month,
}: {
    year: number;
    month?: number | 'all';
}) => {
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
        createdAt: { gte: start, lt: end },
    };

    if (month && month !== 'all') {
        where.createdAt = {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
        };
    }
    console.log({ where })
    // const results = await prisma.$queryRaw<
    //     Array<{ month: number; total: number }>
    // >`SELECT 
    //   EXTRACT(MONTH FROM createdAt) AS month,
    //   SUM(amount) AS total
    // FROM Donation
    // WHERE createdAt >= ${where.createdAt.gte} AND createdAt < ${where.createdAt.lt}
    // GROUP BY month
    // // ORDER BY month ASC;`;
    const query = await prisma.$queryRaw<Array<{ month: string, currency: string, total: number }>>`SELECT EXTRACT(MONTH FROM createdAt) AS month, currency, SUM(amount) AS total FROM donation WHERE createdAt >= ${where.createdAt.gte} AND createdAt < ${where.createdAt.lt} GROUP BY month, currency ORDER BY month, currency ASC;`;
    const result = query.map(row => ({ month: Number(row.month), currency: row.currency, total: Number(row.total) }))
    console.log({ result })

    // return { result: JSON.stringify(results) }; // [{ month: 1, total: 5000 }, ...]
    return { result: JSON.stringify(result) }; // [{ month: 1, total: 5000 }, ...]
};


// User
export const createUser = async (data: FormData) => {
    const user = await verifyUser()
    const { email, firstname, lastname, plainPassword, role, } = userData(data)
    try {
        const userExists = await prisma.user.findFirst({
            where: { email: email.toLowerCase() }
        })
        if (userExists) {
            return { error: true, message: `This email already exists. Please, try another` }
        }
        else {
            const image = "https://res.cloudinary.com/dnl81n8vu/image/upload/v1748067439/anyagirlchild/profile/bag_cream_svqyv6.jpg";
            const salt = await bcryptjs.genSalt(10), password = await bcryptjs.hash(plainPassword, salt)
            await prisma.user.create({
                data: { email, firstname, lastname, password, image, status: "Pending", role: role ?? "User" }
            })
            return { error: false, message: `Welcome ${firstname} ${lastname}. A verification link has been sent to your email. Click to complete your registration.` }
        }
    } catch (error) {  
        await logAction({ userId: user.id, actionType: "view", message: `Activity: Create Admin. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong. We could not complete your request` }
    }
}

export const updateUser = async (data: FormData, type: "info" | "security") => {
    const user = await fetchUserDetails()
    const newImage = data.get("newImage")?.valueOf() as unknown as string;
    let file = data.get("oldImage")?.valueOf() as string;
    try {
        if (type === "info") {
            const { email, firstname, lastname, image } = userData(data)
            if (newImage === "true" && (typeof (image) !== "string" && image?.size !== 0)) {
                // If it gets here, it means, they supplied a new image and we'd upload that to cloudinary
                const res = await uploadImage(image, profileFolder, file!)
                // Replace the image name to use with the result from the upload
                file = res?.secure_url
            }
            const userExists = await prisma.user.findFirst({
                where: {
                    email: email.toLowerCase(),
                    NOT: { id: user.id }
                }
            })
            if (userExists) {
                return { error: true, message: `This email already exists and it belongs to another user. Please, try another` }
            }
            else {
                await prisma.user.update({
                    data: { email, firstname, lastname, image: file },
                    where: { id: user.id }
                })
                return { error: false, message: `Your profile has been updated successfully` }
            }
        }
        else {
            const password = data.get("password")?.valueOf() as string
            const plainPassword = data.get("newPassword")?.valueOf() as string
            const matchPassword = await bcryptjs.compare(password, user.password)
            console.log({ password, plainPassword, matchPassword })
            if (!matchPassword) {
                return { error: true, message: `Your security password does not match your current. Please, check and try again` }
            }
            else {
                const salt = await bcryptjs.genSalt(10), newPassword = await bcryptjs.hash(plainPassword, salt)
                await prisma.user.update({
                    data: { password: newPassword },
                    where: { id: user.id }
                })
                return { error: false, message: `Your profile has been updated successfully` }
            }
        }
    } catch (error) {  
        await logAction({ userId: user.id, actionType: "update", message: `Activity: Update Admin Failed. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong. We could not complete your request` }
    }
}

export const updateUserImage = async (data: FormData) => {
    const image = data.get("image")?.valueOf() as File
    const id = data.get("id")?.valueOf() as string
    const oldImage = data.get("oldImageName")?.valueOf() as string
    try {
        // set the image to their previous image value
        let file = oldImage;
        const stringifiedImage = image as unknown as string
        // Check if they supplied a new image so, we'd upload it 
        if ((typeof (image) !== "string" && image?.size !== 0) || stringifiedImage !== "") {
            // If it gets here, it means, they supplied a new image and we'd upload that to cloudinary
            const res = await uploadImage(image, profileFolder, file!)
            // Replace the image name to use with the result from the upload
            file = res?.secure_url
        }
        await prisma.user.update({
            data: { image: file, },
            where: { id }
        })
        // Update the page to reflect modified record
        revalidatePath(appRoutePaths.adminsettings)
        return { error: false, message: `Record updated successfully.` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Unable to update this record`, }
    }
}

export const fetchAllUsers = async () => {
    await verifyUser()
    try {
        const data = await prisma.user.findMany({
            orderBy: { createdAt: "desc" }
        })
        return { error: true, message: `All users fetched successfully.`, data }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "view", message: `Activity: Fetch Dashbaord Data. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to delete blog. Please, try again.` }
    }
}

export const fetchSingleUsers = async (id: string) => {
    await verifyUser()
    try {
        const data = await prisma.user.findFirst({
            where: { id },
        })
        return { error: true, message: `User record found successfully.`, data }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "view", message: `Activity: Fetch Single Blog. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to delete blog. Please, try again.` }
    }
}


// Blog
export const fetchBlogPosts = async (start?: number, end?: number) => {
    try {
        const data = await prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
            take: end ? end : undefined,
            skip: start ? start : undefined,
            include: {
                comments: {
                    include: {
                        replies: true
                    }
                },
                user: {
                    select: { id: true, firstname: true, lastname: true, image: true }
                }
            },
        })
        return { error: false, message: `Blog post successfully fetched.`, data }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "view", message: `Activity: Fetch Dashbaord Data. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to fetch blog. Please, try again later or check your network connection.` }
    }
}

export const fetchSingleBlogPost = async ({ slug }: { slug: string }) => {
    try {
        const data = await prisma.blog.findFirst({
            where: { slug },
            orderBy: { createdAt: "desc" },
            include: {
                comments: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        replies: {
                            orderBy: { createdAt: "desc" },
                        }
                    }
                },
                user: {
                    select: { id: true, firstname: true, lastname: true, image: true }
                }
            }
        })
        const [previous, next] = await Promise.all([
            prisma.blog.findFirst({
                where: { createdAt: { lt: data?.createdAt } },
                select: { id: true, title: true, slug: true, image: true, },
                orderBy: { createdAt: "desc" }
            }),
            prisma.blog.findFirst({
                where: { createdAt: { gt: data?.createdAt } },
                select: { id: true, title: true, slug: true, image: true, },
                orderBy: { createdAt: "asc" }
            }),
        ])
        return { error: false, message: `Blog post successfully fetched.`, data, next, previous }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "view", message: `Activity: Fetch Dashbaord Data. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to fetch blog. Please, try again later or check your network connection.` }
    }
}

export const createBlog = async (data: FormData) => {
    const user = await verifyUser()
    const { image, title, text, status } = blogData(data)
    const slug = generateSlug(title)
    try {
        const blogExists = await prisma.blog.findFirst({
            where: { title: title.trim().toLowerCase() }
        })
        if (blogExists) {
            return { error: true, message: `A blog with this title already exists. Please, try another` }
        }
        const res = await uploadImage(image, blogFolder)
        const file = res?.secure_url
        const blog = await prisma.blog.create({
            data: { image: file, slug, title: title.trim().toLowerCase(), text, status, userId: user.id }
        })
        const message = `A new post titled <a href="${appRoutePaths.blog}/${blog.slug}" class="color: inherit !important; font-weight: 700;">#${blog.id}: ${blog.title}</a> was created on ${new Date(blog.createdAt).toDateString()}` 
        await logAction({ userId: user.id, actionType: "create", message, html: emailTemplate({ message, intro: `${user.name} created a new blog post!` }), emailNotification: true, })
        return { error: false, message: `Congratulations! Your new blog post has been created successfully.` }
    } catch (error) {  
        await logAction({ userId: user.id, actionType: "view", message: `Activity: Fetch Dashbaord Data. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const updateBlog = async (data: FormData) => {
    const user = await verifyUser()
    const { image, title, text, status } = blogData(data)
    const id = data.get("id")?.valueOf() as string
    const oldImage = data?.get("oldImage")?.valueOf() as string
    const newImage = data.get("newImage")?.valueOf() as string
    const slug = generateSlug(title)
    let file = oldImage;
    try {
        const blogExists = await prisma.blog.findFirst({
            where: {
                title: title.trim().toLowerCase(),
                slug,
                NOT: { id }
            },
        })
        if (blogExists) {
            return { error: true, message: `A blog with this title already exists. Please, try another` }
        }
        else {
            if (newImage === "true") {
                const res = await uploadImage(image, blogFolder, oldImage)
                file = res?.secure_url
            }
            const blog = await prisma.blog.update({
                data: { image: file, slug, title, text, userId: user.id, status },
                where: { id }
            })
            const message = `${user.name} updated the post <a href="${appRoutePaths.blog}/${blog.slug}" class="color: inherit !important; font-weight: 700;">#${blog.id}: ${blog.title}</a> with status as (${blog.status}) on ${new Date(blog.updatedAt).toDateString()}` 
            await logAction({ userId: user.id, actionType: "update", message})
        }
        return { error: false, message: `Your blog post has been updated successfully.` }
    } catch (error) {  
        await logAction({ userId: user.id, actionType: "view", message: `Activity: Update Blog Failed. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

// Comments
export const fetchComments = async ({ blogId }: { blogId: string }) => {
    try {
        const data = await prisma.comment.findMany({
            where: { blogId },
            include: {
                replies: {
                    orderBy: { createdAt: "desc" },
                }
            },
            orderBy: { createdAt: "desc" }
        })
        return { error: true, message: "Comments fetched Successfully", data }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "view", message: `Activity: Fetch Comment. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const createComment = async (data: { blogId: string, fullname: string, email: string, text: string }) => {
    const { blogId, fullname, email, text } = (data)
    try {
        const data = await prisma.comment.create({
            data: { fullname, email, text, blogId }
        }) as TCommentProps
        return { error: false, message: `Comment posted successfully.`, data }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "create", message: `Activity: Fetch Dashbaord Data. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to post comment. Please, try again.` }
    }
}

export const updateComment = async (data: { id: string, fullname: string, email: string, text: string }) => {
    const session = await getServerSession(authOptions);
    const { id, fullname, email, text } = (data)
    try {
        await prisma.comment.update({
            data: { fullname, email, text },
            where: { id }
        })
        await logAction({ userId: session?.user?.id ?? "Visitor", actionType: "update", message: `Activity: ${session?.user?.name ?? "Visitor"} updated comment with id ${id}.` })
        return { error: false, message: `Comment updated successfully.`, data: undefined }
    } catch (error) {  
        await logAction({ userId: session?.user?.id ?? "Visitor", actionType: "update", message: `Activity: ${session?.user?.name ?? "Visitor"} could not update comment #${id}. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to update comment. Please, try again.` }
    }
}

export const deleteComment = async (id: string) => {
    const session = await getServerSession(authOptions);
    try {
        const comment = await prisma.comment.delete({
            where: { id },
        })
        await logAction({ userId: session?.user?.id ?? "Visitor", actionType: "update", message: `Activity: ${session?.user?.name ?? "Visitor"} deleted a comment by ${comment.fullname}.` })
        return { error: false, message: `Comment successfully deleted.` }
    } catch (error) {  
        await logAction({ userId: session?.user?.id ?? "Visitor", actionType: "update", message: `Activity: ${session?.user?.name ?? "Visitor"} could not delete comment #${id}. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to delete comment. Please, try again.` }
    }
}

export const createReply = async (values: { commentId: string, fullname: string, email: string, text: string }) => {
    const { commentId, fullname, email, text } = (values)
    try {
        const data = await prisma.reply.create({
            data: { fullname, email, text, commentId }
        })
        return { error: false, message: `Reply posted successfully.`, data }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "view", message: `Activity: User could not post reply. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to post reply. Please, try again.` }
    }
}

export const deleteReply = async (id: string) => {
    const session = await getServerSession(authOptions);
    try {
        const reply = await prisma.reply.delete({
            where: { id },
        })
        await logAction({ userId: session?.user?.id ?? "Visitor", actionType: "update", message: `Activity: ${session?.user?.name ?? "Visitor"} deleted a reply by ${reply.fullname} to the comment #${reply.commentId}.` })
        return { error: false, message: `Reply successfully deleted.` }
    } catch (error) {
        await logAction({ userId: session?.user?.id ?? "Visitor", actionType: "update", message: `Activity: ${session?.user?.name ?? "Visitor"} could not delete reply #${id}. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to delete reply. Please, try again.` }
    }
}

// Contact
export const fetchContact = async () => {
    const user = await verifyUser()
    try {
        const data = await prisma.contact.findMany({
            orderBy: { createdAt: "desc" }
        })
        return { data }
    } catch (error) {  
        await logAction({ userId: user.id, actionType: "view", message: `Activity: ${user.name} could not view contact list. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const createContact = async (data: FormData) => {
    const { fullname, email, message } = contactData(data)
    try {
        await prisma.contact.create({
            data: { fullname, email, message }
        })
        await logAction({ userId: "Visitor", actionType: "create", message, html: emailTemplate({ fullname, email, message, intro: `You have a <a href="${appRoutePaths.admincontact}" class="color: inherit !important; font-weight: 700;">new message</a> from ${fullname}.`}), emailNotification: true, receiver: email })
        return { error: false, message: `Thanks for contacting us ${fullname}. We will get back to you as soon as possible.` }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "create", message: `Activity: Send Contact Message Failed. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const updateContactStatus = async (id: string) => {
    const user = await verifyUser()
    try {
        const contact = await prisma.contact.update({
            where: { id },
            data: { status: "Read" }
        })
        const message = `${user.name} viewed the message <a class="color: inherit !important; font-weight: 700;" href="${appRoutePaths.admincontact}">#${contact.id}: ${contact.fullname}</a> on ${new Date(contact.updatedAt).toDateString()}`
        await logAction({ userId: user.id, actionType: "update", message, })
        return { error: false, message: `Contact message viewed.` }
    } catch (error) {  
        await logAction({ userId: user.id, actionType: "update", message: `Unable to update. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to delete contact. Please, try again.` }
    }
}

// Donation
export const createDonation = async (data: FormData) => {
    const { amount, currency, fullname, email, message, status, reference } = donationData(data)
    try {
        const donation = await prisma.donation.create({
            data: { amount: +amount, currency, fullname, email, message, status, reference }
        })
        const text = `${fullname} just made a <a href="${appRoutePaths.admindonations}" class="color: inherit !important; font-weight: 700;">donation</a> worth ${currency}${amount} on ${new Date(donation.createdAt).toDateString()}`
        await logAction({ userId: "Visitor", actionType: "create", message: text, html: emailTemplate({ fullname, email, amount, message, intro: text }), emailNotification: true, })
        return { error: false, message: `Thank you for your donation of ${currency}${amount} to our foundation.` }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "create", message: `Activity: ${fullname} Donation Failed. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to perform donation. Please, try again.` }
    }
}

export const fetchDonations = async () => {
    const user = await verifyUser()
    try {
        const data = await prisma.donation.findMany({
            orderBy: { createdAt: "desc" }
        })
        // await publicScreenLog("Activity: View Donations", { fullname: user.name!, email: user.email! }, "view", `A visiter named ${fullname} sent you a message`, true)
        await logAction({ userId: user.id, actionType: "create", message: `${user.name} viewed the donation record`, })
        return { error: false, message: `Donation fetched successfully.`, data }
    } catch (error) {  
        await logAction({ userId: user.id, actionType: "view", message: `Activity: View Donation Failed. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}


// Gallery
export const fetchGalleryImages = async (start?: number, end?: number) => {
    try {
        const data = await prisma.gallery.findMany({
            orderBy: { createdAt: "desc" },
            take: end ? end : undefined,
            skip: start ? start : undefined,
        })
        return { error: false, message: `Gallery images fetched successfully`, data }
    } catch (error) {  
        await logAction({ userId: "Visitor", actionType: "view", message: `Activity: Fetch Photos Gallery failed. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to fetch gallery images`, data: [] }
    }
}

export const createGalleryImage = async (data: FormData) => {
    const user = await verifyUser()
    const title = data?.get("title")?.valueOf() as string
    const status = data?.get("status")?.valueOf() as $Enums.ViewStatus
    const images = data.getAll("image") as File[]

    try {
        const uploads = images.map((image) =>
            limit(() => uploadImage(image, galleryFolder))
        );
        const allUploadedFiles = await Promise.all(uploads);

        // Extract secure_urls from results
        const allFiles = allUploadedFiles
            .map((res) => res?.secure_url)
            .filter(Boolean);

        // Insert into DB concurrently
        await Promise.all(
            allFiles.map((file) =>
                prisma.gallery.create({
                    data: { title, image: file, status },
                })
            )
        );
        await logAction({ userId: user.id, actionType: "create", message: `${images.length} new gallery image${images.length ? 's' : ''} was created` })
        return { error: false, message: `New gallery image(s) uploaded successfully.` }
    } catch (error) {
        await logAction({ userId: user.id, actionType: "create", message: `Activity: ${user.name} could not create gallery photo record: Error: ${error}` })
        return { error: true, message: `Unable to complete your request to upload image. Please, try again.` }
    }
}

export const updateGalleryImage = async (data: FormData) => {
    const user = await verifyUser()
    const id = data?.get("id")?.valueOf() as string
    const title = data?.get("title")?.valueOf() as string
    const newImage = data?.get("newImage")?.valueOf() as string
    const oldImage = data?.get("oldImage")?.valueOf() as string
    const image = data?.get("image")?.valueOf() as File[]
    const status = data?.get("status")?.valueOf() as $Enums.ViewStatus
    let file = oldImage;
    if (newImage === "true") {
        const res = await uploadImage(image[0], galleryFolder, oldImage)
        file = res?.secure_url
    }
    try {
        const item = await prisma.gallery.update({
            data: { title, image: file, status },
            where: { id }
        })
        const message = `${user.name} updated a photo ${newImage === "true" ? 'to a new one' : ` (${status})`} <a class="color: inherit !important; font-weight: 700;" href="${appRoutePaths.admingallery}">#${item.id}</a> on ${new Date(item.updatedAt).toDateString()}`
        await logAction({ userId: user.id, actionType: "update", message, })
        return { error: false, message: `Gallery image updated successfully.` }
    } catch (error) {
        await logAction({ userId: user.id, actionType: "update", message: `${user.name} could not update gallery photo record. Error: ${error}` })
        return { error: true, message: `Unable to complete your request to update image. Please, try again.` }
    }
}

// Logger
export const fetchLogs = async () => {
    const user = await verifyUser()
    try {
        const logs = await prisma.logger.findMany({
            orderBy: { createdAt: "desc" },
        })
        const data = await Promise.all(logs.map( async (log) => {
            if (log.userId !== "Visitor") {
                const user = await prisma.user.findUnique({ where: { id: log.userId! } })
                return {...log, fullname: capitalize(`${user?.firstname} ${user?.lastname}`)}
            }
            else return {...log, fullname: 'Visitor'}
        }))
        console.log({logData: data})
        // await publicScreenLog("Activity: View Donations", { fullname: user.name!, email: user.email! }, "view", `A visiter named ${fullname} sent you a message`, true)
        return { error: false, message: `Partner fetched successfully.`, data }
    } catch (error) {
        await logAction({ userId: user.id, actionType: "create", message: `Activity: Fetch Partners/Volunteers. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

// Partner
export const createPartner = async (data: { fullname: string, email: string, message?: string, type: $Enums.PartnerType }) => {
    const { fullname, email, type, message } = (data)
    try {
        const partner = await prisma.partner.create({
            data: { fullname, email, message, type }
        })
        const activity = `${fullname} just showed an interest in the <a href="${appRoutePaths.admindonations}" class="color: inherit !important; font-weight: 700;">${type} form</a> on ${new Date(partner.createdAt).toDateString()}`
        await logAction({ userId: "Visitor", actionType: "create", message: activity, html: emailTemplate({ fullname, email, message: partner.message!, intro: activity }), emailNotification: true })
        const userActivity = `Thank you for showing interest in being our ${type}. We are excited to start this journey with you find attached the ${type} form. Kindly fill it out and send back to us.`
        const fileName = type === "Volunteer" ? "/ANYA-GIRLCHILD-FOUNDATION-VOLUNTEER-FORM.docx" : "/ANYA-GIRLCHILD-FOUNDATION-PARTNERSHIP-PROPOSAL-LETTER.docx";
        const fileUrl = path.join(process.cwd(), 'public', fileName)
        await sendMail({ receiver: email, actionType: "create", message: userActivity, html: emailTemplate({ fullname, email, message: partner.message!, intro: userActivity }), emailNotification: true, attachments: [{ filename: `Anyagirlchild Foundation ${capitalize(type)} Form`, path: fileUrl, encoding: "utf-8"}]  })
        return { error: false, message: `Thank you for showing interest in being our ${type}. Please, check your mail for the ${type} form. Looking forward to receiving your response.` }
    } catch (error) {
        await logAction({ userId: "Visitor", actionType: "update", message: `User could not become submit ${type} form. Error: ${error}` })
        return { error: true, message: `Unable to complete your request to become a ${type}. Please, try again.` }
    }
}

export const fetchPartners = async () => {
    const user = await verifyUser()
    try {
        const data = await prisma.partner.findMany({
            orderBy: { createdAt: "desc" }
        })
        // await publicScreenLog("Activity: View Donations", { fullname: user.name!, email: user.email! }, "view", `A visiter named ${fullname} sent you a message`, true)
        return { error: false, message: `Partner fetched successfully.`, data }
    } catch (error) {
        await logAction({ userId: user.id, actionType: "create", message: `Activity: Fetch Partners/Volunteers. Error: ${error}`, isError: true })
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}


/*   === UTILITY FUNCTIONS ===  */
// UPLOAD IMAGE ACTIONS
{/**
export const uploadEntityImage = async (id: string, data: FormData, table: IDENTIFIED_TABLES, oldImageName?: string) => {
    const user = await verifyUser()
    const image = data.get("image")?.valueOf() as File
    const entityIDs = JSON.parse(id) as string[];
    console.log({ image, entityIDs })
    try {
        const folder = table === "blog" ? blogFolder : table === "gallery" ? galleryFolder : profileFolder
        console.log({ image, folder, oldImageName })
        const res = await uploadImage(image, folder, oldImageName)
        const file = res.secure_url
        switch (table) {
            case "user": {
                entityIDs.map(async (el) => {
                    await prisma.user.update({
                        where: { id: el },
                        data: { image: file }
                    })
                })
            }
                break;
            case "gallery": {
                entityIDs.map(async (el) => {
                    await prisma.gallery.update({
                        where: { id: el },
                        data: { image: file }
                    })
                })
            }
                break;
            case "blog": {
                entityIDs.map(async (el) => {
                    await prisma.blog.update({
                        where: { id: el },
                        data: { image: file }
                    })
                })
            }
                break;
            default: return { error: true, message: "Invalid upload request detected." };
        }
        const page = table === "user" ? "settings" : table
        const prefix = `${table === "gallery" ? "" : "s"}`
        const pageName = page + prefix
        const path = `/dashboard/${pageName}`
        revalidatePath(path)
        return { error: false, message: `${table} image has been successfully ${oldImageName === "" ? 'uploaded' : 'updated'}` }
    } catch (error) {
        console.log({ error })

        await logAction({ userId: user.id, actionType: "create", message: `Activity: Fetch Partners/Volunteers. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}
**/}
// DELETE ACTIONS
export const deleteEntity = async (id: string, table: IDENTIFIED_TABLES) => {
    const user = await verifyUser()
    const entityIDs = JSON.parse(id) as string[];
    const errorMsg = "";
    try {
        switch (table) {
            case "user": {
                const deleteUsers = entityIDs.map(async (el) => {
                    const user = await prisma.user.delete({
                        where: { id: el }
                    })
                    await deleteImage(user.image!)
                })
                try {
                    await Promise.allSettled(deleteUsers)
                }
                catch (err) {
                    console.log({ err })
                    return { error: true, message: "Invalid delete request detected." };
                }
            }
                break;
            case "reply": {
                await prisma.reply.deleteMany({
                    where: { id: { in: [...entityIDs] } }
                })
            }
                break;
            case "gallery": {
                entityIDs.map(async (el) => {
                    const gallery = await prisma.gallery.delete({
                        where: { id: el }
                    })
                    if (gallery.image.includes("cloudinary")) {
                        await deleteImage(gallery.image)
                    }
                })
            }
                break;
            case "donation": {
                await prisma.donation.deleteMany({
                    where: { id: { in: [...entityIDs] } }
                })
            }
                break;
            case "contact": {
                await prisma.contact.deleteMany({
                    where: { id: { in: [...entityIDs] } }
                })
            }
                break;
            case "comment": {
                await prisma.comment.deleteMany({
                    where: {
                        id: { in: [...entityIDs] },
                        replies: {
                            every: {
                                commentId: { in: [...entityIDs] }
                            }
                        }
                    }
                })
            }
                break;

            default: return { error: true, message: "Invalid delete request detected." };
        }
        const pageName = table + `${table === "contact" || table === "gallery" ? "" : "s"}`
        const path = `/dashboard/${pageName}`
        revalidatePath(path)
        await logAction({ userId: user.id, actionType: "delete", message: `Activity: ${user.name} deleted ${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} in ${table} list. `, })
        return { error: errorMsg !== "" ? true : false, message: errorMsg === "" ? `${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} has been successfully deleted` : errorMsg }
    } catch (error) {
        await logAction({ userId: user.id, actionType: "delete", message: `Activity: ${user.name} could not delete ${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} in ${table}. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}
// STATUS ACTIONS
export const updateEntity = async (id: string, status: string, table: IDENTIFIED_TABLES) => {
    const user = await verifyUser()
    const entityIDs = JSON.parse(id) as string[];
    // console.log({ entityIDs, status, table })
    try {
        switch (table) {
            case "user": {
                const value = status as unknown as $Enums.Status
                console.log({ value })
                entityIDs.map(async (el) => {
                    await prisma.user.update({
                        where: { id: el },
                        data: { status: value }
                    })
                })
            }
                break;
            case "logger": {
                const value = status as unknown as $Enums.ContactStatus
                console.log({ value })
                entityIDs.map(async (el) => {
                    await prisma.logger.update({
                        where: { id: el },
                        data: { status: value }
                    })
                })
            }
                break;
            case "gallery": {
                const value = status as unknown as $Enums.ViewStatus
                console.log({ value })
                entityIDs.map(async (el) => {
                    await prisma.gallery.update({
                        where: { id: el },
                        data: { status: value }
                    })
                })
            }
                break;
            case "donation": {
                const value = status as unknown as $Enums.ContactStatus
                console.log({ value })
                entityIDs.map(async (el) => {
                    await prisma.donation.update({
                        where: { id: el },
                        data: { visiblity: value }
                    })
                })
            }
                break;
            case "contact": {
                const value = status as unknown as $Enums.ContactStatus
                console.log({ value })
                entityIDs.map(async (el) => {
                    await prisma.contact.update({
                        where: { id: el },
                        data: { status: value }
                    })
                })
            }
                break;
            case "blog": {
                const value = status as unknown as $Enums.ViewStatus
                console.log({ value })
                entityIDs.map(async (el) => {
                    await prisma.blog.update({
                        where: { id: el },
                        data: { status: value }
                    })
                })
            }
                break;

            default: return { error: true, message: "Invalid update request detected." };
        }
        const pageName = table + `${table === "contact" || table === "gallery" ? "" : "s"}`
        const path = `/dashboard/${pageName}`
        revalidatePath(path)
        await logAction({ userId: user.id, actionType: "update", message: `Activity: ${user.name} updated ${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} to ${status} in ${table} list. `, })
        return { error: false, message: `${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} has been successfully updated` }
    } catch (error) {
        console.log({ error })
        await logAction({ userId: user.id, actionType: "update", message: `Activity: ${user.name} could not update ${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} in ${table}. Error: ${error}`, isError: true })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}

// Logger
// const publicScreenLog = async (user: { id: string, fullname: string, email: string }, action: "created" | "edited" | "deleted" | "initiated" | "view", page: IDENTIFIED_TABLES, sendmail: boolean, subject: string, description: string, reply?: string, copy?: { email: string, fullname?: string }) => {
//     const session = await getServerSession(authOptions)

//     try {
//         const message = `${user.fullname !== "" ? user.fullname : "visitor"} with email ${user?.email} ${action} ${description}`;
//         await prisma.logger.create({
//             data: { userId: session?.user ? session.user?.id : "null", message, }
//         })
//         if (sendmail) {
//             await sendEmail(subject ??= `Anyagirlchild: New ${action} Record`, [config.NEXT_MAIL.BCC!], message, reply ?? "", copy)
//             // await sendEmail(message, user.email, message)
//         }
//     }
//     catch (error) {
//         console.log(`Log Error: Unable to save log because of error ${error}`)
//     }
// }

// const backendScreenLog = async (subject: string, user: { id: string, fullname: string, email: string }, action: "created" | "edited" | "deleted" | "initiated" | "view", page: IDENTIFIED_TABLES, sendmail: boolean, description: string, reply?: string, copy?: { email: string, fullname?: string }) => {
//     const data = await verifyUser()
//     try {
//         const message = `<a href="${config.APP_PRIMARY_API_BASE_URL}/${appRoutePaths.adminuser}?id=${user.id}">${user.fullname}</a> with email ${user.email} ${action} a ${page} record. ${description}`;
//         await prisma.logger.create({
//             data: { userId: data.id, message }
//         })
//         if (sendmail) {
//             await sendEmail(subject ??= `Anyagirlchild: New ${action} Record`, [config.NEXT_MAIL_BCC!, user.email], message, reply ?? "", copy)
//         }
//     }
//     catch (error) {
//         console.log(`Log Error: Unable to save log because of error ${error}`)
//     }
// }

