import Heading from './Heading';
import { Link } from 'react-router-native';

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to}>
      <Heading color="textWhite">{title}</Heading>
    </Link>
  )
}

export default AppBarTab