// The hobbies on /letters, in tile order. Each letter in src/content/letters carries one or more
// of these slugs as tags. Tile photos are 3:4 crops in public/photos/letters (his picks, 24 Nov).
// The home words and the roles on /projects/all link to /letters#<slug>.

export const hobbies = [
  { slug: 'hiking', label: 'Hiking', alt: 'Walking into the mountains with a backpack' },
  { slug: 'lifting', label: 'Lifting', alt: 'A gym floor at night under strip lights' },
  { slug: 'photography', label: 'Photos', alt: 'A rocky cove in black and white' },
  { slug: 'driving', label: 'Driving', alt: 'A mountain road at night from the driver’s seat' },
  { slug: 'liftkcl', label: 'LIFTKCL', alt: 'A busy gym floor from above' },
  { slug: 'travel', label: 'Travel', alt: 'The Dubai skyline at night across the water' },
  { slug: 'coffee', label: 'Coffee', alt: 'An iced coffee in hand' },
  { slug: 'ambassador', label: 'Ambassador', alt: 'A King’s College London jacket' },
  { slug: 'course-rep', label: 'Course rep', alt: 'A King’s lab coat, School of Biomedical Sciences' },
] as const;

export type Hobby = (typeof hobbies)[number]['slug'];
export const hobbySlugs = hobbies.map((h) => h.slug) as [Hobby, ...Hobby[]];

// minutes to read, at about 220 words a minute
export const minutes = (body: string) => Math.max(1, Math.round(body.trim().split(/\s+/).filter(Boolean).length / 220));
