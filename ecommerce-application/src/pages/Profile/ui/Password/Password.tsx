import { getButtonStyles } from '../../../../shared/ui/styles';
import { Header3 } from '../../../../shared/ui/text/Header3';
import { useToggle } from '../../../../shared/utils/hooks';
import { ProfileSection } from '../shared/ProfileSection';
import { PasswordForm } from './passwordForm';

export const Password = () => {
  const [isChanging, toggleIsChanging] = useToggle();
  const buttonStyles = getButtonStyles({
    shape: 'round',
    size: 'medium',
    filling: 'transparent',
  });
  return (
    <ProfileSection>
      <Header3>Your password</Header3>
      {isChanging ? (
        <PasswordForm closeForm={toggleIsChanging} />
      ) : (
        <div className="flex justify-start">
          <button
            onClick={toggleIsChanging}
            className={buttonStyles}
          >
            Change password
          </button>
        </div>
      )}
    </ProfileSection>
  );
};
