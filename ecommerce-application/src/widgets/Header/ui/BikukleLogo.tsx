import { Link } from 'react-router-dom';

export const BikukleLogo = () => {
  return (
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
  );
};
