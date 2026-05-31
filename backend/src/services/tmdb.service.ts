import axios, { AxiosInstance } from 'axios';

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genres: Array<{ id: number; name: string }>;
  runtime?: number;
  vote_average: number;
  credits?: {
    cast: Array<{ name: string; character: string; profile_path?: string }>;
    crew: Array<{ name: string; job: string }>;
  };
}

class TMDBService {
  private client: AxiosInstance;
  private baseURL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
  private apiKey = process.env.TMDB_API_KEY;

  constructor() {
    if (!this.apiKey) {
      console.warn('TMDB API Key not configured. Some features will be unavailable.');
    }

    this.client = axios.create({
      baseURL: this.baseURL,
      params: {
        api_key: this.apiKey
      }
    });
  }

  /**
   * Search for movies by title
   */
  async searchMovies(
    query: string,
    language: string = 'en'
  ): Promise<TMDBMovie[]> {
    try {
      const response = await this.client.get('/search/movie', {
        params: {
          query: query,
          language: language
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('TMDB search error:', error);
      return [];
    }
  }

  /**
   * Get movie details by ID
   */
  async getMovieDetails(
    movieId: number,
    language: string = 'en'
  ): Promise<TMDBMovie | null> {
    try {
      const response = await this.client.get(`/movie/${movieId}`, {
        params: {
          language: language,
          append_to_response: 'credits,videos'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`TMDB get movie error (ID: ${movieId}):`, error);
      return null;
    }
  }

  /**
   * Get trending movies
   */
  async getTrendingMovies(
    timeWindow: 'day' | 'week' = 'week'
  ): Promise<TMDBMovie[]> {
    try {
      const response = await this.client.get(`/trending/movie/${timeWindow}`);
      return response.data.results;
    } catch (error) {
      console.error('TMDB trending error:', error);
      return [];
    }
  }

  /**
   * Get image URL
   */
  getImageUrl(path: string, size: string = 'w500'): string {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

export default new TMDBService();
