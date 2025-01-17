import { useQuery } from '@tanstack/react-query';

import platforms from "../data/platforms";

//import { FetchResponse } from './useData';
//import apiClient,{ FetchResponse } from "../services/api-client";
import APIClient from '../services/api-client';


export interface Platform {
  id: number;
  name: string;
  slug: string;
}


/*
const usePlatforms = () => ({ data: platforms, isLoading: false, error: null });

export default usePlatforms;
*/

const platformsService=new APIClient<Platform>('/platforms/lists/parents')

const usePlatforms= () => {
 
  
  return useQuery({
  
    queryKey: ['platforms'],
    queryFn: platformsService.getAll,
    //queryFn: () => apiClient.get<FetchResponse<Platform>>('/platforms/lists/parents')
    //.then(res => res.data),

    staleTime:24 *60 * 60 * 1000, // 10 seconds
    initialData:{count: platforms.length, results: platforms},

  })


}

export default usePlatforms;
