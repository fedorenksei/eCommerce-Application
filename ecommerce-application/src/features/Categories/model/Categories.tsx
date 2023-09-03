import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
          className={`border-slate-800 border-2 cursor-pointer select-none ${
            category === item && 'bg-slate-800 text-white'
          }`}
          key={item}
          onClick={() => navigate(`/catalog/${item}`)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
