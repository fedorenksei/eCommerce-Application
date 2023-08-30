import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  name: string;
  onClick: () => void;
  isActive?: boolean;
}

interface testCat {
  name: string;
}

const testCategories: testCat[] = [
  {
    name: 'test1',
  },
  {
    name: 'test2',
  },
  {
    name: 'test3',
  },
  {
    name: 'test4',
  },
  {
    name: 'test5',
  },
];

const Category = ({ name, onClick, isActive }: Props) => {
  return (
    <button
      className={`border-slate-800 border-2 cursor-pointer select-none ${
        isActive && 'bg-slate-800 text-white'
      }`}
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
};

export const Categories = () => {
  const [categories, setCategories] = useState<testCat[]>([]);
  const { category } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setCategories(() => testCategories);
  }, []);

  const onCategoryClick = (categoryName: string) => {
    navigate(`/catalog/${categoryName}`);
  };
  return (
    <div className="flex w-full justify-around">
      {categories.map(({ name }) => {
        return (
          <Category
            name={name}
            onClick={() => onCategoryClick(name)}
            key={name}
            isActive={category === name}
          />
        );
      })}
    </div>
  );
};
