import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import RepositoryList from './RepositoryList';

import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const SingleRepositoryRoute = () => {
  const { id } = useParams();

  return <SingleRepository id={id} />;
};

const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/:id" element={<SingleRepositoryRoute />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;