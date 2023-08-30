import React from 'react';
import { useState, useEffect } from 'react';

/* interface Props {
  name: string;
  onClick: () => void;
} */

/* const Category = ({ name, onClick }: Props) => {
  return <button onClick={() => onClick()}>{name}</button>;
}; */

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

  useEffect(() => {
    setCategories(() => testCategories);
  }, []);
  return (
    <div className="flex w-full justify-around">
      {categories.map((category) => {
        return (
          <div
            className="border-slate-800 border-2 cursor-pointer select-none"
            key={category.name}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
};
