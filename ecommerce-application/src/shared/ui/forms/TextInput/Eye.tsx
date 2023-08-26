import React from 'react';
import clsx from 'clsx';

type EyeProps = {
  opened: boolean;
};

export const Eye = ({ opened }: EyeProps) => {
  return (
    <svg
      className={clsx(
        'w-6 cursor-pointer transition-all',
        'stroke-text-color dark:stroke-dt-text-color',
        'hover:stroke-hover-color dark:hover:stroke-hover-color',
        'hover:scale-125',
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
    >
      {opened ? (
        <>
          <g
            id="SVGRepo_bgCarrier"
            strokeWidth="0"
          ></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </>
      ) : (
        <g id="SVGRepo_iconCarrier">
          <path
            d="M2 2L22 22"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      )}
    </svg>
  );
};
