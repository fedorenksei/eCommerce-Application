import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getButtonStyles, getTextStyles } from '../../../shared/ui/styles';

type Props = {
  totalProducts: number;
};

const productsOnPage = 9;

export const CatalogPagination = ({ totalProducts }: Props) => {
  const maxPage = Math.ceil(totalProducts / productsOnPage);
  const [currPage, setCurrPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  useEffect(() => {
    if (page) {
      setCurrPage(maxPage < Number(page) ? maxPage : Number(page));
    }
  }, [page, maxPage]);

  useEffect(() => {
    if (currPage === 1) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', String(currPage));
    }
    setSearchParams(searchParams);
  }, [currPage, searchParams, setSearchParams]);

  const onNextPageClick = () => {
    setCurrPage((curr) => curr + 1);
  };

  const onPrevPageClick = () => {
    setCurrPage((curr) => curr - 1);
  };

  return (
    <div className="flex justify-center gap-5 p-4 items-center">
      <button
        disabled={currPage === 1 ? true : false}
        onClick={onPrevPageClick}
        className={getButtonStyles({
          size: 'small',
          filling: 'transparent',
          shape: 'round',
          disabled: currPage === 1 ? true : false,
        })}
      >
        &lt;&lt;
      </button>
      <span className={getTextStyles({ font: 'h2' })}>{currPage}</span>
      <button
        disabled={Number(currPage) >= Number(maxPage) ? true : false}
        onClick={onNextPageClick}
        className={getButtonStyles({
          size: 'small',
          filling: 'transparent',
          shape: 'round',
          disabled: Number(currPage) >= Number(maxPage) ? true : false,
        })}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
