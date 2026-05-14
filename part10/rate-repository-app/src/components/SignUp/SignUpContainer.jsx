import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Heading from '../Heading';
import Text from '../Text';
import theme from '../../theme';
import * as yup from 'yup';

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
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be at most 30 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUpContainer = ({ onSubmit }) => {

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
      <TextInput
        placeholder="Password confirmation"
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        secureTextEntry
        style={[
          styles.textInput,
          formik.touched.confirmPassword && formik.errors.confirmPassword && styles.isError
        ]}
        placeholderTextColor={theme.colors.textPlaceholder}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text color="error">{formik.errors.confirmPassword}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.pressable}>
        <Heading color="textWhite">Sign Up</Heading>
      </Pressable>
    </View>
  );
}

export default SignUpContainer