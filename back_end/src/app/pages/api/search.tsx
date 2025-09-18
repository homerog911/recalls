// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, manufacturer, model } = req.body;
    
    const { db } = await connectToDatabase();
    
    // Build query based on filters
    const query: any = {};
    if (category) query.category = category;
    if (manufacturer) query.manufacturer = manufacturer;
    if (model) query.model = { $regex: model, $options: 'i' }; // Case-insensitive search

    // Perform search - adjust collection name as needed
    const results = await db.collection('vehicles').find(query).toArray();
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}