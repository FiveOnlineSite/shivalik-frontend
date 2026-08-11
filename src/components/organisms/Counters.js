import React, { useEffect, useRef } from "react";
import homestyles from "../../style/Home.module.css";
import Odometer from "odometer";
import "odometer/themes/odometer-theme-default.css";

const Counters = ({ counters = [] }) => {
  const elementRefs = useRef({});
  const odometerInstances = useRef({});
  const observerRef = useRef(null);

  const extractNumber = (text = "") => {
    const match = String(text).match(/[\d,]+(?:\.\d+)?/);

    return match
      ? Number(match[0].replace(/,/g, ""))
      : null;
  };

  const extractText = (text = "") => {
    return String(text)
      .replace(/[\d,]+(?:\.\d+)?/, "")
      .trim();
  };

  useEffect(() => {
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const counterId = entry.target.dataset.counterId;
          const counter = counters.find(
            (item) => String(item._id) === counterId
          );

          if (!counter) return;

          const targetValue = extractNumber(counter.number);

          if (targetValue === null) return;

          let odometer = odometerInstances.current[counterId];

          if (!odometer) {
            odometer = new Odometer({
              el: entry.target,
              value: 0,
              duration: 1800,
              format: "(,ddd)",
              theme: "default",
            });

            odometerInstances.current[counterId] = odometer;
          }

          requestAnimationFrame(() => {
            odometer.update(targetValue);
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observerRef.current = observer;

    counters.forEach((counter) => {
      const element = elementRefs.current[counter._id];

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [counters]);

  useEffect(() => {
    const validIds = new Set(
      counters.map((counter) => String(counter._id))
    );

    Object.keys(odometerInstances.current).forEach((id) => {
      if (!validIds.has(id)) {
        delete odometerInstances.current[id];
        delete elementRefs.current[id];
      }
    });
  }, [counters]);

  return (
    <section className="pt-3 pb-5">
      <div className="container">
        <div className="row">
          {counters.map((counter) => {
            const numberValue = extractNumber(counter.number);
            const suffixText = extractText(counter.number);

            return (
              <div
                className="col-lg-3 col-6 text-center"
                key={counter._id}
              >
                <div className={homestyles.counterBox}>
                  <h2>
                    <span
                      ref={(element) => {
                        if (element) {
                          elementRefs.current[counter._id] = element;
                        }
                      }}
                      data-counter-id={String(counter._id)}
                      className="odometer"
                    >
                      {numberValue ?? 0}
                    </span>

                    {suffixText && (
                      <span className={homestyles.counterSuffix}>
                        {" "}
                        {suffixText}
                      </span>
                    )}
                  </h2>

                  <div className="counter-text">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: counter.title,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counters;