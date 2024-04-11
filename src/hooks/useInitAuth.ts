import { useEffect, useState } from "react";
import { privAPIClient } from "../lib/axios";
import { useAuthStore } from "../stores/auth";
import { User } from "../models";
import { APIResp } from "../api/types";

function useInitAuth() {
  const [loading, setLoading] = useState(true);
  const { signin, signout } = useAuthStore();

  async function getUser() {
    try {
      const response = await privAPIClient.get<APIResp<User>>("/auth/me");
      signin(response.data.data);
    } catch (error) {
      signout();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return { loading };
}

export default useInitAuth;
