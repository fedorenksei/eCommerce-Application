import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ServerAPI } from '../../shared/api/ServerAPI';
import { CustomerData } from '../../shared/types/interfaces';

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const customerData = useSelector((state: RootState) => state.customerData);
  const serverAPI = ServerAPI.getInstance();
  const [burgerShown, setBurgerShown] = useState(false);

  return (
    <>
      <header className="shadow-md z-10 bg-bg-color flex justify-between items-center px-2 h-20 relative">
        <Link to="/">
          <div className="flex items-center">
            <div className="flex w-14 justify-center items-center">
              <img
                className="w-14 object-cover"
                src="./images/logo.png"
                alt="bike logo"
              />
            </div>
            <div className="text-text-color text-2xl font-bold min-w-[8rem]">
              BI-KU-KLE
            </div>
          </div>
        </Link>
        <div
          className={`${
            !burgerShown ? 'hidden' : 'absolute flex flex-col top-20 left-0'
          } shadow-md md:shadow-none bg-bg-color w-full z-10 md:flex md:static md:flex-row justify-end gap-40 items-center flex-auto`}
        >
          <ul className="flex py-6 gap-4 flex-col md:flex-row">
            <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color hover:underline">
              <Link
                onClick={() => setBurgerShown((state) => !state)}
                to="/"
              >
                Main
              </Link>
            </li>
            {!auth.isAuth && (
              <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color hover:underline">
                <Link
                  onClick={() => setBurgerShown((state) => !state)}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {!auth.isAuth && (
              <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color hover:underline">
                <Link
                  onClick={() => setBurgerShown((state) => !state)}
                  to="/registration"
                >
                  Registration
                </Link>
              </li>
            )}
            {auth.isAuth && (
              <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color">
                <button onClick={() => serverAPI.logout()}>
                  <span className="hover:underline">Logout</span>
                </button>
              </li>
            )}
          </ul>
          {customerData.customerData && (
            <span className="text-center text-primary-color text-base font-bold">
              {(customerData.customerData as CustomerData).email}
            </span>
          )}
        </div>
        <button
          onClick={() => setBurgerShown((state) => !state)}
          className={`w-7 h-6 flex flex-col justify-between cursor-pointer md:hidden transition-all duration-300 ${
            burgerShown && 'rotate-90'
          }`}
        >
          <span className="w-full h-[2px] bg-text-color"></span>
          <span className="w-full h-[2px] bg-text-color"></span>
          <span className="w-full h-[2px] bg-text-color"></span>
        </button>
      </header>
    </>
  );
};
