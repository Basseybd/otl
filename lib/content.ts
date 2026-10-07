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

export const recap = {
  name: "Pink Frequency",
  where: "The Ivory on Park",
  line: "The Ivory on Park went off. A few frames below. The full gallery is on the other side.",
  href: "https://offthel.pixieset.com/pinkfrequency/",
  status: "Arrived",
  photos: [
    { src: "/media/pink-1.webp", alt: "A guest in a crochet flower shirt holding two pink retro phones against a blue sky.", width: 460, height: 690 },
    { src: "/media/pink-2.webp", alt: "A guest puckering for the camera with a pink retro phone to her ear.", width: 460, height: 690 },
    { src: "/media/pink-3.webp", alt: "A guest with curly hair smiling, a pink retro phone in hand, on the rooftop at golden hour.", width: 460, height: 690 },
  ],
};

export const sessions = {
  name: "OTL Sessions 001",
  line: "Our first set, recorded live. It drops soon. Follow along so you catch it.",
  status: "Soon",
  statusNote: "Recorded live",
  // Links come from the newsletter template and are not live yet.
  youtube: null as string | null,
  soundcloud: null as string | null,
};

/** The line so far. "done" and "now" are computed from nextStop's dates. */
export const lineTitle = "The line so far";
export const line = [
  { label: "First party", when: "2025" },
  { label: "Pink Frequency", when: "Summer 2026" },
  {
    label: nextStop.name,
    when: new Date(nextStop.start).toLocaleDateString("en-US", { month: "numeric", day: "numeric", timeZone: "America/New_York" }),
    isNext: true,
  },
  { label: "Next stop", when: "Soon" },
];
