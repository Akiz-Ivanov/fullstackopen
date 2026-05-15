
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import { useNavigate } from 'react-router-native';
import RepositoryListHeader from './RepositoryListHeader';
import { useMemo } from 'react';

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e5e8',
  },
});

const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  let navigate = useNavigate();

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
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );

};

export default RepositoryListContainer;