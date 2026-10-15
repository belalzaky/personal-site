// Mission Control screenshots in public/mc/: captured from a temporary demo vault with
// sample data only (never the real vault). Each is <name>.png plus <name>.webp.
// w/h are the PNG's pixel size (2x device pixel ratio).

export const mcScreens = {
  today:    { w: 3200, h: 2000, alt: 'Mission Control’s Today screen with sample data' },
  projects: { w: 3200, h: 2000, alt: 'Mission Control’s Projects screen with sample projects' },
  study:    { w: 3200, h: 2000, alt: 'Mission Control’s Study screen: concept cards from a sample lecture' },
  gideon:   { w: 3200, h: 2000, alt: 'Gideon’s approval queue in Mission Control, with sample items waiting' },
} as const;

// Today hotspots: centre of each element as a percentage of the screenshot, measured from the
// page layout at capture time (15 Oct 2026), then nudged into empty space inside the same
// element so no text is covered: the Up next card, the To triage inbox heading, and the
// Ask Gideon ⌘G button in the sidebar. Captions are from the V2-MissionControl board.
export const todaySpots = [
  { x: 47, y: 30.6, t: 'Up next: one card, ranked by the nearest real deadline.' },
  { x: 36, y: 75, t: 'My inbox, underneath it.' },
  { x: 10, y: 28.6, t: 'Gideon, one keystroke away (⌘G): it answers “what’s next?” in seconds.' },
];
