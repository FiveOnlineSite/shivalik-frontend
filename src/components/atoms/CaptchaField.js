import React, { useEffect, useRef, useState } from "react";

const CaptchaField = ({ onTokenChange, resetKey = 0 }) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let retryTimer;
    let attempts = 0;

    if (!siteKey || !containerRef.current) {
      return undefined;
    }

    const renderCaptcha = () => {
      if (cancelled || widgetIdRef.current !== null) {
        return;
      }

      if (!window.grecaptcha?.render) {
        attempts += 1;
        if (attempts >= 50) {
          setLoadError("Captcha could not be loaded. Check your internet connection or browser blocker.");
          return;
        }
        retryTimer = window.setTimeout(renderCaptcha, 100);
        return;
      }

      try {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: onTokenChange,
          "expired-callback": () => onTokenChange(""),
          "error-callback": () => {
            onTokenChange("");
            setLoadError("Captcha verification failed. Please try again.");
          },
        });
      } catch (error) {
        console.error("Failed to render reCAPTCHA:", error);
        setLoadError("Captcha could not be rendered. Use a reCAPTCHA v2 Checkbox key registered for this domain.");
      }
    };

    renderCaptcha();

    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
    };
  }, [onTokenChange, siteKey]);

  useEffect(() => {
    if (widgetIdRef.current === null || !window.grecaptcha?.reset) {
      return;
    }

    window.grecaptcha.reset(widgetIdRef.current);
    onTokenChange("");
  }, [onTokenChange, resetKey]);

  if (!siteKey) {
    return (
      <small className="text-danger d-block mt-2">
        CAPTCHA is unavailable. Set `REACT_APP_RECAPTCHA_SITE_KEY` to enable submissions.
      </small>
    );
  }

  return (
    <div className="mb-3" style={{ minHeight: "78px" }}>
      <div ref={containerRef}></div>
      {loadError && <small className="text-danger d-block mt-2">{loadError}</small>}
    </div>
  );
};

export default CaptchaField;
