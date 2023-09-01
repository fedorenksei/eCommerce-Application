import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { useParams } from 'react-router-dom';
import {
  CategoryData,
  ProductData,
  ProductsData,
} from '../../../shared/types/interfaces';

export const Products = () => {
  const [products, setProducts] = useState<ProductData[]>();
  const { category } = useParams();

  const serverApi = ServerAPI.getInstance();
  const cbSetProducts = useCallback(
    (newProducts: ProductData[]) => setProducts(newProducts),
    [],
  );
  useEffect(() => {
    const categoriesId: Record<string, string> = {};
    const fetchCategories = async () => {
      const categories: CategoryData[] = await serverApi.getCategories(true);
      categories.forEach(({ name: { en: categoryName }, id }) => {
        categoriesId[categoryName] = id;
      });
    };
    const fetchProducts = async () => {
      await fetchCategories();
      const products: ProductsData = await serverApi.getProducts(
        category ? categoriesId[category] : null,
      );
      if (products) {
        cbSetProducts(products.results);
      }
    };
    fetchProducts();
  }, [category, cbSetProducts, serverApi]);

  return (
    <div className="flex flex-col">
      {products &&
        products.map(({ name: { en: productName }, id }) => (
          <span key={id}>{JSON.stringify(productName)}</span>
        ))}
    </div>
  );
};
