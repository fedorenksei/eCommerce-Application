import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header3 } from '../../../shared/ui/text/Header3';

export const CatalogSortPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortState, setSortState] = useState<string>('');
  const choosen = searchParams.get('sort');

  useEffect(() => {
    setSortState(choosen || '');
  }, [choosen]);
  const onSortChanging = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', e.target.value);
    }
    setSearchParams(searchParams);
  };
  return (
    <div>
      <Header3>Sort</Header3>
      <select
        value={sortState}
        onChange={onSortChanging}
      >
        <option value="">default</option>
        <option value="nameAsc">name &#40;A =&gt; Z&#41;</option>
        <option value="nameDesc">name &#40;Z =&gt; A&#41;</option>
        <option value="priceAsc">price max =&gt; min</option>
        <option value="priceDesc">price min =&gt; max</option>
      </select>
    </div>
  );
};
