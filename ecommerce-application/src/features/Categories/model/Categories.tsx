import clsx from 'clsx';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTextStyles } from '../../../shared/ui/styles';

type Props = {
  categories: string[];
};

export const Categories = ({ categories }: Props) => {
  const { category } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-around">
      {categories.map((item) => (
        <button
          className={clsx(
            getTextStyles({ font: 'h5' }),
            'p-2 border rounded-md',
            'border-primary-color select-none',
            'cursor-pointer transition hover:border-hover-color hover:-translate-y-1 hover:shadow-md',
            category === item && 'bg-primary-color text-white',
          )}
          key={item}
          onClick={() =>
            navigate(category === item ? '/catalog' : `/catalog/${item}`)
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
};
