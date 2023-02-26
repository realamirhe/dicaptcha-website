import { getRandomWords } from './requests';

export const choice = <T>(arr: readonly T[], n: number): T[] => {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
};

export const normalizeId = <T extends { id: string }>(item: T) => {
  item.id = item['﻿id' as 'id'];
  // @ts-ignore
  delete item['﻿id'];
  return item;
};

export const pipeIds = <T extends Record<string, any>>(obj: T) => {
  const data = Object.keys(obj).map(id => ({ id, ...obj[id] }));
  return data as (T[keyof T] & { id: string })[];
};

export const MAX_TAGS_COUNT = 7;
export const getFinalKeywords = (posTags: string[], negTags: string[]) => {
  const posSize = Math.min(posTags.length, MAX_TAGS_COUNT - 2);
  let noiseCount: number = 1;
  if (posSize < 2) noiseCount = 3;
  else if (posSize < 4) noiseCount = 1;
  else if (posSize < 5) noiseCount = 2;
  else noiseCount = 1;

  const noiseTags = getRandomWords(noiseCount);
  const falsyTags = [...new Set([...negTags, ...noiseTags])];
  const negativeSelection = MAX_TAGS_COUNT - posSize;

  return choice(
    [
      ...new Set([
        ...choice(posTags, MAX_TAGS_COUNT - 2),
        ...choice(falsyTags, Math.max(negativeSelection, 1)),
      ]),
    ],
    MAX_TAGS_COUNT,
  );
};
