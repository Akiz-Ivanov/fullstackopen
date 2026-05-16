import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, error, loading, refetch, fetchMore } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: "cache-and-network",
    },
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (error) {
    console.log(error);
  }

  const repositories = data?.repositories;

  return {
    repositories,
    loading,
    refetch,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
