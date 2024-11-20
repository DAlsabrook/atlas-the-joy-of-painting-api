import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return GET(req, res);
    case 'POST':
      return POST(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'GET request working' });
}

function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  res.status(200).json({ message: 'POST request working', data });
}
