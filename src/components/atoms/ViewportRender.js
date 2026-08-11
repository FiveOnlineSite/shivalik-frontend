import { startTransition, useEffect, useRef, useState } from 'react';

const ViewportRender = ({
  children,
  fallback = null,
  minHeight = 0,
  once = true,
  rootMargin = '300px 0px',
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible && once) return undefined;

    const target = elementRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        startTransition(() => {
          setIsVisible(true);
        });

        if (once) {
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isVisible, once, rootMargin]);

  return (
    <div ref={elementRef} style={minHeight ? { minHeight } : undefined}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default ViewportRender;
