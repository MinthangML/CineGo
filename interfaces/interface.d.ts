interface Movie {
  id: number;
  title: string;
  adult?: boolean;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  popularity?: number;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
}

interface TrendingMovie {
  movie_id: number;
  title: string;
  poster_url?: string;
  index: number;
}
