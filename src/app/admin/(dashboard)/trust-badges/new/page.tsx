import { TrustBadgeForm } from "../TrustBadgeForm";
import { createTrustBadge } from "../actions";

export default function NewTrustBadgePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">New Trust Badge</h1>
      <TrustBadgeForm action={createTrustBadge} />
    </div>
  );
}
