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
import { ProductFilters } from '../../../features/ProductFilters';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CatalogPagination } from '../../../entities/CatalogPagination';

export const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const categoriesList = useSelector(
    (state: RootState) => state.categories.categoriesData,
  );
  const [categories, setCategories] = useState<string[]>([]);
  const serverApi = ServerAPI.getInstance();
  const cbSetProducts = useCallback(
    (newProducts: ProductData[]) => setProducts(newProducts),
    [],
  );
  const cbSetTotalProducts = useCallback(
    (total: number) => setTotalProducts(total),
    [],
  );

  const { category } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setCategories(Object.keys(categoriesList));
    const fetchProducts = async () => {
      const material = searchParams.get('materials');
      const color = searchParams.get('colors');
      const gender = searchParams.get('genders');
      const brand = searchParams.get('brands');
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      const searchText = searchParams.get('searchText');
      const sort = searchParams.get('sort');
      const page = searchParams.get('page');
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
        material,
        color,
        gender,
        brand,
        priceRange: price || undefined,
        searchText,
        sort,
        page,
      });
      if (products) {
        cbSetProducts(products.results);
        cbSetTotalProducts(products.total);
      }
    };
    fetchProducts();
  }, [
    categoriesList,
    category,
    cbSetProducts,
    serverApi,
    searchParams,
    cbSetTotalProducts,
  ]);

  return (
    <>
      <Categories categories={categories} />
      <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,_300px),_1fr] gap-3">
        <ProductFilters />
        <div>
          <ProductList products={products} />
          <CatalogPagination totalProducts={totalProducts} />
        </div>
      </div>
    </>
  );
};
