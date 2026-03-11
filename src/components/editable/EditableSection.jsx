import { useEditMode } from '../../context/EditModeContext';

function EditableSection({
  children,
  className = '',
  style = {},
  label = ''
}) {
  const { isEditMode, isAdmin } = useEditMode();

  if (!isEditMode || !isAdmin) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`editable-section ${className}`}
      style={style}
    >
      {label && (
        <div className="editable-section-label">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

export default EditableSection;
