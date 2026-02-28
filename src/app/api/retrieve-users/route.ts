import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    {
      id: 1,
      name: "John Doe",
    },
  ];
  return NextResponse.json(users, { status: 200 });
}
