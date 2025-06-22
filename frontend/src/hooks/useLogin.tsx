import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { BASE_URL } from "../components/BaseURL";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BASE_URL}/api/user/login`,
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

  return { login, isLoading, error };
};