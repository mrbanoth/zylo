import React from "react";

export function ZyloMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 6.5C9 5.67 9.67 5 10.5 5H22.2C23.4 5 24.08 6.38 23.34 7.33L17.4 15H10.5C9.67 15 9 14.33 9 13.5V6.5Z"
        fill="#111214"
      />
      <path
        d="M8.66 24.67C7.92 25.62 8.6 27 9.8 27H21.5C22.33 27 23 26.33 23 25.5V18.5C23 17.67 22.33 17 21.5 17H14.6L8.66 24.67Z"
        fill="#111214"
      />
      <path
        d="M11 13.5L21 18.5L19 20.5L9 15.5L11 13.5Z"
        fill="#111214"
      />
    </svg>
  );
}
