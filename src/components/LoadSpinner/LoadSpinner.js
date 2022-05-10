import React from 'react';

const LoadSpinner = ({
  color = '#ffffff',
  className,
  height = 50,
  width = 50,
  strokeWidth = 10,
  style,
}) => (
  <svg
    style={{
      display: 'block',
      shapeRendering: 'auto',
      width: `${width}` || '30px',
      height: `${height}` || '30px',
      ...style,
    }}
    className={className}
    viewBox="0 0 100 100"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke={color}
      strokeWidth={`${strokeWidth || '10'}`}
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
);

export default LoadSpinner;
