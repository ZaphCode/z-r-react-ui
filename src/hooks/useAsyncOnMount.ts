import { useEffect } from "react";

export const useAsyncOnMount = (onMountFn: () => Promise<void>) => {
  useEffect(() => {
    (async () => {
        await onMountFn();
    })();
  }, []);
};
