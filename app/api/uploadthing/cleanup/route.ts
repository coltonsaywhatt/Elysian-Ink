import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { keys?: unknown };
    const keys = Array.isArray(body?.keys)
      ? body.keys.filter((k): k is string => typeof k === "string" && k.length > 0)
      : [];

    if (keys.length === 0) {
      return NextResponse.json({ ok: false, error: "No keys provided." }, { status: 400 });
    }

    const utapi = new UTApi();
    await utapi.deleteFiles(keys);

    return NextResponse.json({ ok: true, deleted: keys.length });
  } catch (error) {
    console.error("uploadthing cleanup error", error);
    return NextResponse.json({ ok: false, error: "Cleanup failed." }, { status: 500 });
  }
}
