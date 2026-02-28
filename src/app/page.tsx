"use client";
import { useEffect, useState } from "react";
import { retrieveUsers } from "@/lib/retrieveUsers";
import ZoomCard from "@/components/ZoomCard";
import { UserItem } from "@/types/app/userItem";

export default function Page() {
  const [users, setUsers] = useState<Array<UserItem> | undefined>(undefined);

  const [selected, setSelected] = useState<UserItem | undefined>(undefined);
  useEffect(() => {
    retrieveUsers().then((users) => setUsers(users));
  }, []);

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
