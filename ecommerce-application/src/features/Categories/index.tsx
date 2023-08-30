import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServerAPI } from '../../shared/api/ServerAPI';
import { CategoryData } from '../../shared/types/interfaces';

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
  const categoriesId: Record<string, string> = {};
  console.log(category);

  const serverApi = ServerAPI.getInstance();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories: CategoryData[] = await serverApi.getCategories(true);
      categories.forEach(({ name: { en: categoryName }, id }) => {
        categoriesId[categoryName] = id;
      });
      setCategories(() => categories);
      if (category && !Object.keys(categoriesId).includes(category)) {
        navigate('/catalog');
      }
    };
    fetchCategories();
    return () => {};
    // !Эта хренотень запускает бесконечный цикл, если сделать как хочет линтер.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};
