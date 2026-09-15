import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://belalzaky.uk';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

type FeedItem = {
  title: string;
  link: string;
  date: Date;
  description?: string;
  category: string;
};

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const projects = await getCollection('projects');

  const items: FeedItem[] = [
    // Posts link wherever they are published — Substack today, this domain when a post has no url.
    ...posts.map((entry) => ({
      title: entry.data.title,
      link: entry.data.url ?? `${SITE}/writing/${entry.slug}`,
      date: entry.data.date,
      description: entry.data.summary,
      category: 'Writing',
    })),
    // Project case studies are the longest writing on the domain, so the feed carries them too.
    ...projects.map((entry) => ({
      title: entry.data.title,
      link: `${SITE}/projects/${entry.slug}`,
      date: entry.data.date,
      description: entry.data.summary,
      category: 'Project',
    })),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());

  const body = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="false">${escapeXml(item.link)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <category>${escapeXml(item.category)}</category>${
        item.description ? `\n      <description>${escapeXml(item.description)}</description>` : ''
      }
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Belal Zaky — Writing</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Drug-safety data, and what it does and does not represent.</description>
    <language>en-gb</language>
    <lastBuildDate>${(items[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
${body}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
