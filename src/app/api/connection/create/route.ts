import clientPromise from "@/util/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

type ConnectionRecord = {
  broughtBy?: string | null;
  groupIntro?: string | null;
  createdAt: Date;
  userId: ObjectId;
};

type ConnectionDocument = {
  _id: ObjectId;
  connections: ConnectionRecord[];
  createdAt: Date;
};

export async function POST(req: Request) {
  const body = await req.json();

  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing MONGODB_DB in .env.local");
  const db = client.db(dbName).collection<ConnectionDocument>("connections");

  const existingDocument = await db.findOne({ _id: new ObjectId(body.from) });

  if (existingDocument) {
    const connectionExists = existingDocument.connections?.some(
      (conn: ConnectionRecord) => conn.userId === body.to,
    );

    if (connectionExists) {
      return NextResponse.json(
        { error: "Connection already exists" },
        { status: 400 },
      );
    }

    const result = await db.updateOne(
      { _id: new ObjectId(body.from) },
      {
        $push: {
          connections: {
            userId: body.to,
            broughtBy: body?.broughtBy ?? null,
            groupIntro: body?.groupIntro ?? null,
            createdAt: new Date(),
          } as ConnectionRecord,
        },
      },
    );

    return NextResponse.json({ message: "Connection added", result });
  } else {
    const result = await db.insertOne({
      _id: new ObjectId(body.from),
      connections: [
        {
          userId: new ObjectId(body.to),
          broughtBy: body?.broughtBy ?? null,
          groupIntro: body?.groupIntro ?? null,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Connection created", result });
  }
}
