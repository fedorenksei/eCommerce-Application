import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTextStyles } from '../../../shared/ui/styles';
import { PaginationLimit } from './PaginationLimit';
import {
  ButtonNext,
  ButtonPrevious,
} from '../../../shared/ui/buttons/PrevNext';

type Props = {
  totalProducts: number;
  itemsOnPage: number;
};

export const CatalogPagination = ({ totalProducts, itemsOnPage }: Props) => {
  const maxPage = Math.ceil(totalProducts / itemsOnPage);
  const [currPage, setCurrPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  useEffect(() => {
    if (page) {
      setCurrPage(maxPage < Number(page) ? maxPage : Number(page));
    } else {
      setCurrPage(1);
    }
  }, [page, maxPage]);

  const onNextPageClick = () => {
    const newPage = currPage + 1;
    if (newPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(newPage));
    }
    setSearchParams(searchParams);
  };

  const onPrevPageClick = () => {
    const newPage = currPage - 1;
    if (newPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(newPage));
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-wrap py-4 gap-x-5 gap-y-2 justify-between items-center">
      <div className="flex justify-center gap-5 items-center">
        <ButtonPrevious
          disabled={currPage === 1}
          onClick={onPrevPageClick}
        />
        <span className={getTextStyles({ font: 'h3' })}>
          {currPage} / {isNaN(maxPage) ? '...' : maxPage}
        </span>
        <ButtonNext
          disabled={Number(currPage) >= Number(maxPage)}
          onClick={onNextPageClick}
        />
      </div>
      <PaginationLimit />
    </div>
  );
};
