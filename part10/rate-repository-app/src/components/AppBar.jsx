import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.primary,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title="Repositories" />
    </View>
  );
};

export default AppBar;