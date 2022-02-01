import axios from "axios";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import React from "react";
export const RQSuperHeroesPage = () => {
  const [name, setName] = React.useState("");
  const [alterEgo, setAlterEgo] = React.useState("");
  const onSuccess = (data) => {
    console.log("onSuccess", data);
  };
  const onError = (error) => {
    console.log("onError", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
  const { mutate: addHero } = useAddSuperHeroData();
  // console.log("isFetching", isFetching, "isLoading", isLoading);

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) return <p>Loading........</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
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
