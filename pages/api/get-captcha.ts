import type { NextApiRequest, NextApiResponse } from 'next';
import { getImages } from 'src/utils/requests';
import { choice, getFinalKeywords } from 'src/utils/utils';

interface ResponseData {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const [positive, negative] = choice(await getImages(), 2);
  const { image, tags: positiveTags } = positive;
  const { tags: negativeTags } = negative;

  res.status(200).json({
    tags: getFinalKeywords(positiveTags, negativeTags),
    image,
    trust: positiveTags,
  });
}
