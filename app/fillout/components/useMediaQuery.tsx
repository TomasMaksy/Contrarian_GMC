import { useState, useEffect } from "react";

// Custom hook to handle media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener for media query change
    mediaQueryList.addEventListener("change", handleChange);

    // Set initial state
    setMatches(mediaQueryList.matches);

    // Cleanup the listener on unmount
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery; 