import React from 'react';

export const Registration = () => {
  return (
    <div className="bg-slate-800 p-10 text-white">
      <form className="flex flex-col gap-10 items-center w-96 mx-auto">
        <label className="flex justify-between w-full gap-3">
          Email
          <input type="text" />
        </label>
        <label className="flex justify-between w-full gap-3">
          Password
          <input type="text" />
        </label>
        <label className="flex justify-between w-full gap-3">
          Password repeat
          <input type="text" />
        </label>
        <label className="flex justify-between w-full gap-3">
          First name
          <input type="text" />
        </label>
        <label className="flex justify-between w-full gap-3">
          Last name
          <input type="text" />
        </label>
        <label className="flex justify-between w-full gap-3">
          Date of birth
          <input type="date" />
        </label>
      </form>
    </div>
  );
};
