import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.log(error);
  }

  const repositories = data?.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;
