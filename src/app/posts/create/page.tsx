import { PostCreationForm } from "@/components/post-creation-form";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Creating a Post
      </h1>

      <PostCreationForm />
    </main>
  );
}
