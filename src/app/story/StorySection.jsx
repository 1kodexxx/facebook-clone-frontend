import { useEffect, useRef, useState } from "react";

const StorySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const containerRef = useRef();
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const updateMaxScoll = () => {
        setMaxScroll((container.scrollWidth = container.offsetWidth));
        setScrollPosition(container.scrollLeft);
      };
    }
  });
  return <div>StorySection</div>;
};

export default StorySection;
