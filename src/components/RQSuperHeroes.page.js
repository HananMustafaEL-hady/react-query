import { useQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react/cjs/react.production.min";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    fetchSuperHeroes
  );

  if (isLoading) return <p>Loading........</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <Fragment>
      <h2>React Query Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </Fragment>
  );
};
