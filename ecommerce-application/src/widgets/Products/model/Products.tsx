import React from 'react';
import { useState, useEffect } from 'react';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { useParams } from 'react-router-dom';
import { CategoryData } from '../../../shared/types/interfaces';

interface ProductData {
  name: {
    en: string;
  };
}

interface ProductsData {
  results: ProductData[];
}

export const Products = () => {
  const [products, setProducts] = useState<ProductData[]>();
  const { category } = useParams();
  console.log(category);
  const categoriesId: Record<string, string> = {};

  const serverApi = ServerAPI.getInstance();
  useEffect(() => {
    const fetchCategories = async () => {
      const categories: CategoryData[] = await serverApi.getCategories(true);
      categories.forEach(({ name: { en: categoryName }, id }) => {
        categoriesId[categoryName] = id;
      });
    };
    const fetchProducts = async () => {
      await fetchCategories();
      console.log('category is', category);
      category && console.log(categoriesId[category]);
      const products: ProductsData = await serverApi.getProducts(
        category ? categoriesId[category] : null,
      );
      if (products) {
        setProducts(() => products.results);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  return (
    <div className="flex flex-col">
      {products &&
        products.map(({ name: { en: productName } }) => (
          <span key={JSON.stringify(productName)}>
            {JSON.stringify(productName)}
          </span>
        ))}
    </div>
  );
};
