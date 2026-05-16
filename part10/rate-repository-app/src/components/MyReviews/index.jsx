import { Alert } from "react-native";
import { useNavigate } from "react-router-native";

import useCurrentUser from "../../hooks/useCurrentUser";
import useDeleteReview from "../../hooks/useDeleteReview";

import MyReviewsContainer from "./MyReviewsContainer";

const MyReviews = () => {
  const navigate = useNavigate();

  const { user, loading, refetch } = useCurrentUser({
    includeReviews: true,
  });

  const [deleteReview] = useDeleteReview();

  if (loading || !user) {
    return null;
  }

  const reviews = user.reviews.edges.map(edge => edge.node);

  const handleViewRepository = (id) => {
    navigate(`/${id}`);
  };

  const handleDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteReview(id);
            refetch();
          },
        },
      ]
    );
  };

  return (
    <MyReviewsContainer
      reviews={reviews}
      onViewRepository={handleViewRepository}
      onDeleteReview={handleDeleteReview}
    />
  );
};

export default MyReviews;