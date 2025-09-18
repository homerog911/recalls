import { getDb } from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const categories = await db.collection('categories').find({}).toArray();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}