"use client";
import { useEffect, useState } from "react";
import { retrieveUsers } from "@/lib/retrieveUsers";
import ZoomCard from "@/components/ZoomCard";
import { UserItem } from "@/types/app/userItem";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<Array<UserItem> | undefined>(undefined);

  const [selected, setSelected] = useState<UserItem | undefined>(undefined);
  useEffect(() => {
    retrieveUsers().then((users) => setUsers(users));
  }, []);

  if(!session) {
    return (
      <main className="min-h-screen h-screen w-screen overflow-hidden bg-slate-100 flex flex-col gap-10 items-center justify-center p-20">
        <h1 className="text-4xl font-bold">Please sign in to view the users</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen h-screen w-screen overflow-hidden bg-slate-100 flex flex-wrap gap-10 items-center justify-center p-20">
      {users?.map((n, i) => {
        return (
          <ZoomCard
            key={`${n}-${i}`}
            selected={selected}
            setSelectedAction={setSelected}
            user={n}
            usersList={users?.filter((user) => user._id !== n._id)}
          />
        );
      })}
    </main>
  );
}
