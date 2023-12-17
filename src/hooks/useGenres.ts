import { useQuery } from '@tanstack/react-query';


import { CACHED_KEY_GENRES } from '../constants';
import genres from "../data/genres";
//import genresService, { Genre } from '../services/genresService';
import apiClient,{ FetchResponse } from "../services/api-client";

//import { FetchResponse } from './useData';





export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

/*
const useGenres = () => ({ data: genres, isLoading: false, error: null })

export default useGenres;
*/



const useGenres= () => {
 
  
  return useQuery({
  
    queryKey: ['genres'],
    //queryFn: genresService.getAll,
    queryFn: () => apiClient.get<FetchResponse<Genre>>('/genres')
    .then(res => res.data),

    staleTime:24 *60 * 60 * 1000, // 10 seconds
    initialData:{count: genres.length, results: genres},

  })


}

export default useGenres;
