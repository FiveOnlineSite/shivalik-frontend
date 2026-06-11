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

export const ChevronLeft = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
  </SvgIcon>
);

export const ChevronRight = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </SvgIcon>
);

export const ChevronUp = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="m7.41 15.41-1.41-1.41 6-6 6 6-1.41 1.41L12 10.83l-4.59 4.58z" />
  </SvgIcon>
);

export const ChevronDown = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M16.59 8.59 18 10l-6 6-6-6 1.41-1.41L12 13.17l4.59-4.58z" />
  </SvgIcon>
);

export const CloseIcon = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.29l6.3 6.3 6.29-6.3 1.42 1.42z" />
  </SvgIcon>
);


export const MessageSquareIcon = (props) => (
  <SvgIcon {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
  </SvgIcon>
);

export const PhoneIcon = (props) => (
  <SvgIcon {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </SvgIcon>
);

export const YouTubeIcon = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
  </SvgIcon>
);

export default SvgIcon;
