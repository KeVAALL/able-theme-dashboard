import { useState, useCallback } from "react";
import axios from "axios";
const BASE_URL ="https://altcaseadmin.we3.in/api/v1"

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (endPoint, data, token = null) => {
    setLoading(true);
    setError(null);

    try {
      const url = BASE_URL + endPoint;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(url, data, { headers });

      console.log("checking", response);
      setLoading(false);
      return response;
    } catch (error) {
      console.log("--------", error);
      setLoading(false);
      setError(error);
      throw error; // Rethrow the error so it can be caught by the calling function
    }
  }, []);

  return { postData, loading, error };
};