import SignUpContainer from "./SignUpContainer";
import { useNavigate } from "react-router-native";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {

  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;