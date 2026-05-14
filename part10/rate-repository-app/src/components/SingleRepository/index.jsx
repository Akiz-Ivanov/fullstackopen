import useRepository from "../../hooks/useRepository";
import SingleRepositoryContainer from "./SingleRepositoryContainer";

const SingleRepository = ({ id }) => {
  const { repository, loading } = useRepository(id);

  if (loading || !repository) {
    return null;
  }

  return <SingleRepositoryContainer repository={repository} />;
}

export default SingleRepository