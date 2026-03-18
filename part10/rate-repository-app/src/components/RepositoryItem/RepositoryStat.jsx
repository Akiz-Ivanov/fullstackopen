import { View, StyleSheet } from "react-native";
import Text from "../Text";
import Heading from "../Heading";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    gap: 4,
  },
})

const RepositoryStat = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Heading>{value}</Heading>
      <Text fontSize="heading" color="textSecondary">{label}</Text>
    </View>
  )
}

export default RepositoryStat