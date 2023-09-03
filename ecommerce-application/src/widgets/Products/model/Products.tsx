import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { useParams /* useSearchParams */ } from 'react-router-dom';
import { ProductData, ProductsData } from '../../../shared/types/interfaces';
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
  const [categories] = useState<string[]>(Object.keys(categoriesList));
  const serverApi = ServerAPI.getInstance();
  const cbSetProducts = useCallback(
    (newProducts: ProductData[]) => setProducts(newProducts),
    [],
  );

  const { category } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  // setSearchParams({
  //   post: 'test',
  // });
  // console.log(searchParams.get('post'));

  // console.log(searchParams);

  useEffect(() => {
    const fetchProducts = async () => {
      const products: ProductsData = await serverApi.getProducts({
        categoryId:
          category && categoriesList[category]
            ? categoriesList[category]
            : undefined,
      });
      if (products) {
        cbSetProducts(products.results);
      }
    };
    fetchProducts();
  }, [categoriesList, category, cbSetProducts, serverApi]);

  return (
    <>
      <Categories categories={categories} />
      <ProductFilter />
      <ProductList products={products} />
    </>
  );
};
