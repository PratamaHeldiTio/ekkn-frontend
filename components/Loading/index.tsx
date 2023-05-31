import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white opacity-75 flex justify-center items-center z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-[3px] border-b-[3px] border-primary mb-4"></div>
            <h1 className="text-primary font-bold">Loading...</h1>
          </div>
        </div>
      )}
    </>
  );
};
