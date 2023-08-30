import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  name: string;
  onClick: () => void;
}

const Category = ({ name, onClick }: Props) => {
  return (
    <button
      className="border-slate-800 border-2 cursor-pointer select-none"
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
};

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

export const Categories = () => {
  const [categories, setCategories] = useState<testCat[]>([]);
  const { category } = useParams();
  console.log(category);

  const navigate = useNavigate();

  useEffect(() => {
    setCategories(() => testCategories);
  }, []);

  const onCategoryClick = (categoryName: string) => {
    navigate(`/catalog/${categoryName}`);
  };
  return (
    <div className="flex w-full justify-around">
      {categories.map((category) => {
        return (
          <Category
            name={category.name}
            onClick={() => onCategoryClick(category.name)}
            key={category.name}
          />
        );
      })}
    </div>
  );
};
