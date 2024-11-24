import mongoose, { Schema, Document } from 'mongoose';

interface Painting extends Document {
  titles: string[];
  season_episode: string;
  image: string;
  video: string;
  subjects: string[];
  colors: string[];
  hexList: string[];
  date: string;
  guest: string;
}

const PaintingSchema: Schema = new Schema({
  titles: { type: [String], required: true },
  season_episode: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  subjects: { type: [String], required: true },
  colors: { type: [String], required: true },
  hexList: { type: [String], required: true },
  date: { type: String, required: true },
  guest: { type: String, required: false },
});

const PaintingModel = mongoose.models.Painting || mongoose.model<Painting>('Painting', PaintingSchema);

export default PaintingModel;
