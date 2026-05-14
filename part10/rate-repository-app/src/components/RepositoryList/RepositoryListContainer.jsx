
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import { useNavigate } from 'react-router-native';

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e5e8',
  },
});

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  let navigate = useNavigate();

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );

};

export default RepositoryListContainer;