import { Pressable } from 'react-native';
import Heading from './Heading';

const AppBarTab = ({ title }) => {
  return (
    <Pressable>
      <Heading color="textWhite">{title}</Heading>
    </Pressable>
  )
}

export default AppBarTab