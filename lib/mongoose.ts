import mongoose from 'mongoose';
import PaintingModel from '@/models/painting';

const connectionString = process.env.MONGODB_URI;
interface PaintingQuery {
  colors?: { $all: string[] };
  date?: { $regex: RegExp };
  subjects?: { $all: string[] };
}

async function connectToAtlas() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

// Function to check connection status
function isConnected() {
  return mongoose.connection.readyState === 1;
}

// Function to upload paintings to mongo atlas
async function uploadToAtlas(paintingObjects: Record<string, unknown>) {
  if (!isConnected()) {
    await connectToAtlas();
    if (!isConnected()) return false;
  }
  try {
    const episodes = Object.values(paintingObjects);
    await PaintingModel.insertMany(episodes);
  } catch (error) {
    console.error('Error uploading to MongoDB:', error);
    return false;
  }
  return true;
}

// Function to get paintings from mongo atlas
async function getFromAtlas(data: { color?: string[]; month?: string; subject?: string[] }) {
  const { color, month, subject } = data;

  // Define the query object with the PaintingQuery type
  const query: PaintingQuery = {};
  if (color && color.length > 0) {
    query.colors = { $all: color };
  }
  if (month) {
    query.date = { $regex: new RegExp(`\\s*${month}\\s*`, 'i') };
  }
  if (subject && subject.length > 0) {
    query.subjects = { $all: subject };
  }

  try {
    const results = await PaintingModel.find(query).exec();
    return results;
  } catch (error) {
    console.error('Error fetching from MongoDB:', error);
    throw error;
  }
}

export { connectToAtlas, isConnected, uploadToAtlas, getFromAtlas };
