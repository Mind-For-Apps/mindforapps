import { FaqForm } from "../FaqForm";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">New FAQ</h1>
      <FaqForm action={createFaq} />
    </div>
  );
}
