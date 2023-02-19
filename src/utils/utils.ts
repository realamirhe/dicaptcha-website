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
