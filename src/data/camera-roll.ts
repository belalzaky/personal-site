// The camera roll: every photo on the site, full frame, plus the ones only shown here, and
// none of Belal's face (his rules, 23-24 Nov: c-arms and the night portrait stay out). Files in public/photos/roll: <id>.jpg is 2000px on the long side for
// the viewer, <id>-s.jpg is 640px for the wall. Regent Street has its signs and plates blurred, the F-150 its plate.
// To add a photo: put both sizes in public/photos/roll and add a line here.

export interface Shot { id: string; cap: string; w: number; h: number }

export const roll: Shot[] = [
  { id: 'n14', cap: 'Golden coastline from the ridge', w: 2000, h: 1126 },
  { id: 'n04', cap: 'Museum of the Future', w: 1500, h: 2000 },
  { id: 'c-laptop', cap: 'Laptop and earphones', w: 1126, h: 2000 },
  { id: 'n11', cap: 'Climbing the canyon', w: 1500, h: 2000 },
  { id: 'n20', cap: 'The Shard in fog', w: 2000, h: 1500 },
  { id: 'n09', cap: 'Smiley on the wing mirror', w: 1126, h: 2000 },
  { id: 'n13', cap: 'Cove in black and white', w: 2000, h: 1126 },
  { id: 'c-tone', cap: 'The gym at night', w: 1126, h: 2000 },
  { id: 'n03', cap: 'Hilltop at night', w: 2000, h: 1126 },
  { id: 'n10', cap: 'Radio and bag on the bonnet', w: 1500, h: 2000 },
  { id: 'c-desk', cap: 'The desk at night', w: 1126, h: 2000 },
  { id: 'n12', cap: 'The cove from above', w: 2000, h: 1126 },
  { id: 'n19', cap: 'Regent Street at dusk', w: 1126, h: 2000 },
  { id: 'n07', cap: 'Flag on the summit', w: 1126, h: 2000 },
  { id: 'n02', cap: 'Sunset over the sea', w: 2000, h: 1126 },
  { id: 'n05', cap: 'Snake in the rocks', w: 1500, h: 2000 },
  { id: 'a-coffee', cap: 'Coffee on the way in', w: 1126, h: 2000 },
  { id: 'n16', cap: 'Walking into the mountains', w: 1179, h: 664 },
  { id: 'n21', cap: 'Glass towers at dusk', w: 1500, h: 2000 },
  { id: 'c-gym', cap: 'Gym floor', w: 1126, h: 2000 },
  { id: 'c-seatbelt', cap: 'Belted in', w: 2000, h: 1266 },
  { id: 'n17', cap: 'Dubai at night', w: 1500, h: 2000 },
  { id: 'n18', cap: 'Desk lamp', w: 1500, h: 2000 },
  { id: 'n01', cap: 'Resting on the cliff', w: 1334, h: 2000 },
  { id: 'n06', cap: 'Night drive', w: 1126, h: 2000 },
  { id: 'c-lab', cap: 'Lab bench', w: 1126, h: 2000 },
  { id: 'n08', cap: 'The truck in the hills', w: 1500, h: 2000 },
  { id: 'n15', cap: 'Hilltop at night, black and white', w: 2000, h: 1124 },
];
