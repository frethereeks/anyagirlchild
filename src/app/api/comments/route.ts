import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get("blogId")
    console.log("comment requested for: ", {blogId})
    if (!blogId) return NextResponse.json({ error: true, message: "Blog Id Required" }, { status: 400 })
    
    const comments = await prisma.comment.findMany({
        where: { blogId },
        include: {
            replies: {
                orderBy: { createdAt: "desc" },
            }
        },
        orderBy: { createdAt: "desc" }
    })
    return NextResponse.json({error: false, message: "Comments fetched successfully", data: comments}, { status: 200 })
}