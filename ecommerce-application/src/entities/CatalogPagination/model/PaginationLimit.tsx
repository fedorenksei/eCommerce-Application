import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextInput } from '../../../shared/ui/forms/TextInput';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { DEFAULT_LIMIT } from '../../../shared/api/ServerAPI';

export const PaginationLimit = () => {
  const { register, handleSubmit, setValue } = useForm<{
    limit: string;
  }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const limitFromUrl = searchParams.get('limit');
  useEffect(() => {
    setValue('limit', limitFromUrl || `${DEFAULT_LIMIT}`);
  }, [limitFromUrl, setValue]);

  const onLimitApply = ({ limit }: { limit: string }) => {
    if (!limit) {
      searchParams.set('limit', `${DEFAULT_LIMIT}`);
    } else {
      searchParams.set('limit', limit);
    }
    setSearchParams(searchParams);
  };

  return (
    <form
      onSubmit={handleSubmit(onLimitApply)}
      className="flex items-center gap-2"
    >
      <label htmlFor="limit">
        <Paragraph>Items per page:</Paragraph>
      </label>
      <div className="w-[70px]">
        <TextInput
          inputId="limit"
          type="number"
          enterKeyHint="done"
          register={register('limit')}
        />
      </div>
    </form>
  );
};
