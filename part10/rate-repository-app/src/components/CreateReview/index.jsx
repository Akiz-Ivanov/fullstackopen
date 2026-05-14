import { useNavigate } from "react-router-native";

import useCreateReview from "../../hooks/useCreateReview";
import CreateReviewContainer from "./CreateReviewContainer";

const CreateReview = () => {
  const navigate = useNavigate();

  const [createReview] = useCreateReview();

  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });

      navigate(`/${data.createReview.repositoryId}`);

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  );
};

export default CreateReview;