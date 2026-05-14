import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Heading from "../Heading";
import Text from "../Text";

import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Heading color="primary">
          {review.rating}
        </Heading>
      </View>

      <View style={styles.contentContainer}>
        <Heading>
          {review.user.username}
        </Heading>

        <Text color="textSecondary">
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>

        <Text>
          {review.text}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;