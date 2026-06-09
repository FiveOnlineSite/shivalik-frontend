import React from "react";

const OfficeLocation = ({ contactContent = null }) => {
  const isReactSnap =
    typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";

  if (isReactSnap) return null;

  if (!contactContent?.map_link) return null;

  return (
    <div>
      <iframe
        className="map"
        src={contactContent.map_link}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location Map"
      />
    </div>
  );
};

export default OfficeLocation;