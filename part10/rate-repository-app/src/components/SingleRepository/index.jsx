import useRepository from "../../hooks/useRepository";
import SingleRepositoryContainer from "./SingleRepositoryContainer";

const SingleRepository = ({ id }) => {
  const { repository, loading, fetchMore } = useRepository({ id, first: 2 });

  if (loading || !repository) {
    return null;
  }

  return <SingleRepositoryContainer repository={repository} onEndReach={fetchMore} />;
}

export default SingleRepository