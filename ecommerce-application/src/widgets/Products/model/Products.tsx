import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  PriceParams,
  ProductData,
  ProductsData,
} from '../../../shared/types/interfaces';
import { ProductList } from '../../../features/ProductList';
import { Categories } from '../../../features/Categories';
import { ProductFilter } from '../../../features/ProductFilters';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const categoriesList = useSelector(
    (state: RootState) => state.categories.categoriesData,
  );
  const [categories, setCategories] = useState<string[]>([]);
  const serverApi = ServerAPI.getInstance();
  const cbSetProducts = useCallback(
    (newProducts: ProductData[]) => setProducts(newProducts),
    [],
  );

  const { category } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setCategories(Object.keys(categoriesList));
    const fetchProducts = async () => {
      const size = searchParams.get('sizes');
      const color = searchParams.get('colors');
      const gender = searchParams.get('genders');
      const style = searchParams.get('styles');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      let price: PriceParams | null = null;
      if (minPrice !== null && maxPrice !== null) {
        price = {
          min: +minPrice,
          max: +maxPrice,
        };
      }
      const products: ProductsData = await serverApi.getProducts({
        categoryId:
          category && categoriesList[category]
            ? categoriesList[category]
            : undefined,
        size,
        color,
        gender,
        style,
        priceRange: price || undefined,
      });
      if (products) {
        cbSetProducts(products.results);
      }
    };
    fetchProducts();
  }, [categoriesList, category, cbSetProducts, serverApi, searchParams]);

  return (
    <>
      <Categories categories={categories} />
      <ProductFilter />
      <ProductList products={products} />
    </>
  );
};
