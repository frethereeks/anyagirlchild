"use server"
import { authOptions } from "@/lib/authOptions";
import plimit from "p-limit"
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib";
import { appRoutePaths } from "@/routes/paths";
import { $Enums } from "@prisma/client";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs"
import { generateSlug } from "@/lib";
import { blogFolder, galleryFolder, IDENTIFIED_TABLES, profileFolder } from "@/constants";
import { sendEmail } from "@/lib/sendEmail";
import { revalidatePath } from "next/cache";
import nodeMailer from "nodemailer"
import { randomUUID } from "crypto";
import { config } from "@/config";
import { TCommentProps } from "@/types";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import Email from "next-auth/providers/email";

const limit = plimit(10)

// common form data
const userData = (data: FormData) => ({
    firstname: data?.get("firstname")?.valueOf() as string,
    lastname: data?.get("lastname")?.valueOf() as string,
    email: data?.get("email")?.valueOf() as string,
    image: data?.get("image")?.valueOf() as File,
    plainPassword: data?.get("password")?.valueOf() as string,
    verifyPassword: data?.get("verifyPassword")?.valueOf() as string,
    role: data?.get("role")?.valueOf() as $Enums.Role || "ROOT",
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
    console.log({ user, data })
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
    if (!validMail) return { error: true, message: `We do not have a member with this email...Please, confirm and try again` };
    try {
        const token = randomUUID()
        const html = `
                <section style="display: flex; flex-direction: column; background: white; border-radius: 6px; padding: 16px;">
                    <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 8px;">
                        <figure style="height: 36px; width: 36px; border-radius: 100%; background: #0d182d; flex-shrink: 0;"></figure>
                        <h4 style="color: #16a394; font-size: 18px; line-height: 28px; text-transform: uppercase; font-weight: 700;">Anyagirld Child Foundation</h4>
                    </div>
                    <div style="display: flex; flex-direction: column; flex: 1;">
                        <h4 style="font-size: 16px; line-height: 24px; color: #64748b; text-align: center;">Password Reset Request.</h4>
                        <p style="font-size: 16px; line-height: 24px; color: #64748b; text-align: center;">We have received your request to reset your password. If you indeed initiated the action</p>
                        <a href="${config.APP_PRIMARY_API_BASE_URL}/auth/verify?email=${email}&token=${token}" target="_blank" style="font-weight: 700; background: #16a394; color: #fff; border-radius: 6px; font-size: 14px; line-height: 20px; text-align: center; margin: 0 auto; width: max-content; padding: 4px 24px; margin-top: 4px;" className="font-bold text-secondary text-sm text-center mx-auto w-max py-1 px-6 mt-1">Click Here &rarr;</a>
                    </div>
                    <p style="font-size: 12px; line-height: 16px; color: #64748b70; text-align: center; padding: 8px 0;" className="text-xs text-text/70 text-center py-2">If you did not initiate this action. Simply ignore this message.</p>
                </section>
          `;
        const transport = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        })

        transport.sendMail({
            from: `Anyagirlchild.com <${process.env.MAIL_FROM}>`,
            to: email,
            // bcc: 'Anyagirlchild Password Reset <fakemail@gmail.com>',
            replyTo: 'Anyagirlchild No Reply <no-reply@anyagirlchild.com>',
            subject: 'Anyagirlchild Password Reset Request',
            html
        }, (err, info) => {
            if (err) {
                return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
            }
        })
        await prisma.user.update({
            where: { email },
            data: { token }
        })
        revalidatePath(appRoutePaths.signin)
        return { error: false, message: `Password Reset Link has been sent to your email...` };
    } catch (error) {
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
    }
}

