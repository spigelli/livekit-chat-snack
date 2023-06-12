// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AccessToken } from 'livekit-server-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  token: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { 
    query: {
      jane,
    }
  } = req

  const token = new AccessToken(
    'key',
    'secret',
    {
      ttl: '1 days',
      name: jane ? 'Jane Doe' : 'John Doe',
      identity: jane ? 'jane-doe' : 'john-doe',
    }
  );

  token.addGrant({
    roomCreate: true,
    roomJoin: true,
    roomList: true,
    roomRecord: true,
    roomAdmin: true,
    room: 'Default',
    ingressAdmin: true,
    canPublish: true,
    // canPublishSources: true,
    canSubscribe: true,
    canPublishData: true,
    canUpdateOwnMetadata: true,
    hidden: false,
    recorder: true,
  });

  res.status(200).json({ token: token.toJwt() })
}
