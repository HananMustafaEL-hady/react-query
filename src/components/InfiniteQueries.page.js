import { useInfiniteQuery } from "react-query";
import axios from "axios";
import React from "react";
import { useState } from "react";
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) return <h2>Loading.......</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <div>
        {data?.pages?.map((group, index) => {
          return (
            <div key={index}>
              {group.data?.map((color) => {
                return (
                  <h2>
                    {color.id} {color.label}
                  </h2>
                );
              })}
            </div>
          );
        })}
      </div>

      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>

      {isFetching && !isFetchingNextPage ? <p>Loading.....</p> : ""}
    </>
  );
};
