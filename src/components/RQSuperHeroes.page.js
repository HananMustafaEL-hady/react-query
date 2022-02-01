import axios from "axios";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("onSuccess", data);
  };

  const onError = (error) => {
    console.log("onError", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  // console.log("isFetching", isFetching, "isLoading", isLoading);

  if (isLoading || isFetching) return <p>Loading........</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* <button onClick={refetch}>fetch heroes</button> */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data?.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })} */}
    </>
  );
};
