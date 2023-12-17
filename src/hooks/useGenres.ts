import { useQuery } from '@tanstack/react-query';



import genres from "../data/genres";

//import { FetchResponse } from './useData';
//import apiClient,{ FetchResponse } from "../services/api-client";

import APIClient from '../services/api-client';

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

/*
const useGenres = () => ({ data: genres, isLoading: false, error: null })

export default useGenres;
*/

const genresService=new APIClient<Genre>('/genres')

const useGenres= () => {
 
  
  return useQuery({
  
    queryKey: ['genres'],
    queryFn: genresService.getAll,
    //queryFn: () => apiClient.get<FetchResponse<Genre>>('/genres')
    //.then(res => res.data),

    staleTime:24 *60 * 60 * 1000, // 10 seconds
    initialData:{count: genres.length, results: genres},

  })


}

export default useGenres;
