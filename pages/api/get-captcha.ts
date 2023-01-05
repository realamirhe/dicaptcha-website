// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { selectTags } from 'src/utils/algorithms';
import {
  getImagePrompt,
  getImages,
  getNegatives,
  getPositives,
  getTokenForPrompt,
} from 'src/utils/requests';
import { choice } from 'src/utils/utils';

interface ResponseData {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const [record] = choice(await getImages(), 1);
  const { id, image } = record;
  const pos = await getPositives(id);
  const neg = await getNegatives(id);
  const keywords = [...pos, ...neg];

  res.status(200).json({
    tags: choice(keywords, 7),
    image,
    trust: pos,
  });
}
