/* istanbul ignore file */
import React from 'react';

const LinkedIn = ({ fill = '#14689A', title = '', desc = '' }) => (
  <svg
    aria-labelledby="title"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="title" lang="en">{title}</title>
    <desc>{desc}</desc>
    <path
      d="M7.164 20.602H3.307V8.182h3.857v12.42zM5.234 6.49C4 6.489 3 5.467 3 4.234a2.233 2.233 0 014.467 0c0 1.233-1 2.255-2.234 2.255zm16.364 14.113H17.75v-6.046c0-1.44-.03-3.288-2.006-3.288-2.005 0-2.312 1.565-2.312 3.185v6.15H9.58V8.182h3.698v1.694h.054c.515-.976 1.773-2.006 3.65-2.006 3.903 0 4.62 2.57 4.62 5.909v6.822h-.004z"
      fill={fill}
      fillRule="nonzero"
    />
  </svg>
);

export default LinkedIn;