import mongoose, { Schema, Model, Document } from 'mongoose';

type ClipDocument = Document & {
  id: string;
  footage: string;
};

type ClipInput = {
  id: ClipDocument['id'];
  footage: ClipDocument['footage'];
};

const clipSchema = new Schema(
  {
    id: {
      type: Schema.Types.String,
      required: true,
    },
    footage: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'clips',
    timestamps: true,
  },
);

if (mongoose.models.Clip) {
  delete mongoose.models.Clip;
}

const Clip: Model<ClipDocument> = mongoose.model<ClipDocument>(
  'Clip',
  clipSchema,
);

export { Clip, ClipInput, ClipDocument };
