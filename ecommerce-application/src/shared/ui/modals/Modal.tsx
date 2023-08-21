import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { setIsShown } from '../../store/modalSlice';

export const Modal = () => {
  const dispatch = useDispatch();
  const isShown = useSelector((state: RootState) => state.modal.isShown);
  const text = useSelector((state: RootState) => state.modal.text);
  return (
    <div
      className={`absolute max-w-80 p-7 min-h-[4rem] bottom-0 right-0 text-center border-2 border-text-color dark:border-dt-text-color rounded-md bg-bg-color dark:bg-dt-bg-color text-text-color dark:text-dt-text-color justify-center items-center ${
        isShown ? 'flex' : 'hidden'
      }`}
    >
      <button
        onClick={() => dispatch(setIsShown({ isShown: false }))}
        className="absolute w-5 h-5 top-[5px] right-[5px] leading-none cursor-pointer text-text-color dark:text-dt-text-color"
      >
        X
      </button>
      <p>{text}</p>
    </div>
  );
};
