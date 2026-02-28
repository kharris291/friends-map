import clientPromise from "@/util/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing MONGODB_DB in .env.local");

  const db = client.db(dbName);

  const users = await db
    .collection("user collection")
    .find({})
    .limit(50)
    .toArray();

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing MONGODB_DB in .env.local");
  const db = client.db(dbName);

  const result = await db.collection("user collection").insertOne({
    ...body,
    createdAt: new Date(),
  });

  return NextResponse.json({ insertedId: result.insertedId });
}
