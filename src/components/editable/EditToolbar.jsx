import { useEditMode } from '../../context/EditModeContext';
import { Link } from 'react-router-dom';

function EditToolbar() {
  const {
    isEditMode,
    isDirty,
    isAdmin,
    saving,
    message,
    toggleEditMode,
    saveChanges,
    discardChanges
  } = useEditMode();

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      {message && (
        <div className={`edit-message edit-message-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className={`edit-toolbar ${isEditMode ? 'edit-mode-active' : ''}`}>
        {!isEditMode ? (
          <>
            <button
              className="edit-toolbar-btn edit-toolbar-btn-primary"
              onClick={toggleEditMode}
            >
              &#9998; Modifica Pagina
            </button>
            <Link to="/admin" className="edit-toolbar-btn edit-toolbar-btn-secondary">
              &#9881; Pannello Admin
            </Link>
          </>
        ) : (
          <>
            <div className="edit-toolbar-status">
              {isDirty && <span className="edit-status-dot" />}
              <span>{isDirty ? 'Modifiche non salvate' : 'Edit Mode'}</span>
            </div>

            <div className="edit-toolbar-actions">
              <button
                className="edit-toolbar-btn edit-toolbar-btn-success"
                onClick={saveChanges}
                disabled={!isDirty || saving}
              >
                {saving ? 'Salvando...' : '&#10003; Salva'}
              </button>

              <button
                className="edit-toolbar-btn edit-toolbar-btn-warning"
                onClick={discardChanges}
                disabled={!isDirty || saving}
              >
                &#8634; Annulla
              </button>

              <button
                className="edit-toolbar-btn edit-toolbar-btn-secondary"
                onClick={toggleEditMode}
                disabled={saving}
              >
                &#10005; Esci
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EditToolbar;
