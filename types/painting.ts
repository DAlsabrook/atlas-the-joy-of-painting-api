export interface Painting {
  _id: string;
  titles: string[];
  season_episode: string;
  image: string;
  video: string;
  subjects: string[];
  colors: string[];
  hexList: string[];
  date: string;
  guest: string;
}

export interface FilterOptions {
  colors: string[];
  subjects: string[];
  months: string[];
}

