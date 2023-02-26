import axios from 'axios';
import https from 'https';
import {
  ImagePrompt,
  NegativesKeywordsPrompt,
  PositivesKeywordsPrompt,
} from './types';
import { choice, normalizeId, pipeIds } from './utils';
import rawDicaptcha from '../data/dicaptcha.v1.json';
import rawWords from '../data/words.json';

const dicaptcha = pipeIds<
  Record<string, { image: string; tags: string[]; nsfw_score: number }>
>(rawDicaptcha).filter(captcha => captcha.tags.length > 1);

const words = rawWords.filter(w => w.length > 5 && w.length < 12);

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const getImagePrompt = async () => {
  throw new Error('AWS Server is down');
};

export const getTokenForPrompt = async (prompt: string) => {
  throw new Error('AWS Server is down');
};

export const getImages = async (): Promise<typeof dicaptcha> => {
  return dicaptcha;
};

export const getRandomWords = (count: number) => {
  return choice(words, count);
};

export const getPositives = async (
  id: string,
): Promise<PositivesKeywordsPrompt['pos'][]> => {
  const res = await instance.get<PositivesKeywordsPrompt[]>(
    `${process.env.DATA_CDN_BASE_URL}/midjourney/gitrow/positives.csv`,
  );
  return res.data
    .map(normalizeId)
    .filter(item => item.id === id)
    .map(item => item.pos);
};

export const getNegatives = async (
  id: string,
): Promise<NegativesKeywordsPrompt['neg'][]> => {
  const res = await instance.get<NegativesKeywordsPrompt[]>(
    `${process.env.DATA_CDN_BASE_URL}/midjourney/gitrow/negatives.csv`,
  );
  return res.data
    .map(normalizeId)
    .filter(item => item.id === id)
    .map(item => item.neg);
};
