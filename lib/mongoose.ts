const mongoose = require('mongoose');

async function connectToAtlas() {
  try {
    const connectionString = 'mongodb+srv://dfalsabrook:dfAWj1CvKBLc29th@joypainting.fqqbi.mongodb.net/?retryWrites=true&w=majority&appName=joyPainting';

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

connectToAtlas();
