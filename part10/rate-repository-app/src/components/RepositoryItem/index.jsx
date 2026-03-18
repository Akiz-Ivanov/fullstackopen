import { View, StyleSheet } from "react-native";
import RepositoryStat from "./RepositoryStat";
import RepositoryProfile from "./RepositoryProfile";

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
})

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>

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

    </View>
  )
}

export default RepositoryItem