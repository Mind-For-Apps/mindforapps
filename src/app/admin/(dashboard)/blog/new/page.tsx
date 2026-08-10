import { BlogForm } from "../BlogForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">New blog post</h1>
      <BlogForm action={createBlogPost} />
    </div>
  );
}
