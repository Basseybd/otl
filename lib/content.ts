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
  line: "Straight off the dance floor. The full clip lives on the feed.",
  sources: [
    { src: "/media/feed.webm", type: "video/webm" },
    { src: "/media/feed.mp4", type: "video/mp4" },
  ],
  poster: "/media/feed-poster.webp",
  href: "https://www.instagram.com/reel/DcXCl5lJLpB/",
  alt: "Clips from the dance floor at an OTL party.",
};

/** Past parties. Photos are OTL's own Pixieset galleries, served through Next's image optimizer. */
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

const px = (path: string) => `https://images.pixieset.com/${path}`;

export const pastStops: PastStop[] = [
  {
    slug: "sessions-01",
    name: "OTL Sessions vol. 1",
    short: "Sessions 01",
    date: "2026-09-27",
    note: "Our first set, recorded live. The mix drops soon.",
    gallery: "https://offthel.pixieset.com/otlsessions/",
    photos: [
      { src: px("305125321/3058906e861858b203ebfeec17d2b84f-cover.JPG"), alt: "OTL Sessions vol. 1, the DJ at work in a sunlit room.", width: 1600, height: 2400 },
      { src: px("305125321/cb5f76053fb07dadfc3e06cf37893f32-large.JPG"), alt: "A guest grinning at OTL Sessions vol. 1.", width: 640, height: 960 },
      { src: px("305125321/685f36d78f3c393f5630495b204ccee0-large.JPG"), alt: "Guests at OTL Sessions vol. 1.", width: 640, height: 960 },
      { src: px("305125321/8cdaf57088fa510f8a6012373e62c03e-large.JPG"), alt: "Behind the decks at OTL Sessions vol. 1.", width: 640, height: 960 },
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
      { src: px("769986911/adeb52a95af2d2c36584dc43c4aba8c7-cover.JPG"), alt: "A guest in a pink shirt on the rooftop at Pink Frequency.", width: 1600, height: 2400 },
      { src: px("769986911/8009994c79e9879b23353b7a4806663a-large.JPG"), alt: "A guest on the rooftop at Pink Frequency.", width: 640, height: 960 },
      { src: px("769986911/e4f747474063809ff895e958eafbbcb2-large.JPG"), alt: "Guests on the rooftop at Pink Frequency.", width: 640, height: 960 },
      { src: px("769986911/31dbfffc8db5bdea6d6c68d0b33e45d0-large.JPG"), alt: "A guest at Pink Frequency.", width: 640, height: 960 },
    ],
  },
  {
    slug: "jean-and-tav",
    name: "Jean & Tav's Birthday",
    short: "Jean & Tav",
    date: "2026-07-25",
    gallery: "https://offthel.pixieset.com/jeanandtavsbirthday/",
    photos: [
      { src: px("789986911/01882e6e83d6e6223be1e72c36c1e0e8-cover.JPG"), alt: "The DJ booth under red light at Jean and Tav's Birthday.", width: 1600, height: 2400 },
      { src: px("789986911/bb8a77ae995974c9263037a83127cb0a-large.JPG"), alt: "On the decks at Jean and Tav's Birthday.", width: 640, height: 960 },
      { src: px("789986911/b282ce502ce13e5e52ab2cf6878fe264-large.JPG"), alt: "Guests at Jean and Tav's Birthday.", width: 640, height: 960 },
      { src: px("789986911/0a93b531484c3c35c82f8ad1870a1b0b-large.JPG"), alt: "A guest at Jean and Tav's Birthday.", width: 640, height: 960 },
    ],
  },
  {
    slug: "kick-off",
    name: "The Kick Off",
    short: "Kick Off",
    date: "2026-06-07",
    gallery: "https://offthel.pixieset.com/thekickoff/",
    photos: [
      { src: px("049986911/b154bfe952177ed669ec44e96864d8fd-cover.JPG"), alt: "A guest in a striped jersey at The Kick Off.", width: 1600, height: 2400 },
      { src: px("049986911/a71093d0624dbd0403f3eaa15b1f46f9-large.JPG"), alt: "A guest in a printed shirt at The Kick Off.", width: 640, height: 960 },
      { src: px("049986911/830e79ab8fb6fce429e5c8024a327ec7-large.JPG"), alt: "A guest smiling at The Kick Off.", width: 640, height: 960 },
      { src: px("049986911/b29825ec7cefe63dcfefea6d283d05b9-large.JPG"), alt: "The crowd at The Kick Off.", width: 640, height: 960 },
    ],
  },
  {
    slug: "brit-party",
    name: "Another Brit Party",
    short: "Brit Party",
    date: "2026-05-02",
    gallery: "https://offthel.pixieset.com/anotherbritparty/",
    photos: [
      { src: px("445721411/50f733e90d2274fa1b963f69dae9eaff-cover.jpg"), alt: "A moment from Another Brit Party.", width: 1600, height: 1061 },
      { src: px("445721411/7d8f893b83f45afa79aab0ffadf373cd-large.jpg"), alt: "A group of friends posing at Another Brit Party.", width: 640, height: 424 },
      { src: px("445721411/c8d46d4c89a5cb59bae969ffa07f0d66-large.jpg"), alt: "A guest at Another Brit Party.", width: 640, height: 966 },
      { src: px("445721411/a3feaafa9538d15a72ba40138f116a95-large.jpg"), alt: "Friends together at Another Brit Party.", width: 640, height: 424 },
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
