import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ServerAPI } from '../../shared/api/ServerAPI';
import {
  CartOutline,
  HomeOutline,
  LogInOutline,
  LogOutOutline,
  PersonAddOutline,
  PersonOutline,
  StorefrontOutline,
} from 'react-ionicons';
import { BikukleLogo } from './ui/BikukleLogo';
import { Ionicon } from '../../shared/types/icon';

interface NavItemData {
  link?: string;
  onClick?: () => void;
  title: string;
  icon: Ionicon;
  text?: string;
}

import { NavItem } from './ui/NavItem';

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const serverAPI = ServerAPI.getInstance();
  const [burgerShown, setBurgerShown] = useState(false);

  const commonNavItems: NavItemData[] = [
    {
      link: '/',
      title: 'Main page',
      icon: HomeOutline,
      text: 'Main',
    },
    {
      link: '/catalog',
      title: 'Catalog',
      icon: StorefrontOutline,
      text: 'Catalog',
    },
    {
      link: '/basket',
      title: 'Cart',
      icon: CartOutline,
    },
  ];

  const anonymousNavItems: NavItemData[] = [
    {
      link: '/login',
      title: 'Log In',
      icon: LogInOutline,
    },
    {
      link: '/registration',
      title: 'Sign up',
      icon: PersonAddOutline,
    },
  ];

  const authorizedNavItems: NavItemData[] = [
    {
      link: '/profile',
      title: 'Profile',
      icon: PersonOutline,
    },
    {
      onClick: () => serverAPI.logout(),
      title: 'Log out',
      icon: LogOutOutline,
    },
  ];

  return (
    <>
      <header className="shadow-md z-10 bg-bg-color flex justify-between items-center px-2 h-20 relative">
        <BikukleLogo />
        <div
          className={`${
            !burgerShown ? 'hidden' : 'absolute flex flex-col top-20 left-0'
          } shadow-md md:shadow-none bg-bg-color w-full z-10 md:flex md:static md:flex-row justify-end gap-10 items-center flex-auto`}
        >
          <ul className="flex py-6 gap-4 flex-col md:flex-row">
            {commonNavItems
              .concat(auth.isAuth ? authorizedNavItems : anonymousNavItems)
              .map((item) => (
                <NavItem
                  burgerAction={() => setBurgerShown((state) => !state)}
                  key={item.title}
                  {...item}
                />
              ))}
          </ul>
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
