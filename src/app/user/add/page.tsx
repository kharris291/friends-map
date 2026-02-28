import UserAddForm from "@/components/UserAddForm/UserAddForm";

export default async function UserAddPage({
  searchParams,
}: {
  searchParams:
    | Promise<{ name?: string; email?: string }>
    | { name?: string; email?: string };
}) {
  const sp = await searchParams;
  const name = sp?.name ?? "";
  const email = sp?.email ?? "";

  return (
    <div className="p-8">
      <UserAddForm initialName={name} initialEmail={email} />
    </div>
  );
}
