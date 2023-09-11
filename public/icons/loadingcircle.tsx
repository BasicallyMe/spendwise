import React from "react";

function LoadingCircle() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        strokeWidth="4"
        stroke="darkgreen"
        strokeLinecap="round"
      />
      <g transform="rotate(0 20 20)">
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          strokeWidth="4"
          stroke="white"
          strokeLinecap="round"
          strokeDasharray="60, 60" // Maintain the progress effect
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export default LoadingCircle;
