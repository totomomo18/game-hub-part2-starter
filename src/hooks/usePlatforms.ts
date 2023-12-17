import { useQuery } from '@tanstack/react-query';

import platforms from "../data/platforms";
import apiClient,{ FetchResponse } from "../services/api-client";
import { CACHED_KEY_GENRES } from '../constants';
//import { FetchResponse } from './useData';


export interface Platform {
  id: number;
  name: string;
  slug: string;
}


/*
const usePlatforms = () => ({ data: platforms, isLoading: false, error: null });

export default usePlatforms;
*/

const usePlatforms= () => {
 
  
  return useQuery({
  
    queryKey: ['platforms'],
    //queryFn: genresService.getAll,
    queryFn: () => apiClient.get<FetchResponse<Platform>>('/platforms/lists/parents')
    
    
    .then(res => res.data),

    staleTime:24 *60 * 60 * 1000, // 10 seconds
    initialData:{count: platforms.length, results: platforms},

  })


}

export default usePlatforms;
