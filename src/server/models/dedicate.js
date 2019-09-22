import mongoose, { Schema } from "mongoose";

const AlbumSchema = new Schema({
  title: {
    type: String
  },
  cover: {
    type: String
  }
});

const SongSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  album: AlbumSchema
});

const DedicateSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group"
    },
    song: SongSchema,
    to: {
      type: String
    },
    message: {
      type: String
    },
    isQueued: {
      type: Boolean,
      default: false
    },
    isShown: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Dedicate", DedicateSchema);
