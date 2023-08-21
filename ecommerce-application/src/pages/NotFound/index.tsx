import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-[80vh] p-4">
      <h2 className="text-primary-color text-4xl font-bold font-primary">
        Not found
      </h2>
      <h4 className="text-primary-color text-2xl font-semibold font-primary">
        Oops! You are lost.
      </h4>
      <div className="p-4">
        <img
          src="./images/not-found.png"
          alt="bottle in the water"
        />
      </div>
      <Link
        to="/"
        className="border border-solid border-primary-color block text-primary-color rounded-md px-10 py-4 transition duration-300 font-primary font-bold hover:text-secondary-color hover:bg-primary-color"
      >
        Go home
      </Link>
    </div>
  );
};
