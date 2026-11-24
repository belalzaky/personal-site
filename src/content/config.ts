import { defineCollection, z } from 'astro:content';
import { hobbySlugs } from '../data/letters';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    link: z.string().optional(),
    github: z.string().optional(),
    result: z.string().optional(),
    image: z.string().optional(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
  }),
});

// Letters: Belal's own words, dictated and written down word for word. A tag outside the
// nine hobbies fails the build rather than dropping the letter from its tile.
const letters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.enum(hobbySlugs)).min(1),
    image: z.string().optional(),
  }),
});

export const collections = { projects, posts, letters };
