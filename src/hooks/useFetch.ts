import { useState, useEffect } from "react";
import { parseAPIError } from "../utils/functions";

type FetchFunction<Data, Arg> = (arg: Arg) => Promise<Data>;

type FetchResult<T> =
  | { data: T; err: null; loading: boolean }
  | { data: null; err: Error; loading: boolean };

function useFetch<Data, Arg>(
  fetchFunction: FetchFunction<Data, Arg>,
  initialArg: Arg
): FetchResult<Data> {
  const [fetchResultData, setFetchResultData] = useState<FetchResult<Data>>({
    loading: true,
    data: null,
    err: new Error(""),
  });

  useEffect(() => {
    setFetchResultData(prev => ({ ...prev, loading: true }));
    (async function () {
      try {
        console.log("fetching");
        const result = await fetchFunction(initialArg);
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
    })();
  }, []);

  return fetchResultData;
}

export default useFetch;
