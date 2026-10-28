export type SavedContact = {
  id: string;
  name: string;
  email: string;
};

export const SAVED_CONTACTS: SavedContact[] = [
  { id: "mia", name: "Mia Rossi", email: "mia.rossi@gmail.com" },
  { id: "dan", name: "Dan Lee", email: "dan.lee@work.com" },
  { id: "tom", name: "Tom Walker", email: "tom.walker@outlook.com" },
];
