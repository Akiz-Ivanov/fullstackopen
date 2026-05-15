import { StyleSheet, TextInput, View } from "react-native";
import RepositoryOrderPicker from "./RepositoryOrderPicker";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e5e8',
    padding: 16,
    fontSize: 16,
    gap: 16,
  },
  textInput: {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
});

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  selectedOrder,
  setSelectedOrder,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        placeholder="Search repositories"
      />

      <RepositoryOrderPicker
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </View>
  );
};

export default RepositoryListHeader;