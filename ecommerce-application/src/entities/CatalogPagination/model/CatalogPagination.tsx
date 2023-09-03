import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  totalProducts: number;
};

const productsOnPage = 9;

export const CatalogPagination = ({ totalProducts }: Props) => {
  console.log(totalProducts);
  const maxPage = Math.ceil(totalProducts / productsOnPage);
  const [currPage, setCurrPage] = useState('1');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  useEffect(() => {
    if (page) {
      setCurrPage(page);
    }
  }, [page]);

  useEffect(() => {
    if (currPage === '1') {
      searchParams.delete('page');
    } else {
      searchParams.set('page', currPage);
    }
    setSearchParams(searchParams);
  }, [currPage, searchParams, setSearchParams]);

  const onNextPageClick = () => {
    setCurrPage((curr) => String(Number(curr) + 1));
  };

  const onPrevPageClick = () => {
    setCurrPage((curr) => String(Number(curr) - 1));
  };
  return (
    <div>
      <button
        disabled={currPage === '1' ? true : false}
        onClick={onPrevPageClick}
      >
        &lt;&lt;
      </button>
      <span>{currPage}</span>
      <button
        disabled={Number(currPage) >= Number(maxPage) ? true : false}
        onClick={onNextPageClick}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
