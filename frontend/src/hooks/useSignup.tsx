import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        { email, password }
      );

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error) && error.response) {
        setError((error.response.data as { error: string }).error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return { signup, isLoading, error };
};