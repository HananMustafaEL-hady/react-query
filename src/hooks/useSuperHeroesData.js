import axios from "axios";
import { useQuery } from "react-query";
const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
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
