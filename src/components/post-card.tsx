"use client";

import { Post, User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { deletePostAction } from "@/actions/post.action";

type PostCardProps = {
  post: Post & { author: User };
};

export function PostCard({ post }: PostCardProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <Card className=" flex-[1_0_200px]">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{`by ${post.author.name}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className=" flex flex-row justify-between">
        <p className=" text-xs">{`Updated at ${new Date(
          post.updatedAt
        ).toDateString()}`}</p>

        <div className=" flex flex-row gap-1">
          <Link href={`/posts/${post.id}`}>
            <Button variant="secondary">Edit</Button>
          </Link>

          <Button
            variant="destructive"
            onClick={() => {
              startTransition(async () => {
                await deletePostAction(null, post.id);
              });
            }}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
