import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextInput } from '../../../shared/ui/forms/TextInput';

export const CatalogSearch = () => {
  const { register, handleSubmit, setValue } = useForm<{
    searchText: string;
  }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const searched = searchParams.get('searchText');
  useEffect(() => {
    setValue('searchText', searched || '');
  }, [searched, setValue]);

  const onSearchApply = ({ searchText }: { searchText: string }) => {
    if (searchText === '') {
      searchParams.delete('searchText');
    } else {
      searchParams.set('searchText', searchText);
    }
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit(onSearchApply)}>
      <div className="space-y-2 space-x-2">
        <TextInput
          type="search"
          placeholder="Type for search"
          register={register('searchText')}
        />
      </div>
    </form>
  );
};
