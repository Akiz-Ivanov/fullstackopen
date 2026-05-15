import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    fontSize: 14,
  },
});

const RepositoryOrderPicker = ({
  selectedOrder,
  setSelectedOrder,
}) => {
  return (
    <Picker
      style={styles.container}
      selectedValue={selectedOrder}
      onValueChange={(value) => setSelectedOrder(value)}
    >
      <Picker.Item
        label="Latest repositories"
        value="latest"
      />

      <Picker.Item
        label="Highest rated repositories"
        value="highest"
      />

      <Picker.Item
        label="Lowest rated repositories"
        value="lowest"
      />
    </Picker>
  );
};

export default RepositoryOrderPicker;