export const handlePasswordReset = async ({ email, password: plainPassword }: { email: string, password: string }) => {
    const salt = await bcryptjs.genSalt(10)
    const password = await bcryptjs.hash(plainPassword, salt)
    const validMail = await prisma.user.findFirst({ where: { email } })
    if (!validMail) return { error: true, message: `We do not have an account with this email...Please, confirm and try again` };
    try {
        await prisma.user.update({
            where: { email },
            data: { password, token: "" }
        })
        revalidatePath(appRoutePaths.signin)
        return { error: false, message: `Password reset is successful.` };
    } catch (error) {
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

export const handleTokenVerification = async (email: string, token: string) => {
    try {
        const validMail = await prisma.user.findFirst({ where: { email, token } })
        if (!validMail) return { error: true, message: `We do not have an account with these details...Perhaps, this is an old link` };
        else return { error: false, message: `Success! Please, complete the process by choosing a new password` };
    } catch (error) {
        return { error: true, message: `Something went wrong. We could not complete your request...Please, try again` };
    }
}

export const fetchDashboarData = async () => {
    try {
        const [adminData, donationData, galleryData, blogData] = await prisma.$transaction([
            prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.donation.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.gallery.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
            prisma.blog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        ])
        return { error: false, message: 'Dashboard data fetched successfully', data: { adminData, donationData, galleryData, blogData } }
    } catch (error) {
        console.log({ dashboardError: error })
        return { error: true, message: 'Unable to fetch dashboard data. Please, try again', data: { adminData: [], donationData: [], galleryData: [], blogData: [] } }
    }
}

// User
export const createUser = async (data: FormData) => {
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
                data: { email, firstname, lastname, password, image, status: "PENDING", role: role ?? "USER" }
            })
            return { error: false, message: `Welcome ${firstname} ${lastname}. A verification link has been sent to your email. Click to complete your registration.` }
        }
    } catch (error) {
        return { error: true, message: `Something went wrong. We could not complete your request` }
    }
}

