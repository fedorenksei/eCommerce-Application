import React from 'react';
import { useParams } from 'react-router-dom';

export const Product = () => {
  const { id } = useParams();
  console.log(id);

  return <div>Product</div>;
};
