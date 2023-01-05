export type ResonseTags = Record<
  'pos' | 'neg',
  [tag: string, score: number][]
> & {
  gold: string[];
};

export interface ImagePrompt {
  id: string;
  image: string;
  score: number;
}

interface KeywordsPrompt {
  id: string;
  score: number;
}
export interface PositivesKeywordsPrompt extends KeywordsPrompt {
  pos: string;
}

export interface NegativesKeywordsPrompt extends KeywordsPrompt {
  neg: string;
}
