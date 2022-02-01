import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post(`http://localhost:4000/superheroes`, hero);
};
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime: 5000,
    // staleTime: 3000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // enabled: false,
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data?.data?.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    // queryClient.invalidateQueries("super-heroes");
    // queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data],
    //   };
    // });

    // },

    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueriesData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onstalled: () => {
      queryClient.invalidateQueries("previousHeroData");
    },
  });
};
