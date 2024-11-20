import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://dfalsabrook:dfAWj1CvKBLc29th@joypainting.fqqbi.mongodb.net/?retryWrites=true&w=majority&appName=joyPainting';

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

export { connectToAtlas, isConnected };
