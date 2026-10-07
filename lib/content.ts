// Every claim, link and piece of media on the site lives here.
// Pulled from the OTL Dispatch newsletter ("The Line").

export const site = {
  name: "Off The L",
  short: "OTL",
  description:
    "Off The L is a Brooklyn party collective. Afrobeats, hip hop, dancehall and global sounds, one stop at a time.",
  tagline: "A Brooklyn party, one stop off the L.",
  where: "Brooklyn, NY",
  footerLine: "Come with us",
  fine: "Off The L · Brooklyn, NY",
  shareAlt: "Off The L. Now boarding: Full Circle.",
  afterParty: "Catch the next stop",
  instagram: { handle: "@otl_nyc", href: "https://instagram.com/otl_nyc" },
  tiktok: { handle: "@otl_nyc", href: "https://www.tiktok.com/@otl_nyc" },
  linktree: { handle: "linktr.ee/otl_nyc", href: "https://linktr.ee/otl_nyc" },
};

export type Stop = {
  name: string;
  /** ISO start time with offset, New York local */
  start: string;
  /** ISO end time, used to flip the stop to "done" */
  end: string;
  venue: string;
  address: string;
  sounds: string[];
  genres: string[];
  blurb: string;
  note: string;
  rsvp: string;
  poster: { src: string; srcSet: string; alt: string; width: number; height: number };
};

export const nextStop: Stop = {
  name: "Full Circle",
  start: "2026-10-11T18:00:00-04:00",
  end: "2026-10-12T02:00:00-04:00",
  venue: "The Red Pavilion",
  address: "1241 Flushing Ave, Brooklyn",
  sounds: ["J. Surena", "Killa*", "Taylor Nuri", "Cici Simone"],
  genres: ["Afrobeats", "Hip hop", "Dancehall", "Global sounds"],
  blurb: "One year of Off The L. Our anniversary party, and the reason we keep doing this.",
  note: "Free, just RSVP.",
  rsvp: "https://posh.vip/f/e2933?t=web",
  poster: {
    src: "/media/full-circle-880.webp",
    srcSet: "/media/full-circle-560.webp 560w, /media/full-circle-880.webp 880w",
    alt: "Full Circle poster. One year anniversary party, 6 PM 10/11, The Red Pavilion, 1241 Flushing Ave. Sounds by J. Surena, Killa*, Taylor Nuri and Cici Simone.",
    width: 880,
    height: 880,
  },
};

export const feed = {
  title: "Last time on the L",
  line: "Straight off the dance floor. Hit play for the full reel, then come find us on the feed.",
  sources: [
    { src: "/media/feed.webm", type: "video/webm" },
    { src: "/media/feed.mp4", type: "video/mp4" },
  ],
  poster: "/media/feed-poster.webp",
  href: "https://www.instagram.com/p/DcXCl5lJLpB/",
  embed: "https://www.instagram.com/p/DcXCl5lJLpB/embed/",
  alt: "Clips from the dance floor at an OTL party.",
};

/** Past parties. Photos come from Bassey's picks on OTL's Pixieset (shared selections), at 1600px through Next's image optimizer. Five frames per party. */
export type Photo = { src: string; alt: string; width: number; height: number };
export type PastStop = {
  slug: string;
  name: string;
  short: string;
  date: string; // YYYY-MM-DD, New York
  note?: string;
  gallery: string;
  photos: Photo[];
};

import photoManifest from "./photo-manifest.json";

// Local copy made at build time (scripts/fetch-photos.mjs) when it exists, Pixieset otherwise.
const localPhotos = photoManifest as Record<string, string>;
const px = (path: string) => localPhotos[path] ?? `https://images.pixieset.com/${path}`;

