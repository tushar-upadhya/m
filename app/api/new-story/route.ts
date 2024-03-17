import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/prismaDB";

export async function POST(request: NextRequest) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("No User is signed in");
  }

  try {
    const newStory = await prisma.story.create({
      data: {
        authorId: userId,
      },
    });
    return NextResponse.json(newStory);
  } catch (error) {
    // console.log("error:", error);
    return NextResponse.error();
  }
}
