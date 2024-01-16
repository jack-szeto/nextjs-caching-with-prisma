import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        NextJs Caching Lab
      </h1>

      <div className="">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          See the{" "}
          <Link href={"/posts"} className=" hover:underline text-primary">
            Posts
          </Link>{" "}
          page
        </p>
      </div>
    </main>
  );
}
