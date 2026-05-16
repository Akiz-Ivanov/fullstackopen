import { View, StyleSheet, Pressable } from "react-native";
import { format } from "date-fns";

import Heading from "../Heading";
import Text from "../Text";

import theme from "../../theme";

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    gap: 8,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    gap: 16,
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,

    borderWidth: 2,
    borderColor: theme.colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    gap: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  pressable: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 12,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  }
});

const ReviewItem = ({
  review,
  type = "default",
  onViewRepository,
  onDeleteReview,
}) => {
  return (
    <View style={styles.wrapper}>

      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Heading color="primary">
            {review.rating}
          </Heading>
        </View>

        <View style={styles.contentContainer}>
          <Heading>
            {type === "myReviews"
              ? review.repository.fullName
              : review.user.username}
          </Heading>

          <Text color="textSecondary">
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>

          <Text>
            {review.text}
          </Text>

        </View>
      </View>

      {type === "myReviews" && (
        <View style={styles.actionsContainer}>
          <Pressable style={styles.pressable} onPress={() => onViewRepository(review.repository.id)}>
            <Heading color="textWhite">View Repository</Heading>
          </Pressable>
          <Pressable style={[styles.pressable, styles.deleteButton]} onPress={() => onDeleteReview(review.id)}>
            <Heading color="textWhite">Delete Review</Heading>
          </Pressable>
        </View>
      )}

    </View>
  );
};

export default ReviewItem;