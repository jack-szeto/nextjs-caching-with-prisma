import { PostList } from "@/components/post-list";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/post";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  const posts = await getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Posts
      </h1>

      {/* create button */}
      <Link href="/posts/create">
        <Button>
          <span>Create</span>
        </Button>
      </Link>

      <Suspense fallback={<p>Loading...</p>}>
        <PostList posts={posts} />
      </Suspense>
    </main>
  );
}
