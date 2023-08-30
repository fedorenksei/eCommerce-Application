import React from 'react';
import { useState, useEffect } from 'react';
import { ServerAPI } from '../../../shared/api/ServerAPI';

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

  const serverApi = ServerAPI.getInstance();
  useEffect(() => {
    const fetchProducts = async () => {
      const products: ProductsData = await serverApi.getProducts();
      console.log(products);
      if (products) {
        setProducts(() => products.results);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
