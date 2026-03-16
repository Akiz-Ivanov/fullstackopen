import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer} >
        <AppBarTab title="Repositories" to="/" />
        <AppBarTab title="Sign in" to="/sign-in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;