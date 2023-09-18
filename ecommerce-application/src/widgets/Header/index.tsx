import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ServerAPI } from '../../shared/api/ServerAPI';
import { CustomerData } from '../../shared/types/interfaces';
import {
  BsCart3,
  BsPerson,
  BsPersonAdd,
  BsBoxArrowRight,
  BsBoxArrowInRight,
} from 'react-icons/bs';
import { NavListItem } from './ui/NavListItem';
import { getTextStyles } from '../../shared/ui/styles';
import clsx from 'clsx';

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const customerData = useSelector((state: RootState) => state.customerData);
  const serverAPI = ServerAPI.getInstance();
  const [burgerShown, setBurgerShown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <header className="fixed z-30 top-0 w-full flex justify-center items-center px-2 py-2 shadow-md bg-bg-color dark:bg-dt-bg-color">
      <div className="max-w-7xl w-full flex justify-between items-center">
        <Link
          to="/"
          onClick={() => setBurgerShown(false)}
        >
          <div className="flex items-center">
            <div className="flex w-14 justify-center items-center">
              <img
                className={clsx(
                  isScrolled ? 'w-7' : 'w-14',
                  'transition-all object-cover',
                )}
                src="./images/logo.png"
                alt="bike logo"
              />
            </div>
            {!isScrolled && (
              <div className="text-text-color text-2xl font-bold min-w-[8rem]">
                BI-KU-KLE
              </div>
            )}
          </div>
        </Link>

        <div
          className={`${
            !burgerShown
              ? 'hidden'
              : 'absolute flex flex-col top-full left-0 p-3'
          } shadow-md md:shadow-none bg-bg-color w-full z-10 md:flex md:static md:flex-row justify-end gap-10 items-center flex-auto`}
        >
          <ul className="flex items-center gap-4 flex-col md:flex-row">
            <NavListItem>
              <Link
                onClick={() => setBurgerShown((state) => !state)}
                to="/"
              >
                Main
              </Link>
            </NavListItem>
            <NavListItem>
              <Link
                onClick={() => setBurgerShown((state) => !state)}
                to="/catalog"
              >
                Catalog
              </Link>
            </NavListItem>
            <NavListItem>
              <Link
                onClick={() => setBurgerShown((state) => !state)}
                to="/about-us"
              >
                About us
              </Link>
            </NavListItem>
            <NavListItem>
              <Link
                onClick={() => setBurgerShown((state) => !state)}
                to="/basket"
              >
                <BsCart3
                  size="1.5em"
                  title="Shopping cart"
                />
              </Link>
            </NavListItem>
            {!auth.isAuth && (
              <>
                <NavListItem>
                  <Link
                    onClick={() => setBurgerShown((state) => !state)}
                    to="/login"
                  >
                    <BsBoxArrowInRight
                      size="1.5em"
                      title="Log in"
                    />
                  </Link>
                </NavListItem>
                <NavListItem>
                  <Link
                    onClick={() => setBurgerShown((state) => !state)}
                    to="/registration"
                  >
                    <BsPersonAdd
                      size="1.7em"
                      title="Sign up"
                    />
                  </Link>
                </NavListItem>
              </>
            )}
            {auth.isAuth && (
              <>
                <NavListItem>
                  <Link
                    onClick={() => setBurgerShown((state) => !state)}
                    to="/profile"
                    className="flex gap-1 items-center"
                  >
                    <BsPerson
                      size="1.7em"
                      title="Profile"
                    />
                    {customerData.customerData && (
                      <span className={getTextStyles({ color: 'primary' })}>
                        {(customerData.customerData as CustomerData).email}
                      </span>
                    )}
                  </Link>
                </NavListItem>
                <NavListItem>
                  <button
                    className="grid place-items-center"
                    onClick={() => serverAPI.logout()}
                  >
                    <BsBoxArrowRight
                      size="1.5em"
                      title="Log out"
                    />
                  </button>
                </NavListItem>
              </>
            )}
          </ul>
          <div
            onClick={() => setBurgerShown(false)}
            role="presentation"
            className={clsx(
              !burgerShown
                ? 'hidden'
                : 'absolute w-full h-screen top-full left-0 bg-hover-color/40 cursor-pointer',
              'md:hidden',
            )}
          ></div>
        </div>

        <button
          onClick={() => setBurgerShown((state) => !state)}
          className={`w-7 h-6 flex flex-col justify-between cursor-pointer md:hidden transition-all duration-300 ${
            burgerShown && 'rotate-90'
          }`}
        >
          <span className="w-full rounded-full h-[2px] bg-text-color dark:bg-dt-text-color"></span>
          <span className="w-full rounded-full h-[2px] bg-text-color dark:bg-dt-text-color"></span>
          <span className="w-full rounded-full h-[2px] bg-text-color dark:bg-dt-text-color"></span>
        </button>
      </div>
    </header>
  );
};
