import { Link } from 'react-router-dom';
import { Ionicon } from '../../../shared/types/icon';
import { useState } from 'react';

type NavItemProps = {
  link?: string;
  onClick?: () => void;
  title: string;
  icon: Ionicon;
  text?: string;
  burgerAction: () => void;
};

export const NavItem = (item: NavItemProps) => {
  const [isHover, setIsHover] = useState(false);
  const icon = (
    <item.icon
      title={item.title}
      color={isHover ? 'blue' : 'black'}
      className="icon"
    />
  );

  return (
    <li
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="text-center text-text-color dark:text-dt-text-color text-md font-bold hover:text-primary-color hover:underline"
    >
      {item.link ? (
        <Link
          onClick={item.burgerAction}
          to={item.link}
        >
          {icon}
        </Link>
      ) : (
        <button
          onClick={() => {
            item.onClick?.();
            item.burgerAction();
          }}
        >
          {icon}
        </button>
      )}
    </li>
  );
};
