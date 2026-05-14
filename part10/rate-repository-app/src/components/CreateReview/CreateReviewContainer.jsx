import { useFormik } from 'formik';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
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
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup
    .string()
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const CreateReviewContainer = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={[
          styles.textInput,
          formik.touched.ownerName && formik.errors.ownerName && styles.isError
        ]}
        placeholderTextColor={theme.colors.textPlaceholder}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color="error">{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={[
          styles.textInput,
          formik.touched.repositoryName && formik.errors.repositoryName && styles.isError
        ]}
        placeholderTextColor={theme.colors.textPlaceholder}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color="error">{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[
          styles.textInput,
          formik.touched.rating && formik.errors.rating && styles.isError
        ]}
        placeholderTextColor={theme.colors.textPlaceholder}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color="error">{formik.errors.rating}</Text>
      )}

      <TextInput
        multiline
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={[
          styles.textInput,
          formik.touched.text && formik.errors.text && styles.isError
        ]}
        placeholderTextColor={theme.colors.textPlaceholder}
      />

      <Pressable
        onPress={formik.handleSubmit}
        style={styles.pressable}
      >
        <Heading color="textWhite">
          Create a review
        </Heading>
      </Pressable>
    </View>
  )
}

export default CreateReviewContainer