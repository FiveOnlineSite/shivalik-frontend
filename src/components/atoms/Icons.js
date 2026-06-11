import React from 'react';

const SvgIcon = ({ children, className = '', size = 24, title, ...props }) => (
  <svg
    aria-hidden={title ? undefined : true}
    className={className}
    focusable="false"
    height={size}
    role={title ? 'img' : undefined}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title && <title>{title}</title>}
    {children}
  </svg>
);

export const ArrowRightAlt = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" />
  </SvgIcon>
);

export default SvgIcon;
