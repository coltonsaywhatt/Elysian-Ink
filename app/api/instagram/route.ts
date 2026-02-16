import { NextResponse } from "next/server";
import { getInstagramMediaPage, hasInstagramConfig } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const configured = hasInstagramConfig();
  if (!configured) {
    return NextResponse.json({ configured: false, items: [] });
  }

  const { searchParams } = new URL(req.url);
  const after = searchParams.get("after") ?? undefined;
  const limitParam = Number(searchParams.get("limit") || 24);
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 60) : 24;

  const page = await getInstagramMediaPage(limit, after);
  return NextResponse.json({
    configured: true,
    count: page.items.length,
    items: page.items,
    nextCursor: page.nextCursor,
    hasMore: page.hasMore,
  });
}
