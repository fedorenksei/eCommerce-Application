import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getButtonStyles, getTextStyles } from '../../../shared/ui/styles';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { PaginationLimit } from './PaginationLimit';

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
    <div className="flex flex-wrap py-4 md:p-4 gap-x-5 gap-y-2 justify-between items-center">
      <div className="flex justify-center gap-5 items-center">
        <button
          disabled={currPage === 1 ? true : false}
          onClick={onPrevPageClick}
          className={getButtonStyles({
            size: 'small',
            filling: 'transparent',
            shape: 'round',
            disabled: currPage === 1 ? true : false,
            icon: true,
          })}
        >
          <BsArrowLeftCircle
            size="1.5em"
            title="Previous page"
          />
        </button>
        <span className={getTextStyles({ font: 'h3' })}>
          {currPage} / {isNaN(maxPage) ? '...' : maxPage}
        </span>
        <button
          disabled={Number(currPage) >= Number(maxPage) ? true : false}
          onClick={onNextPageClick}
          className={getButtonStyles({
            size: 'small',
            filling: 'transparent',
            shape: 'round',
            disabled: Number(currPage) >= Number(maxPage) ? true : false,
            icon: true,
          })}
        >
          <BsArrowRightCircle
            size="1.5em"
            title="Next page"
          />
        </button>
      </div>
      <Paragraph>Total: {totalProducts}</Paragraph>
      <PaginationLimit />
    </div>
  );
};
