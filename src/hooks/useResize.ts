import { useState, useEffect } from "react";

export const useResize = (resized) => {

  useEffect(() => {
    //MOUNT__________________________________
    const handleResize = (e) =>
      

    window.addEventListener("resize", handleResize);

    //UNMOUNT________________________________
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};