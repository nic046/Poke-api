import { useState } from "react";
import axios from "axios";

function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dataFetch = async (url) => {
    setLoading(true);
    setError(null);
    await axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.message || "An error ocurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [data, dataFetch, loading, error];
}

export { useFetch };
