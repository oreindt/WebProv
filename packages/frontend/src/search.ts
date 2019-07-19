import Fuse from 'fuse.js';

export interface SearchItem {
  id: string;
  title: string;
  type: string;
  studyId: number | undefined;
  studyText: string | undefined;
  extra: string[];
}

const keys: Array<keyof SearchItem> = ['extra', 'title', 'id', 'studyText'];

export const search = (items: SearchItem[], pattern: string) => {
  if (pattern.trim() === '') {
    return items;
  }

  const fuse = new Fuse(items, { keys });
  return fuse.search(pattern);
};
