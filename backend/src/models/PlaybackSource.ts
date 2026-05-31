import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaybackSource extends Document {
  movieId: mongoose.Types.ObjectId;
  name: string; // e.g., "Official Stream", "Partner CDN"
  sourceUrl: string; // Streaming URL or embed code
  sourceType: 'direct' | 'iframe' | 'platform'; // Type of source
  platform?: string; // e.g., "YouTube", "Dailymotion", "Vimeo"
  quality: '360p' | '480p' | '720p' | '1080p' | '2160p';
  language: string; // Language code
  subtitle?: string[]; // Subtitle language codes
  region?: string; // Geo-restriction
  isActive: boolean;
  copyright?: string; // Copyright/license info
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const playbackSourceSchema = new Schema<IPlaybackSource>(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
      index: true
    },
    name: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    sourceType: {
      type: String,
      enum: ['direct', 'iframe', 'platform'],
      default: 'iframe'
    },
    platform: String,
    quality: {
      type: String,
      enum: ['360p', '480p', '720p', '1080p', '2160p'],
      default: '720p'
    },
    language: { type: String, default: 'en' },
    subtitle: [String],
    region: String,
    isActive: { type: Boolean, default: true, index: true },
    copyright: String,
    expiresAt: Date
  },
  {
    timestamps: true,
    collection: 'playback_sources'
  }
);

export default mongoose.model<IPlaybackSource>('PlaybackSource', playbackSourceSchema);
