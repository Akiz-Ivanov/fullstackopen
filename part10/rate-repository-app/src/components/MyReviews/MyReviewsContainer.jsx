import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "../SingleRepository/ReviewItem";

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e5e8',
  },
});

const MyReviewsContainer = ({
  reviews,
  onViewRepository,
  onDeleteReview
}) => {
  return (
    <View>
      <FlatList
        style={styles.container}
        data={reviews}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            type="myReviews"
            onViewRepository={onViewRepository}
            onDeleteReview={onDeleteReview}
          />
        )}
      />
    </View>
  );
}

export default MyReviewsContainer