export const pastStops: PastStop[] = [
  {
    slug: "sessions-01",
    name: "OTL Sessions vol. 1",
    short: "Sessions 01",
    date: "2026-09-27",
    note: "Recorded DJ sets, live in the room. The first mix drops soon.",
    gallery: "https://offthel.pixieset.com/otlsessions/",
    photos: [
      { src: px("305125321/77e167eded61eb36f2d56433801a1618-xxlarge.JPG"), alt: "A DJ with a chain and curls on the decks at OTL Sessions vol. 1.", width: 1600, height: 2353 },
      { src: px("305125321/0f736a4b6a3fdc621896fa37de633fc3-xxlarge.JPG"), alt: "A DJ in a black cap and graphic tee mixing at OTL Sessions vol. 1.", width: 1600, height: 2322 },
      { src: "/media/sessions-portrait.webp", alt: "A guest with tattooed hands sitting on a stool at OTL Sessions vol. 1, a giant CD clock behind him.", width: 1200, height: 1800 },
      { src: px("305125321/3ecfefe1e4a4e34e5ba14194f6fb1454-xxlarge.JPG"), alt: "The DJ in a white hoodie on the decks at OTL Sessions vol. 1.", width: 1600, height: 2366 },
      { src: px("305125321/2ecb6e0c1b59b00aaabd27bc8dacb02e-xxlarge.JPG"), alt: "Two friends laughing at OTL Sessions vol. 1.", width: 1600, height: 2400 },
    ],
  },
  {
    slug: "pink-frequency",
    name: "Pink Frequency",
    short: "Pink Frequency",
    date: "2026-08-15",
    note: "The Ivory on Park went off.",
    gallery: "https://offthel.pixieset.com/pinkfrequency/",
    photos: [
      { src: px("769986911/142281730cba82d49ec84ce2867a464b-xxlarge.JPG"), alt: "A guest in a flower shirt on the rooftop at Pink Frequency.", width: 1600, height: 2400 },
      { src: px("769986911/8378065f854344cdbf0ca3ec8504e394-xxlarge.JPG"), alt: "Friends in pink, one in a pink cowboy hat, at Pink Frequency.", width: 1600, height: 2400 },
      { src: px("769986911/08aa2af4f8be0041ee22fde97b9da70b-xxlarge.JPG"), alt: "Friends on the rooftop under a blue sky at Pink Frequency.", width: 1600, height: 2400 },
      { src: px("769986911/2ada60388f7c059cef0acd13814abf57-xxlarge.JPG"), alt: "A guest in a pink headband on a pink retro phone at Pink Frequency.", width: 1600, height: 2400 },
      { src: px("769986911/8009994c79e9879b23353b7a4806663a-xxlarge.JPG"), alt: "A guest in a pink shirt and sunglasses on the rooftop at Pink Frequency.", width: 1600, height: 2400 },
    ],
  },
  {
    slug: "jean-and-tav",
    name: "Jean & Tav's Birthday",
    short: "Jean & Tav",
    date: "2026-07-25",
    gallery: "https://offthel.pixieset.com/jeanandtavsbirthday/",
    photos: [
      { src: px("789986911/b282ce502ce13e5e52ab2cf6878fe264-xxlarge.JPG"), alt: "The DJ and friends dancing behind the decks in red light at Jean and Tav's Birthday.", width: 1600, height: 2400 },
      { src: px("789986911/c9ec9d1afa21578d5e8d01fc4fde725d-xxlarge.JPG"), alt: "Two friends in white at Jean and Tav's Birthday.", width: 1600, height: 2400 },
      { src: px("789986911/9436d3454e38e07484c8097e8a42eee3-xxlarge.JPG"), alt: "The floor under red light at Jean and Tav's Birthday.", width: 1600, height: 2400 },
      { src: px("789986911/8639b7045ce6d9901f658f72e1be6615-xxlarge.JPG"), alt: "The crowd under hanging greenery at Jean and Tav's Birthday.", width: 1600, height: 2400 },
      { src: px("789986911/fe17fe28238eb74a6653c80c32f59b62-xxlarge.JPEG"), alt: "Friends posing in pink light at Jean and Tav's Birthday.", width: 1600, height: 2400 },
    ],
  },
  {
    slug: "kick-off",
    name: "The Kick Off",
    short: "Kick Off",
    date: "2026-06-07",
    gallery: "https://offthel.pixieset.com/thekickoff/",
    photos: [
      { src: px("049986911/1299af3104ca3b816c7af7e1aea3f527-xxlarge.JPG"), alt: "A guest in a red striped football jersey grinning at The Kick Off.", width: 1600, height: 2400 },
      { src: px("049986911/b07b7240dc8a2ec6baad90fd15bfbd61-xxlarge.JPG"), alt: "A guest in a white football jersey at The Kick Off.", width: 1600, height: 2400 },
      { src: px("049986911/a208e7833d83382ae9f95e23c5b9ef61-xxlarge.JPG"), alt: "A guest in sunglasses and a yellow top at The Kick Off.", width: 1600, height: 2400 },
      { src: px("049986911/9436bdceb63877bd8045441521f4fdc6-xxlarge.JPG"), alt: "Two friends at golden hour at The Kick Off.", width: 1600, height: 2400 },
      { src: px("049986911/94a4237491098eb8d963d6c46a30e757-xxlarge.JPG"), alt: "Friends in football shirts at The Kick Off.", width: 1600, height: 2400 },
    ],
  },
  {
    slug: "brit-party",
    name: "Another Brit Party",
    short: "Brit Party",
    date: "2026-05-02",
    gallery: "https://offthel.pixieset.com/anotherbritparty/",
    photos: [
      { src: px("445721411/bab47add8345ec1ad5295fc65485771c-xxlarge.JPG"), alt: "A guest in a gold party crown in a crowd lit pink at Another Brit Party.", width: 1600, height: 2400 },
      { src: px("445721411/c8d46d4c89a5cb59bae969ffa07f0d66-xxlarge.jpg"), alt: "The DJ in a gold crown at Another Brit Party.", width: 1600, height: 2413 },
      { src: px("445721411/81e75738754c6f489ec3b297b39290b7-xxlarge.JPG"), alt: "A guest in a crown and a red England shirt at Another Brit Party.", width: 1600, height: 2400 },
      { src: px("445721411/e7c03a3825589434b808f55d53018d4f-xxlarge.jpg"), alt: "A Union Jack flag over the crowd at Another Brit Party.", width: 1600, height: 1061 },
      { src: px("445721411/91bfe055616af0be4182222cdf9a4ba9-xxlarge.jpg"), alt: "A guest in sunglasses throwing a sign at Another Brit Party.", width: 1600, height: 2413 },
    ],
  },
];

export const pastTitle = "Past stops";
export const allGalleries = "https://offthel.pixieset.com/";

export const list = {
  title: "Get on the list",
  line: "First crack at tickets, free entry drops, and the photos before anyone else. No spam.",
  href: "https://linktr.ee/otl_nyc",
  cta: "Join the list",
};

/** The line so far: every past stop, oldest first, then the next party and what comes after. */
export const lineTitle = "The line so far";
const md = (iso: string) => {
  const [, m, d] = iso.split("-");
  return `${Number(m)}/${Number(d)}`;
};
export const line = [
  ...[...pastStops].reverse().map((s) => ({ label: s.short, when: md(s.date) })),
  {
    label: nextStop.name,
    when: new Date(nextStop.start).toLocaleDateString("en-US", { month: "numeric", day: "numeric", timeZone: "America/New_York" }),
    isNext: true,
  },
  { label: "Next stop", when: "Soon" },
];
