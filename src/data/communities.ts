export type Community = {
  id: string;
  name: string;
  members: number;
};

export const COMMUNITIES: Community[] = [
  { id: "melbourne-runners", name: "Melbourne Runners", members: 1240 },
  { id: "albert-park-locals", name: "Albert Park Locals", members: 386 },
  { id: "weekend-hikers", name: "Weekend Hikers", members: 912 },
  { id: "book-club-fitzroy", name: "Book Club Fitzroy", members: 148 },
  { id: "tech-meetups-au", name: "Tech Meetups AU", members: 2075 },
];

export function communityName(id: string): string {
  return COMMUNITIES.find((community) => community.id === id)?.name ?? id;
}
