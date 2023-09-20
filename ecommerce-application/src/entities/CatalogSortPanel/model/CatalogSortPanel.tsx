import React, { useState, useEffect, PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTextStyles } from '../../../shared/ui/styles';
import clsx from 'clsx';
import { Paragraph } from '../../../shared/ui/text/Paragraph';

type SortType = '' | 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc';

const Collapsible = ({
  isOpen,
  children,
}: PropsWithChildren<{ isOpen: boolean }>) => {
  return (
    <div
      className={`grid transition-all overflow-hidden ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="min-h-0">{children}</div>
    </div>
  );
};

const Option = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <div
      onClick={onClick}
      role="presentation"
      className={clsx(
        getTextStyles({}),
        'p-3 cursor-pointer transition',
        'bg-bg-color dark:bg-dt-bg-color hover:bg-hover-color dark:hover:bg-hover-color',
        'hover:text-dt-text-color',
        'border border-t-0 box-border',
      )}
    >
      {children}
    </div>
  );
};

export const CatalogSortPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortState, setSortState] = useState<SortType>('');
  const chosen = searchParams.get('sort') as SortType;

  useEffect(() => {
    setSortState(chosen || '');
  }, [chosen]);
  const onSortChanging = (sortType: string) => {
    setIsOpen(false);
    if (sortType === '') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', sortType || '');
    }
    setSearchParams(searchParams);
  };

  const valuesMap: Record<SortType, string> = {
    '': 'default',
    nameAsc: 'name (A => Z)',
    nameDesc: 'name (Z => A)',
    priceAsc: 'price (min => max)',
    priceDesc: 'price (max => min)',
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Paragraph>Sort by: </Paragraph>

      <div className="relative shrink-0 w-48">
        <div
          onClick={() => setIsOpen((s) => !s)}
          role="presentation"
          className={clsx(
            getTextStyles({}),
            'p-3 cursor-pointer transition hover:bg-disabled-color',
            'border rounded-tr-md rounded-tl-md',
            !isOpen && 'rounded-br-md rounded-bl-md',
          )}
        >
          {valuesMap[sortState]}
        </div>
        <div className="absolute w-full top-full left-0 z-40">
          <Collapsible isOpen={isOpen}>
            {Object.keys(valuesMap).map((sortType) => (
              <Option
                key={sortType}
                onClick={() => onSortChanging(sortType)}
              >
                {valuesMap[sortType as SortType]}
              </Option>
            ))}
          </Collapsible>
        </div>
      </div>
    </div>
  );
};
