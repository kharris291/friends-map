import clientPromise from "@/util/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  console.log(userid);
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB;
    if (!dbName) throw new Error("Missing MONGODB_DB in .env.local");

    const db = client.db(dbName).collection("connections");

    if (!ObjectId.isValid(userid)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 },
      );
    }

    const existingDocument = await db.findOne({
      _id: new ObjectId(userid),
    });

    if (!existingDocument) {
      return NextResponse.json(
        { error: "User connections not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(existingDocument);
  } catch (error) {
    console.error("Error retrieving connections:", error);
    return NextResponse.json(
      { error: "Failed to retrieve connections" },
      { status: 500 },
    );
  }
}
