import Post from "@/database/post.model";
import { connectToDataBase } from "@/lib/mongoose";
import { NextResponse } from "next/server"

export async function PUT(req:Request) {
    try {
        await connectToDataBase()
        const {postId,userId} = await req.json()
         await Post.findByIdAndUpdate(
            postId,
            {$push:{likes:userId}},
            {new:true}
        )
                return NextResponse.json({success:true})
    } catch (error) {
        const result = error as Error
        return NextResponse.json({error:result.message},{status:400});
    }
}

export async function DELETE(req:Request) {
    try {
        await connectToDataBase()
        const {postId,userId} = await req.json()
        const post= await Post.findByIdAndUpdate(
            postId,
            {$pull:{likes:userId}},
            {new:true}
        )
        return NextResponse.json({success:true})
    } catch (error) {
        const result = error as Error
        return NextResponse.json({error:result.message},{status:400});
    }
}