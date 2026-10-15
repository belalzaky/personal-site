// Every photo in public/photos/: the graded, privacy-processed copies from
// "Site redesign B — photos/site-final/". Each exists as <name>.{jpg,webp} (max 1600px
// long edge) and <name>-800.{jpg,webp}. Sizes are the 1600 version's pixel dimensions.

export const photos = {
  'aston':            { w: 900,  h: 1600 },
  'atrium':           { w: 1600, h: 900 },
  'coffee-espresso':  { w: 1199, h: 1591 },
  'cooking-poster':   { w: 540,  h: 960 },
  'cove-bw':          { w: 1600, h: 900 },
  'cove-colour':      { w: 1600, h: 900 },
  'dubai-drive':      { w: 1200, h: 1600 },
  'gym-interior':     { w: 900,  h: 1600 },
  'gym-mirror':       { w: 1200, h: 1600 },
  'headlight':        { w: 1600, h: 900 },
  'lambo':            { w: 1600, h: 900 },
  'laptop-espresso':  { w: 1600, h: 1076 },
  'plane-gate':       { w: 900,  h: 1600 },
  'plane-window':     { w: 900,  h: 1600 },
  'plate':            { w: 1036, h: 1600 },
  'regent-street':    { w: 900,  h: 1600 },
  'working-portrait': { w: 1600, h: 1000 },
} as const;

export type PhotoName = keyof typeof photos;
