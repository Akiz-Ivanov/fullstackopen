import { View, Image, StyleSheet } from "react-native";
import Text from "../Text";
import Heading from "../Heading";
import theme from '../../theme';

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  profileTextContainer: {
    flexDirection: 'column',
    gap: 6,
    flexShrink: 1,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 4,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    alignSelf: 'flex-start',
    padding: 6,
  },
});

const RepositoryProfile = ({ ownerAvatarUrl, fullName, description, language }) => {
  return (
    <View style={styles.profileContainer}>
      <Image
        style={styles.logo}
        source={{
          uri: ownerAvatarUrl,
        }}
      />

      <View style={styles.profileTextContainer}>
        <Heading>{fullName}</Heading>
        <Text fontSize="subheading" color="textSecondary">{description}</Text>
        <View style={styles.language} >
          <Text color="textWhite" fontSize="subheading">{language}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryProfile