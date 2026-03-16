import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import Heading from './Heading';
import * as yup from 'yup';
import Text from './Text';


const styles = StyleSheet.create({
  container: {
    padding: 14,
    gap: 14,
  },
  textInput: {
    fontSize: theme.fontSizes.heading,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    padding: 12,
    borderRadius: 3,
  },
  pressable: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderRadius: 3,
    padding: 12,
  },
  isError: {
    borderColor: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.textInput,
          formik.touched.username && formik.errors.username && styles.isError
        ]}
        placeholderTextColor={theme.colors.textPlaceholder}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        style={[
          styles.textInput,
          formik.touched.password && formik.errors.password && styles.isError
        ]}
        placeholderTextColor={theme.colors.textPlaceholder}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error">{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
        <Heading color="textWhite">Sign In</Heading>
      </Pressable>
    </View>
  )
};

export default SignIn;