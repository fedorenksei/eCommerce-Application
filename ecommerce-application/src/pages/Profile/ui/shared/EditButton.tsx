import { getButtonStyles } from '../../../../shared/ui/styles';

interface EditButton {
  editMode: boolean;
  onClick: () => void;
}

export const EditButton = ({ editMode, onClick }: EditButton) => {
  const styles = getButtonStyles({
    shape: 'square',
    size: 'small',
    filling: 'transparent',
  });
  return (
    <button
      onClick={onClick}
      className={styles}
    >
      {!editMode ? 'Edit' : 'Cancel'}
    </button>
  );
};
