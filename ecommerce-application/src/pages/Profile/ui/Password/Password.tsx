import { useState } from 'react';
import { getButtonStyles } from '../../../../shared/ui/styles';
import { Header3 } from '../../../../shared/ui/text/Header3';
import { ProfileSection } from '../shared/ProfileSection';
import { PasswordChange } from './PasswordChange';
import { PasswordConfirm } from './PasswordConfirm';

type PasswordChangingState = 'initial' | 'confirm' | 'change';

export const Password = () => {
  const [state, setState] = useState<PasswordChangingState>('initial');
  const buttonStyles = getButtonStyles({
    shape: 'round',
    size: 'medium',
    filling: 'transparent',
  });

  let element: JSX.Element | null = null;
  if (state === 'initial') {
    element = (
      <div className="flex justify-start">
        <button
          onClick={() => {
            setState('confirm');
          }}
          className={buttonStyles}
        >
          Change password
        </button>
      </div>
    );
  } else if (state === 'confirm') {
    element = (
      <PasswordConfirm
        closeForm={() => {
          setState('initial');
        }}
        onSuccess={() => {
          setState('change');
        }}
      ></PasswordConfirm>
    );
  } else if (state === 'change') {
    element = (
      <PasswordChange
        closeForm={() => {
          setState('initial');
        }}
      />
    );
  }

  return (
    <ProfileSection>
      <Header3>Your password</Header3>
      {element}
    </ProfileSection>
  );
};
