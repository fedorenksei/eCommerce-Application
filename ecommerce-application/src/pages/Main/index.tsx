import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Link } from 'react-router-dom';
import { getButtonStyles } from '../../shared/ui/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { DiscountCode } from './ui/DiscountCode';

type Props = {
  routeName: string;
  linkText: string;
};

const RouteLink = ({ routeName, linkText }: Props) => {
  return (
    <Link to={`/${routeName}`}>
      <button
        type="button"
        className={getButtonStyles({
          size: 'medium',
          filling: 'filled',
          shape: 'round',
        })}
      >
        {linkText}
      </button>
    </Link>
  );
};

const links = [
  {
    routeName: 'login',
    linkText: 'Log in',
  },
  {
    routeName: 'registration',
    linkText: 'Registration',
  },
  {
    routeName: 'catalog',
    linkText: 'Catalog',
  },
  {
    routeName: 'profile',
    linkText: 'Profile',
  },
  {
    routeName: 'basket',
    linkText: 'Basket',
  },
  {
    routeName: 'about-us',
    linkText: 'About us',
  },
];

export const Main = () => {
  const discountCodes = useSelector(
    (state: RootState) => state.discountCodes.discountCodes,
  );

  return (
    <div className="text-center text-4xl p-10">
      <Header2>Main page</Header2>
      <div className="flex flex-wrap justify-evenly p-5">
        {discountCodes.map((data) => (
          <DiscountCode
            key={data.name}
            {...data}
          />
        ))}
      </div>
      <div className="p-10 flex flex-wrap gap-5 justify-center">
        {links.map(({ routeName, linkText }) => (
          <RouteLink
            routeName={routeName}
            linkText={linkText}
            key={linkText}
          />
        ))}
      </div>
    </div>
  );
};
