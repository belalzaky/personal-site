// The camera roll: every photo that isn't on the index or /about, and none of Belal's face
// (his rules, 23 Nov). Files in public/photos/roll: <id>.jpg is 2000px on the long side for
// the viewer, <id>-s.jpg is 640px for the wall. Regent Street has its signs and plates blurred.
// To add a photo: put both sizes in public/photos/roll and add a line here.

export interface Shot { id: string; cap: string; w: number; h: number }

export const roll: Shot[] = [
  { id: 'n14', cap: 'Golden coastline from the ridge', w: 2000, h: 1126 },
  { id: 'n04', cap: 'Museum of the Future', w: 1500, h: 2000 },
  { id: 'n09', cap: 'Smiley on the wing mirror', w: 1126, h: 2000 },
  { id: 'n03', cap: 'Hilltop at night', w: 2000, h: 1126 },
  { id: 'n19', cap: 'Regent Street at dusk', w: 1126, h: 2000 },
  { id: 'n05', cap: 'Snake in the rocks', w: 1500, h: 2000 },
  { id: 'n17', cap: 'Dubai at night', w: 1500, h: 2000 },
  { id: 'c-lab', cap: 'Lab bench', w: 1126, h: 2000 },
  { id: 'n15', cap: 'Hilltop at night, black and white', w: 2000, h: 1124 },
];
