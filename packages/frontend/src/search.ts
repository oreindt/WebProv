import Fuse from 'fuse.js';

// TODO REMOVE
export interface Result {
  id: string;
  title: string;
  type: string; // TODO
  model: number;
}

export interface SearchItem {
  id: string;
  title: string;
  type: string;
  model: number;
  information: string[];
}


const options: Fuse.FuseOptions<SearchItem> = {
  keys: ['information', 'title'],
};

export const search = (items: SearchItem[], pattern: string) => {
  const fuse = new Fuse(items, options);
  return fuse.search(pattern);
};
