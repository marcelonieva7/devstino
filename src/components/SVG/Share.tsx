// icon:share | Entypo http://entypo.com/ | Daniel Bruce
import * as React from "react";

function IconShare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 800 1000"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      {props.children}
      <path d="M650 650c41.333 0 76.667 14.333 106 43s44 64.333 44 107c0 41.333-14.667 76.667-44 106s-64.667 44-106 44-76.667-14.667-106-44-44-64.667-44-106c0-4 .333-8.667 1-14s1-9.333 1-12L242 618c-28 21.333-58.667 32-92 32-41.333 0-76.667-14.667-106-44S0 541.333 0 500s14.667-76.667 44-106 64.667-44 106-44c36 0 66.667 10 92 30l260-156c0-2.667-.333-6.667-1-12s-1-9.333-1-12c0-41.333 14.667-76.667 44-106s64.667-44 106-44 76.667 14.333 106 43 44 64.333 44 107c0 41.333-14.667 76.667-44 106s-64.667 44-106 44c-34.667 0-64.667-10.667-90-32L298 474c1.333 5.333 2 14 2 26 0 10.667-.667 18.667-2 24l262 156c24-20 54-30 90-30" />
    </svg>
  );
}

export default IconShare;
