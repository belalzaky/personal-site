import { defineCollection, z } from 'astro:content';

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

export const collections = { projects, posts };
