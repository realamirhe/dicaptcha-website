import type { NextApiRequest, NextApiResponse } from 'next';
import { getImages } from 'src/utils/requests';
import { choice } from 'src/utils/utils';

interface ResponseData {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const [positive, negative] = choice(await getImages(), 2);
  const { image, tags: positiveTags } = positive;
  const { tags: negativeTags } = negative;

  const keywords = [...positiveTags, ...negativeTags];

  res.status(200).json({
    tags: choice(keywords, 8),
    image,
    trust: positiveTags,
  });
}
