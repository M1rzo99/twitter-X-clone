import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDataBase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    await connectToDataBase();
    const { body, postId, userId } = await req.json();
    const comment = await Comment.create({ body, post: postId, user: userId });
      await Post.findByIdAndUpdate(postId, {  $push: { comments: comment._id },
    });
    return NextResponse.json(comment);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

 export async function PUT(req: Request) {
  try {
    await connectToDataBase();
    const { currentUser }: any = await getServerSession(authOptions);
    const { commentId } = await req.json();

    await Comment.findByIdAndUpdate(commentId, {
      $push: { likes: currentUser._id },
    });

    return NextResponse.json({ message: "Like added" }); // ✅ return qo‘shildi
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDataBase();
    const { currentUser }: any = await getServerSession(authOptions);
    const { commentId } = await req.json();

    await Comment.findByIdAndUpdate(commentId, {
      $pull: { likes: currentUser._id },
    });

    return NextResponse.json({ message: "Like removed" }); // ✅ return qo‘shildi
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
