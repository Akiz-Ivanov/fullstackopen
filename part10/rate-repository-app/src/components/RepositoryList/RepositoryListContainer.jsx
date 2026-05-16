
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';
import { useMemo } from 'react';

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e5e8',
  },
});

const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
  onRepositoryPress,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderHeader = useMemo(() => (
    <RepositoryListHeader
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  ), [searchKeyword, selectedOrder]);

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );

};

export default RepositoryListContainer;