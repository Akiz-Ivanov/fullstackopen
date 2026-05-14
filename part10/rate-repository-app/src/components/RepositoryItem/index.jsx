import { View, StyleSheet, Pressable } from "react-native";
import RepositoryStat from "./RepositoryStat";
import RepositoryProfile from "./RepositoryProfile";
import Heading from "../Heading";
import * as Linking from 'expo-linking';
import theme from "../../theme";

const formatCount = (number) => {
  if (number < 1000) return String(number)
  const shortened = number / 1000
  return `${shortened.toFixed(1)}k`
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  pressable: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 12,
  }
})

const RepositoryItem = ({ item, withButton = false }) => {
  return (
    <View style={styles.container} testID="repositoryItem">

      <RepositoryProfile
        ownerAvatarUrl={item.ownerAvatarUrl}
        fullName={item.fullName}
        description={item.description}
        language={item.language}
      />

      <View style={styles.statsContainer}>
        <RepositoryStat label="Stars" value={formatCount(item.stargazersCount)} />
        <RepositoryStat label="Forks" value={formatCount(item.forksCount)} />
        <RepositoryStat label="Reviews" value={item.reviewCount} />
        <RepositoryStat label="Rating" value={item.ratingAverage} />
      </View>

      {withButton && (
        <Pressable onPress={() => Linking.openURL(item.url)} style={styles.pressable}>
          <Heading color="textWhite">Open in GitHub</Heading>
        </Pressable>
      )}

    </View>
  )
}

export default RepositoryItem