import { Link } from 'react-router-dom';

export const ToMain = () => {
  return (
    <li className="text-center text-text-color dark:text-dt-text-color text-md font-bold hover:text-primary-color hover:underline">
      <Link
        onClick={() => setBurgerShown((state) => !state)}
        to="/"
      >
        Main
      </Link>
    </li>
  );
};
