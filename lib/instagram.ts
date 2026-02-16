export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramMediaItem = {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
  username?: string;
};

type InstagramGraphResponse = {
  data?: Array<{
    id: string;
    caption?: string;
    media_type: InstagramMediaType;
    media_url?: string;
    thumbnail_url?: string;
    permalink?: string;
    timestamp?: string;
    username?: string;
    children?: {
      data?: Array<{
        media_type?: "IMAGE" | "VIDEO";
        media_url?: string;
        thumbnail_url?: string;
      }>;
    };
  }>;
  paging?: {
    cursors?: {
      after?: string;
    };
    next?: string;
  };
};

const FALLBACK_LIMIT = 40;

export function hasInstagramConfig() {
  return Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);
}

export type InstagramMediaPage = {
  items: InstagramMediaItem[];
  nextCursor: string | null;
  hasMore: boolean;
};

export async function getInstagramMediaPage(
  limit = FALLBACK_LIMIT,
  after?: string
): Promise<InstagramMediaPage> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return { items: [], nextCursor: null, hasMore: false };

  const endpoint = new URL("https://graph.instagram.com/me/media");
  endpoint.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username,children{media_type,media_url,thumbnail_url}"
  );
  endpoint.searchParams.set("limit", String(limit));
  endpoint.searchParams.set("access_token", token);
  if (after) endpoint.searchParams.set("after", after);

  try {
    const res = await fetch(endpoint.toString(), {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Instagram API failed (${res.status})`);
    }

    const json = (await res.json()) as InstagramGraphResponse;
    const items = json.data ?? [];

    const normalized = items
      .map((item) => {
        const firstChild = item.children?.data?.[0];
        const mediaUrl = item.media_url || firstChild?.media_url || "";
        const thumbnailUrl = item.thumbnail_url || firstChild?.thumbnail_url;

        if (!item.id || !mediaUrl || !item.permalink || !item.timestamp) return null;

        return {
          id: item.id,
          caption: item.caption || "",
          mediaType: item.media_type,
          mediaUrl,
          thumbnailUrl,
          permalink: item.permalink,
          timestamp: item.timestamp,
          username: item.username,
        } satisfies InstagramMediaItem;
      })
      .filter((item): item is InstagramMediaItem => Boolean(item));

    const nextCursor = json.paging?.cursors?.after || null;
    const hasMore = Boolean(json.paging?.next && nextCursor);

    return { items: normalized, nextCursor, hasMore };
  } catch (error) {
    console.error("Instagram fetch error:", error);
    return { items: [], nextCursor: null, hasMore: false };
  }
}

export async function getInstagramMedia(limit = FALLBACK_LIMIT): Promise<InstagramMediaItem[]> {
  const page = await getInstagramMediaPage(limit);
  return page.items;
}
