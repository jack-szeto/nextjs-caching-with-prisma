"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SubmitButton } from "./submit-botton";
import { useFormState } from "react-dom";
import { createPostAction } from "@/actions/post.action";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export async function PostCreationForm() {
  const [state, formAction] = useFormState(createPostAction, {
    errors: {},
  });

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
          defaultValue={"New Post Title"}
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
          defaultValue={"New Post Content"}
        />
        {state.errors?.content && (
          <p className="text-red-500 text-sm">{state.errors.content}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="authorEmail">Author Email</Label>
        <Input
          id="authorEmail"
          name="authorEmail"
          placeholder="Author Email"
          defaultValue={"example@example.com"}
          type="email"
        />
        {state.errors?.authorEmail && (
          <p className="text-red-500 text-sm">{state.errors.authorEmail}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="authorName">Author Name</Label>
        <Input
          id="authorName"
          name="authorName"
          placeholder="Author Name"
          defaultValue={"New Post Author Name"}
        />
        {state.errors?.authorName && (
          <p className="text-red-500 text-sm">{state.errors.authorName}</p>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <Link href="/posts">
          <Button variant="outline">
            <span>Cancel</span>
          </Button>
        </Link>
        <SubmitButton label={"Create"} />
      </div>
    </form>
  );
}
