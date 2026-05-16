import useRepository from "../../hooks/useRepository";
import SingleRepositoryContainer from "./SingleRepositoryContainer";

const SingleRepository = ({ id }) => {
  const { repository, loading, fetchMore } = useRepository({ id, first: 10 });

  if (loading || !repository) {
    return null;
  }

  return <SingleRepositoryContainer repository={repository} onEndReached={fetchMore} />;
}

export default SingleRepository