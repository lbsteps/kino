import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  // Basic Info
  tmdbId?: number;
  title: {
    en: string;
    [key: string]: string; // Support for any language
  };
  description: {
    en: string;
    [key: string]: string;
  };
  releaseDate: Date;
  runtime?: number; // minutes
  contentType: 'movie' | 'tv';

  // Media
  poster?: string; // URL
  backdrop?: string; // URL
  screenshots?: string[];
  trailer?: string; // YouTube URL

  // Classification
  categories: mongoose.Types.ObjectId[];
  countries: string[];
  languages: string[];
  genres: string[];
  rating?: number; // 0-10
  contentRating?: string; // G, PG, PG-13, R, etc.

  // Credits
  directors: string[];
  writers: string[];
  cast: {
    name: string;
    character: string;
    image?: string;
  }[];

  // Sources
  playbackSources: mongoose.Types.ObjectId[];

  // Metadata
  isLegal: boolean; // Mark as legally sourced
  copyrightInfo?: string;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  favorites: mongoose.Types.ObjectId[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema = new Schema<IMovie>(
  {
    tmdbId: { type: Number, index: true },
    title: {
      en: { type: String, required: true },
      'zh-CN': String,
      kk: String, // Kazakh
      ug: String // Uyghur
    },
    description: {
      en: String,
      'zh-CN': String,
      kk: String,
      ug: String
    },
    releaseDate: { type: Date, index: true },
    runtime: Number,
    contentType: {
      type: String,
      enum: ['movie', 'tv'],
      default: 'movie',
      index: true
    },
    poster: String,
    backdrop: String,
    screenshots: [String],
    trailer: String,
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    countries: [String],
    languages: [String],
    genres: [String],
    rating: { type: Number, min: 0, max: 10 },
    contentRating: String,
    directors: [String],
    writers: [String],
    cast: [
      {
        name: String,
        character: String,
        image: String
      }
    ],
    playbackSources: [{ type: Schema.Types.ObjectId, ref: 'PlaybackSource' }],
    isLegal: { type: Boolean, default: true, index: true },
    copyrightInfo: String,
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true
    },
    viewCount: { type: Number, default: 0 },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
    collection: 'movies'
  }
);

// Indexes for performance
moviSchema.index({ 'title.en': 'text', 'description.en': 'text' });
moviSchema.index({ status: 1, isLegal: 1 });
moviSchema.index({ contentType: 1, releaseDate: -1 });

export default mongoose.model<IMovie>('Movie', movieSchema);
