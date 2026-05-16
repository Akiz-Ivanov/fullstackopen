import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (variables) => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.log(error);
  }

  return {
    user: data?.me,
    loading,
    refetch,
  };
};

export default useCurrentUser;
