// icon:bxs-edit | Boxicons https://boxicons.com/ | Atisa
import * as React from "react";

function Edit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      {props.children}
      <path d="M18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z" />
      <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 002-2v-8.668l-2 2V19z" />
    </svg>
  );
}

export default Edit;
