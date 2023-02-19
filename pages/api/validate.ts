import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

type ResponseData = { token: string } | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const selecteds: string[] = req.body.selecteds;
  const trust: string[] = req.body.trust;

  const negativeCounts = selecteds.filter(x => !trust.includes(x)).length;
  const positiveCounts = selecteds.length - negativeCounts;
  const score = positiveCounts - negativeCounts;

  let isHuman = true;
  if (negativeCounts < 2) {
    const count = score + negativeCounts;
    isHuman = count >= 2; // neg{0,1} pos{2,3,4}
  } else {
    isHuman = score >= 3; // +pos(0,1,2,3,4) - neg(2,3)
  }

  // console.log({
  //   trust,
  //   selecteds,
  //   isHuman,
  //   score,
  // });

  if (isHuman) {
    res.status(200).json({ token: nanoid().repeat(2) });
  } else {
    res.status(401).json({ message: 'can not be trusted yet!' });
  }
}
