import { useRef, useEffect } from "react";

const UseObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    var callbackFunc = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(callbackFunc);
    observer.current.observe(ref.current);
  }, [isLoading]);
};

export default UseObserver;
