"use server";

import { createPost, updatePost, deletePost } from "@/lib/post";
import { z } from "zod";

const CreatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  authorEmail: z.string().email("Invalid email address"),
  authorName: z.string().optional(),
});

export const createPostAction = async (prevState: any, formData: FormData) => {
  try {
    const validatedFields = CreatePostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      authorEmail: formData.get("authorEmail"),
      authorName: formData.get("authorName"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const newPost = await createPost({
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      author: {
        connectOrCreate: {
          where: {
            email: validatedFields.data.authorEmail,
          },
          create: {
            email: validatedFields.data.authorEmail,
            name: validatedFields.data.authorName,
          },
        },
      },
    });

    return {
      post: newPost,
    };
  } catch (error) {
    throw error;
  }
};

const UpdatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const updatePostAction = async (
  prevState: any,
  formData: FormData,
  id: number
) => {
  try {
    const validatedFields = UpdatePostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const updatedPost = await updatePost(id, {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
    });

    return {
      post: updatedPost,
    };
  } catch (error) {
    throw error;
  }
};

export const deletePostAction = async (prevState: any, id: number) => {
  try {
    const deletedPost = await deletePost(id);

    return {
      post: deletedPost,
    };
  } catch (error) {
    throw error;
  }
};
