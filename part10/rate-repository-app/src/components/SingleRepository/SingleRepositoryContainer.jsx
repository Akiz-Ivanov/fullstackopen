import { FlatList, StyleSheet, View } from "react-native";

import RepositoryItem from "../RepositoryItem";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e5e8',
  },
});

const SingleRepositoryContainer = ({ repository }) => {
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem
            item={repository}
            withButton
          />

          <ItemSeparator />
        </>
      )}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
    />
  );
};

export default SingleRepositoryContainer;