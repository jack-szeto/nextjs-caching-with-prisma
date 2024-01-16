import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { unstable_cache as cache, revalidateTag } from "next/cache";

export const getPosts = cache(
  async () => {
    return await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  },
  ["posts"],
  {
    tags: ["posts"],
  }
);

export const getPost = async (id: number) => {
  return cache(
    () =>
      prisma?.post.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      }),
    ["post", `${id}`],
    {
      tags: [`post-${id}`],
    }
  )();
};

export const createPost = async (data: Prisma.PostCreateInput) => {
  const newPost = await prisma.post.create({
    data,
    include: {
      author: true,
    },
  });
  revalidateTag("posts");
  return newPost;
};

export const updatePost = async (id: number, data: Prisma.PostUpdateInput) => {
  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data,
    include: {
      author: true,
    },
  });
  revalidateTag("posts");
  revalidateTag(`post-${id}`);
  return updatedPost;
};

export const deletePost = async (id: number) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  revalidateTag("posts");
  revalidateTag(`post-${id}`);
  return deletedPost;
};
