import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import Heading from './Heading';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 14,
    paddingHorizontal: 14,
    backgroundColor: theme.backgroundColors.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 20,
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(ME);

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer} >
        <AppBarTab title="Repositories" to="/" />
        {data?.me ? (
          <Pressable onPress={handleSignOut}>
            <Heading color="textWhite">Sign out</Heading>
          </Pressable>
        ) : (
          <AppBarTab title="Sign in" to="/sign-in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;