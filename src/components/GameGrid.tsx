import { Box, Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import { Platform } from "../hooks/usePlatforms";
import { Genre } from "../hooks/useGenres";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import React from "react";
import InfinityScroll from "react-infinite-scroll-component";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage,hasNextPage } =
    useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error.message}</Text>;

  const fetchGamesCount=data?.pages.reduce(
    (total, page) => total + page.results.length,
     0) || 0;

  return (
    <>
     <Box padding="10px">
<InfinityScroll 
dataLength={fetchGamesCount}
hasMore={!!hasNextPage}
next={() => fetchNextPage()}
loader={<Spinner />}
>
  
     
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        
        spacing={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}

        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>

      </InfinityScroll>
{false && hasNextPage &&
      <Button marginY={5}
        
     
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </Button>
}
</Box>
    </>
  );
};

export default GameGrid;
