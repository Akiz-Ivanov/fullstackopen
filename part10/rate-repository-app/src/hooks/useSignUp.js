import { useMutation } from "@apollo/client";

import useSignIn from "./useSignIn";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    await signIn({ username, password });
  };

  return [signUp, result];
};

export default useSignUp;
