"use client";

import React, { SubmitEvent } from "react";

type Props = {
  initialName?: string;
  initialEmail?: string;
};

export default function UserAddForm({ initialName, initialEmail }: Props) {
  const [name, setName] = React.useState<string>(initialName ?? "");
  const [email, setEmail] = React.useState<string>(initialEmail ?? "");
  const [status, setStatus] = React.useState<
    null | "idle" | "saving" | "success" | "error"
  >(null);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("failed");
      if (res.status < 300) {
        setStatus("success");
        setName("");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col place-self-center-safe w-md">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"></div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {status === "saving" ? "Saving..." : "Add User"}
        </button>
        {status === "success" && (
          <p className="text-sm text-green-600">Saved!</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Save failed</p>
        )}
      </form>
    </div>
  );
}
