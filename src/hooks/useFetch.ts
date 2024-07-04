import { useState, useEffect, useCallback } from "react";
import { parseAPIError } from "../utils/functions";

type FetchFunction<Data, Arg> = (arg: Arg) => Promise<Data>;

type FetchResult<T> = {
  data: T | null;
  err: Error | null;
  loading: boolean;
  refetch: () => void;
};

function useFetch<Data, Arg>(
  fetchFunction: FetchFunction<Data, Arg>,
  initialArg: Arg
): FetchResult<Data> {

  const [fetchResultData, setFetchResultData] = useState<Omit<FetchResult<Data>, 'refetch'>>({
    loading: true,
    data: null,
    err: new Error(""),
  });

  const fetchData = useCallback(async (arg: Arg) => {
    setFetchResultData(prev => ({ ...prev, loading: true }));
    try {
      console.log("fetching");
      const result = await fetchFunction(arg);
      setFetchResultData(prev => ({ ...prev, data: result, err: null }));
    } catch (error) {
      console.log(error);
      setFetchResultData(prev => ({
        ...prev,
        data: null,
        err: parseAPIError(error),
      }));
    } finally {
      setFetchResultData(prev => ({ ...prev, loading: false }));
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData(initialArg);
  }, []);

  const refetch = () => {
    fetchData(initialArg);
  };

  return { ...fetchResultData, refetch };
}

export default useFetch;