export const updateUser = async (data: FormData, type: "info" | "security") => {
    const user = await fetchUserDetails()
    const newImage = data.get("newImage")?.valueOf() as unknown as string;
    let file = data.get("oldImage")?.valueOf() as string;
    console.log({ data })
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
        await prisma.blog.create({
            data: { image: file, slug, title: title.trim().toLowerCase(), text, status, userId: user.id }
        })
        return { error: false, message: `Congratulations! Your new blog post has been created successfully.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const deleteBlog = async (id: string) => {
    const user = await verifyUser()
    try {
        // Change the 
        await prisma.blog.delete({ where: { id } })
        // Log the action

        return { error: false, message: `Blog record successfully deleted.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to delete blog. Please, try again.` }
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
            await prisma.blog.update({
                data: { image: file, slug, title, text, userId: user.id, status },
                where: { id }
            })
        }
        return { error: false, message: `Your blog post has been updated successfully.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const updateBlogImage = async (id: string, image: File, oldImageName: string) => {
    try {
        const res = await uploadImage(image, blogFolder, oldImageName)
        const file = res.secure_url
        await prisma.blog.update({
            where: { id },
            data: { image: file }
        })
        return { error: false, message: `Blog image successfully updated.` }
    } catch (error) {
        return { error: true, message: `Unable to complete update blog image request. Please, try again.` }
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
        return { error: true, message: `Unable to complete your request to post comment. Please, try again.` }
    }
}

export const updateComment = async (data: { id: string, fullname: string, email: string, text: string }) => {
    const { id, fullname, email, text } = (data)
    try {
        await prisma.comment.update({
            data: { fullname, email, text },
            where: { id }
        })
        return { error: false, message: `Comment updated successfully.`, data: undefined }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to update comment. Please, try again.` }
    }
}

export const deleteComment = async (id: string) => {
    try {
        await prisma.comment.delete({
            where: { id },
        })
        return { error: false, message: `Comment successfully deleted.` }
    } catch (error) {
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
        return { error: true, message: `Unable to complete your request to post reply. Please, try again.` }
    }
}

export const deleteReply = async (id: string) => {
    try {
        await prisma.reply.delete({
            where: { id },
        })
        return { error: false, message: `Reply successfully deleted.` }
    } catch (error) {
        return { error: true, message: `Unable to delete reply. Please, try again.` }
    }
}

// Contact
export const fetchContact = async () => {
    try {
        const data = await prisma.contact.findMany({
            orderBy: { createdAt: "desc" }
        })
        return { data }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const createContact = async (data: FormData) => {
    const { fullname, email, message } = contactData(data)
    try {
        // const html = `
        //       <section style="max-width: 40rem; width: 100%; margin: 0 auto; padding: 2rem;" className="flex flex-col">
        //           <div className="flex gap-1">
        //           <div style="background: rgb(59, 130, 246); font-size: 2rem; color: white; text-align: center; padding: 2rem 1rem;" className="h-10 w-10 rounded-full bg-primary flex-shrink-0">Password Reset</div>
        //               <div style="padding: 1rem;" className="flex flex-col flex-1">
        //               <p style="color: rgb(100,116,139); font-size: 1rem; line-height: 1.8;" className="text-xs text-slate-500">${message}</p>
        //                   <a href='${config.APP_PRIMARY_API_BASE_URL}/${appRoutePaths.admincontact}' target="_blank" style="background: rgb(59, 130, 246); padding: 1rem 2rem; width: max-content; margin: 0 auto; color: white; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem;" className="font-bold text-slate-600 text-lg">View Message</a>
        //               </div>
        //               <p style="color: rgb(100,116,139); font-size: .65rem; padding: 1rem; text-align:center; line-height: 1.25rem;" className="text-xs text-slate-700 text-center py-2">You are receiving this message because you are an admin of Anyagirlchild Foundation.</p>
        //           </div>
        //       </section>
        //   `;
        // const transport = nodeMailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: process.env.MAIL_USERNAME,
        //         pass: process.env.MAIL_PASSWORD
        //     }
        // })

        // transport.sendMail({
        //     from: `Anyagirlchild.com <${process.env.MAIL_FROM}>`,
        //     to: email,
        //     replyTo: `${fullname} <${email}>`,
        //     subject: 'Anyagirlchild: New Message',
        //     html
        // }, (err, info) => {
        //     if (err) {
        //         return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
        //     }
        // })
        await prisma.contact.create({
            data: { fullname, email, message }
        })
        await publicScreenLog({ id: "", fullname, email }, "created", "contact", true, "Anyagirlchild: New Contact Message", `A visiter named ${fullname} sent you a message`, email)
        return { error: false, message: `Thanks for contacting us ${fullname}. We will get back to you as soon as possible.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

export const updateContactStatus = async (id: string) => {
    try {
        await prisma.contact.update({
            where: { id },
            data: { status: "READ" }
        })
        return { error: false, message: `Donation record successfully deleted.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to delete contact. Please, try again.` }
    }
}

// Donation
export const createDonation = async (data: FormData) => {
    const { amount, currency, fullname, email, message, status, reference } = donationData(data)
    console.log({ amount, currency, fullname, email, message, status, reference })
    try {
        await prisma.donation.create({
            data: { amount: +amount, currency, fullname, email, message, status, reference }
        })
        // await publicScreenLog("Anyagirlchild: New Donation Received!", {fullname, email}, "initiated", `We happy and most grateful to tell you a donation of the sum of ${currency}${+amount} to Anyagirlchild Foundation was received from ${fullname} for ${message}`, true, email, {email, fullname})
        return { error: false, message: `Thanks for your donation of ${currency}${amount} to our foundation.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to perform donation. Please, try again.` }
    }
}

export const fetchDonations = async () => {
    const user = await verifyUser()
    try {
        const data = await prisma.donation.findMany({
            orderBy: { createdAt: "desc" }
        })
        // await publicScreenLog("Activity: View Donations", { fullname: user.name!, email: user.email! }, "viewed", `A visiter named ${fullname} sent you a message`, true)
        return { error: false, message: `Donation fetched successfully.`, data }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to send message. Please, try again.` }
    }
}

// Gallery
export const fetchGalleryImages = async (start?:number, end?: number) => {
    try {
        const data = await prisma.gallery.findMany({
            orderBy: { createdAt: "desc" },
            take: end ? end : undefined,
            skip: start ? start : undefined,
        })
        return { error: false, message: `Gallery images fetched successfully`, data }
    } catch (error) {
        return { error: true, message: `Unable to fetch gallery images`, data: [] }
    }
}

export const createGalleryImage = async (data: FormData) => {
    await verifyUser()
    const title = data?.get("title")?.valueOf() as string
    const status = data?.get("status")?.valueOf() as $Enums.ViewStatus
    // const images = data?.get("image")?.valueOf() as File[]
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

        console.log({ allUploadedFiles, allFiles })
        // Insert into DB concurrently
        await Promise.all(
            allFiles.map((file) =>
                prisma.gallery.create({
                    data: { title, image: file, status },
                })
            )
      );
        // await backendActionLog(`New image upload.`, {fullname: user.name!, email: user.email!}, "created", `Admin with userId ${user.id} created a new image`, false)
        return { error: false, message: `New gallery image(s) uploaded successfully.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to upload image. Please, try again.` }
    }
}

export const updateGalleryImage = async (data: FormData) => {
    const id = data?.get("id")?.valueOf() as string
    const title = data?.get("title")?.valueOf() as string
    const newImage = data?.get("newImage")?.valueOf() as string
    const oldImage = data?.get("oldImage")?.valueOf() as string
    const image = data?.get("image")?.valueOf() as File[]
    const status = data?.get("status")?.valueOf() as $Enums.ViewStatus
    let file = oldImage;
    console.log({ id, title, newImage, oldImage, status, file })
    if (newImage === "true") {
        const res = await uploadImage(image[0], galleryFolder, oldImage)
        file = res?.secure_url
    }
    try {
        await prisma.gallery.update({
            data: { title, image: file, status },
            where: { id }
        })
        return { error: false, message: `Gallery image updated successfully.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to update image. Please, try again.` }
    }
}

// DELETE IMAGES
export const deleteGalleryImage = async (id: string) => {
    const user = await verifyUser()
    try {
        await prisma.donation.updateMany({
            where: { id },
            data: { visiblity: "DELETED", updatedBy: user.id }
        })
        return { error: true, message: `Photo successfully deleted.` }
    } catch (error) {
        return { error: true, message: `Unable to complete your request to delete photo. Please, try again.` }
    }
}


/*   === UTILITY FUNCTIONS ===  */
// UPLOAD IMAGE ACTIONS
export const uploadEntityImage = async (id: string, data: FormData, table: IDENTIFIED_TABLES, oldImageName?: string) => {
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
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}
// DELETE ACTIONS
export const deleteEntity = async (id: string, table: IDENTIFIED_TABLES) => {
    const entityIDs = JSON.parse(id) as string[];
    let errorMsg = "";
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
        console.log('Got here. Even though it was wrong', { errorMsg })
        return { error: errorMsg !== "" ? true : false, message: errorMsg === "" ? `${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} has been successfully deleted` : errorMsg }
    } catch (error: any) {
        console.log('Now at the right place, because it was wrong')
        console.log({ errorCause: error?.cause })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}
// STATUS ACTIONS
export const updateEntity = async (id: string, status: string, table: IDENTIFIED_TABLES) => {
    const entityIDs = JSON.parse(id) as string[];
    console.log({ entityIDs, status, table })
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
        return { error: false, message: `${entityIDs.length} record${entityIDs.length > 1 ? "s" : ""} has been successfully updated` }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong while attempting to make your request, please, try again.` }
    }
}

// Logger
const publicScreenLog = async (user: { id: string, fullname: string, email: string }, action: "created" | "edited" | "deleted" | "initiated" | "viewed", page: IDENTIFIED_TABLES, sendmail: boolean, subject: string, description: string, reply?: string, copy?: { email: string, fullname?: string }) => {
    const session = await getServerSession(authOptions)

    try {
        const message = `${user.fullname !== "" ? user.fullname : "visitor"} with email ${user?.email} ${action} ${description}`;
        await prisma.logger.create({
            data: { userId: session?.user ? session.user?.id : "null", message, }
        })
        if (sendmail) {
            await sendEmail(subject ??= `Anyagirlchild: New ${action} Record`, [config.NEXT_MAIL_BCC!], message, reply ?? "", copy)
            // await sendEmail(message, user.email, message)
        }
    }
    catch (error) {
        console.log(`Log Error: Unable to save log because of error ${error}`)
    }
}

const backendScreenLog = async (subject: string, user: { id: string, fullname: string, email: string }, action: "created" | "edited" | "deleted" | "initiated" | "viewed", page: IDENTIFIED_TABLES, sendmail: boolean, description: string, reply?: string, copy?: { email: string, fullname?: string }) => {
    const data = await verifyUser()
    try {
        const message = `<a href="${config.APP_PRIMARY_API_BASE_URL}/${appRoutePaths.adminadmin}?id=${user.id}">${user.fullname}</a> with email ${user.email} ${action} a ${page} record. ${description}`;
        await prisma.logger.create({
            data: { userId: data.id, message }
        })
        if (sendmail) {
            await sendEmail(subject ??= `Anyagirlchild: New ${action} Record`, [config.NEXT_MAIL_BCC!, user.email], message, reply ?? "", copy)
        }
    }
    catch (error) {
        console.log(`Log Error: Unable to save log because of error ${error}`)
    }
}

