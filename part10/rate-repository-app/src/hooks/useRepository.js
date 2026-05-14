import { useQuery } from "@apollo/client";
import { GET_ONE_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_ONE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.log(error);
  }

  return {
    repository: data?.repository,
    loading,
  };
};

export default useRepository;
