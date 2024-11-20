import mongoose, { Schema, Document } from 'mongoose';

interface IPainting extends Document {
  title: string;
  date: string;
  color: string;
  subject: string;
}

const PaintingSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  color: { type: [String], required: true },
  subject: { type: String, required: true },
});

const Painting = mongoose.model<IPainting>('Painting', PaintingSchema);

export default Painting;
