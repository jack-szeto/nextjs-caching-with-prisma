import { Post, User } from "@prisma/client";
import { PostCard } from "./post-card";

type PostListProps = {
  posts?: (Post & { author: User })[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-row gap-6 w-full max-w-screen-lg p-4 flex-wrap">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts?.length === 0 && (
        <p className="text-xl text-gray-500">No posts found.</p>
      )}
    </div>
  );
}
