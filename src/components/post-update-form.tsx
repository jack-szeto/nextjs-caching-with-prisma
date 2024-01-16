"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SubmitButton } from "./submit-botton";
import { useFormState } from "react-dom";
import { updatePostAction } from "@/actions/post.action";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export async function PostUpdateForm({ post }: { post: Post }) {
  const [state, formAction] = useFormState(
    async (p: any, f: FormData) => {
      const result = await updatePostAction(p, f, post.id);
      return result;
    },
    {
      errors: {},
    }
  );

  useEffect(() => {
    if (state.post) {
      redirect("/posts");
    }
  }, [state]);
  return (
    <form
      className="flex flex-col gap-4 w-full max-w-screen-lg p-4"
      action={formAction}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={post.title}
        />
        {state.errors?.title && (
          <p className="text-red-500 text-sm">{state.errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Type something here..."
          defaultValue={post.content || ""}
        />
        {state.errors?.content && (
          <p className="text-red-500 text-sm">{state.errors.content}</p>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <Link href="/posts">
          <Button variant="outline">
            <span>Cancel</span>
          </Button>
        </Link>
        <SubmitButton label={"Update"} />
      </div>
    </form>
  );
}
