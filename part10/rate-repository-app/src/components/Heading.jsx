import Text from './Text';

const Heading = ({ color, style, ...props }) => {
  return (
    <Text fontWeight="bold" fontSize="heading" color={color} style={style} {...props} />
  );
}

export default Heading