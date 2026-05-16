import { useQuery } from "@apollo/client";
import { GET_ONE_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, loading, error, fetchMore } = useQuery(GET_ONE_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (error) {
    console.log(error);
  }

  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
