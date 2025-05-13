export interface ProfileData {
  id: number;
  role: unknown;
  gender: unknown;
  name: string;
  followers: number;
  following: number;
  events: number;
  about: string;
  avatar: string;
  retreats: {
    id: number;
    image: string;
    name: string;
    location: string;
    date: string;
    time: string;
    priceRange: string;
    description: string;
  }[];
}