/* import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryData } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';

interface Props {
  name: string;
  onClick: () => void;
  isActive?: boolean;
}

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
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const { category } = useParams();
  const cbSetCategories = useCallback(
    (newCategories: CategoryData[]) => setCategories(newCategories),
    [],
  );

  const serverApi = ServerAPI.getInstance();

  const navigate = useNavigate();

  useEffect(() => {
    const categoriesId: Record<string, string> = {};
    const fetchCategories = async () => {
      const categories: CategoryData[] = await serverApi.getCategories(true);
      categories.forEach(({ name: { en: categoryName }, id }) => {
        categoriesId[categoryName] = id;
      });
      cbSetCategories(categories);
      if (category && !Object.keys(categoriesId).includes(category)) {
        navigate('/not-found');
      }
    };
    fetchCategories();
    return () => {};
  }, [category, cbSetCategories, navigate, serverApi]);

  const onCategoryClick = (categoryName: string) => {
    navigate(`/catalog/${categoryName}`);
  };
  return (
    <div className="flex w-full justify-around">
      {categories.map(({ name: { en: categoryName } }) => {
        return (
          <Category
            name={categoryName}
            onClick={() => onCategoryClick(categoryName)}
            key={categoryName}
            isActive={category === categoryName}
          />
        );
      })}
    </div>
  );
}; */

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
