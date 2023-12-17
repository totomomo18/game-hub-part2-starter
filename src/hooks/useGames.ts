import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

//import { FetchResponse } from './useData';
//import apiClient,{ FetchResponse } from "../services/api-client";
import APIClient,{ FetchResponse } from '../services/api-client';

import { GameQuery } from "../App";
import { Platform } from "../hooks/usePlatforms";


//import useData from "./useData";
//import { Genre } from "./useGenres";

/*
export interface Platform {
  id: number;
  name: string;
  slug: string;
}
*/

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

/*
const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText
      },
    },
    [gameQuery]
  );

export default useGames;
*/

const gamesService=new APIClient<Game>('/games')

const useGames= (gameQuery: GameQuery) => {
 
  
  return useInfiniteQuery<FetchResponse<Game>,Error>({
  

  queryKey: ['games',gameQuery],
  queryFn: ({pageParam=1}) => gamesService.getAll(

    {

      params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
        page: pageParam
      },
  
    }

  ),
  keepPreviousData: true,
  getNextPageParam: (lastPage,allPages) => 
  { 
    return lastPage.next? allPages.length+1: undefined;    
  },



  /*
  queryFn: () => apiClient.get<FetchResponse<Game>>('/games',
  {

    params: {
      genres: gameQuery.genre?.id,
      parent_platforms: gameQuery.platform?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText
    },

  }
  )
  .then(res => res.data),
  */

  staleTime:24 *60 * 60 * 1000, // 10 seconds
  //initialData:{count: genres.length, results: genres},

})


}

export default useGames;
