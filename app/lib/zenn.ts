import { ZENN_USERNAME } from '../content';

export interface ZennArticle {
  title: string;
  link: string;
  pubDate: string; // YYYY-MM-DD
}

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const extract = (item: string, tag: string) => {
  const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? decodeEntities(m[1].trim()) : null;
};

/**
 * Fetches the user's latest Zenn articles at build time (revalidated hourly on ISR).
 * Returns [] on any failure so the Writing section can fall back to static cards.
 */
export async function fetchZennArticles(limit = 3): Promise<ZennArticle[]> {
  try {
    const res = await fetch(`https://zenn.dev/${ZENN_USERNAME}/feed`, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items.slice(0, limit).flatMap(item => {
      const title = extract(item, 'title');
      const link = extract(item, 'link');
      const pubDateRaw = extract(item, 'pubDate');
      if (!title || !link) return [];
      const pubDate = pubDateRaw ? new Date(pubDateRaw).toISOString().slice(0, 10) : '';
      return [{ title, link, pubDate }];
    });
  } catch {
    return [];
  }
}
