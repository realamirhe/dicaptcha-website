export const choice = <T>(arr: readonly T[], n: number): T[] => {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
};

export const normalizeId = <T extends { id: string }>(item: T) => {
  item.id = item['﻿id' as 'id'];
  // @ts-ignore
  delete item['﻿id'];
  return item;
};
