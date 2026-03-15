import Text from './Text';

const Subheading = ({ color, style, ...props }) => {
  return (
    <Text fontWeight="bold" fontSize="subheading" color={color} style={style} {...props} />
  );
};

export default Subheading;