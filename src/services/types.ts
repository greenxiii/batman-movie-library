export interface RootState {
  user: UserState;
  movies: MovieState;
}

export interface User {
  name: string;
  apiToken: string;
}

export interface UserState {
  user: User;
}

export interface Movie {
  imdbID: string;
  Year: string;
  Title: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Production: string;
  Plot: string;
}

export interface MovieState {
  movieList: Array<Movie>;
  movieDetails: MovieDetail;
  page: number;
  year: number | null;
  type: string | null;
}