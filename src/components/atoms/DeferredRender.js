import { startTransition, useEffect, useState } from 'react';

const DeferredRender = ({ children, timeout = 1200, fallback = null }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;
    let idleId;

    const reveal = () => {
      startTransition(() => {
        setShouldRender(true);
      });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(reveal, { timeout });
    } else {
      timeoutId = window.setTimeout(reveal, timeout);
    }

    return () => {
      if (idleId) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeout]);

  return shouldRender ? children : fallback;
};

export default DeferredRender;
