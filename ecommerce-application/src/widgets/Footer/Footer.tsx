import React from 'react';
import { RssLogo } from '../../pages/AboutUs/ui/RssLogo';
import { getTextStyles } from '../../shared/ui/styles';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import { useToggle } from '../../shared/utils/hooks';

export const Footer = () => {
  const [isDarkTheme, toggleIsDarkTheme] = useToggle(false);
  const switchTheme = () => {
    toggleIsDarkTheme();
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="p-3 flex items-center flex-wrap justify-evenly">
      <div className="w-16">
        <RssLogo />
      </div>
      <span className={getTextStyles({})}>Aug-Sep 2023</span>
      <button
        onClick={switchTheme}
        className={getTextStyles({ link: true, font: 'h3' })}
      >
        {isDarkTheme ? (
          <BsSun title="Switch to light theme" />
        ) : (
          <BsMoonStars title="Switch to dark theme" />
        )}
      </button>
    </div>
  );
};
