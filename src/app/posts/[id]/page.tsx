import { PostUpdateForm } from "@/components/post-update-form";
import { getPost } from "@/lib/post";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(Number(params.id));
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Update a Post
      </h1>

      {post ? (
        <PostUpdateForm post={post} />
      ) : (
        <p className="text-red-500 text-sm">Post not found</p>
      )}
    </main>
  );
}
