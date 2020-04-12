import axios, { AxiosInstance } from 'axios';
import { MovieDetail } from './types';

class MovieService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://www.omdbapi.com/',
    });
  }

  public async getMovieList(token: string, page: number, type: string | null, year: number | null) {
    const result = await this.axiosInstance.get('/', {
      params: {
        page,
        type,
        s: 'Batman',
        apikey: token,
        y: year,
      }
    });
    return {
      result: result.data.Search,
      numberOfResult: result.data.totalResults,
    };
  }

  public async getSpecificMovie(token: string, id: string): Promise<MovieDetail> {
    const result = await this.axiosInstance.get('/', {
      params: {
        i: id,
        apikey: token,
      }
    });

    return result.data;
  }
}

const movieService = new MovieService();

export default {
  movieService,
};
