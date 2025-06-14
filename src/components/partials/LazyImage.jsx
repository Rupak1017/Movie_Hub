import React, { useRef, useState, useEffect } from "react";

export default function LazyImage({ src, alt, ...props }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={visible ? src : undefined}
      data-src={src}
      alt={alt}
      {...props}
    />
  );
}
