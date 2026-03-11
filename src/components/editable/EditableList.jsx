import { useState, useEffect, useCallback } from 'react';
import { useEditMode } from '../../context/EditModeContext';
import { useContent } from '../../hooks/useContent';

function EditableList({
  page,
  section,
  renderItem,
  renderEditItem,
  itemTemplate = {},
  defaultItems = [],
  className = '',
  itemClassName = '',
  addLabel = 'Aggiungi elemento',
  emptyMessage = 'Nessun elemento'
}) {
  const { isEditMode, isAdmin } = useEditMode();
  const { getArray, updateSection } = useContent(page);
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const currentItems = getArray(section, defaultItems);

  useEffect(() => {
    setItems(currentItems);
  }, [JSON.stringify(currentItems)]);

  const handleAdd = useCallback(() => {
    const newItem = { ...itemTemplate, _id: `new_${Date.now()}` };
    const newItems = [...items, newItem];
    setItems(newItems);
    updateSection(section, newItems);
    setEditingIndex(newItems.length - 1);
    setEditingItem(newItem);
  }, [items, itemTemplate, section, updateSection]);

  const handleEdit = useCallback((index) => {
    setEditingIndex(index);
    setEditingItem({ ...items[index] });
  }, [items]);

  const handleSaveItem = useCallback(() => {
    if (editingIndex !== null && editingItem) {
      const newItems = [...items];
      newItems[editingIndex] = editingItem;
      setItems(newItems);
      updateSection(section, newItems);
      setEditingIndex(null);
      setEditingItem(null);
    }
  }, [editingIndex, editingItem, items, section, updateSection]);

  const handleCancelEdit = useCallback(() => {
    if (editingIndex !== null && items[editingIndex]?._id?.startsWith('new_')) {
      const newItems = items.filter((_, i) => i !== editingIndex);
      setItems(newItems);
      updateSection(section, newItems);
    }
    setEditingIndex(null);
    setEditingItem(null);
  }, [editingIndex, items, section, updateSection]);

  const handleDelete = useCallback((index) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo elemento?')) {
      return;
    }
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    updateSection(section, newItems);
  }, [items, section, updateSection]);

  const handleMoveUp = useCallback((index) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
    updateSection(section, newItems);
  }, [items, section, updateSection]);

  const handleMoveDown = useCallback((index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
    updateSection(section, newItems);
  }, [items, section, updateSection]);

  const updateEditingField = useCallback((field, value) => {
    setEditingItem(prev => ({ ...prev, [field]: value }));
  }, []);

  if (!isEditMode || !isAdmin) {
    if (items.length === 0) {
      return <div className={className}><p>{emptyMessage}</p></div>;
    }
    return (
      <div className={className}>
        {items.map((item, index) => (
          <div key={item._id || index} className={itemClassName}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`editable-list ${className}`}>
      {items.length === 0 ? (
        <div className="editable-list-empty">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        items.map((item, index) => (
          <div
            key={item._id || index}
            className={`editable-list-item ${itemClassName} ${editingIndex === index ? 'editing' : ''}`}
          >
            {editingIndex === index ? (
              <div className="editable-list-item-editor">
                {renderEditItem(editingItem, updateEditingField, index)}
                <div className="editable-list-item-actions">
                  <button
                    type="button"
                    className="btn-edit-save"
                    onClick={handleSaveItem}
                  >
                    Salva
                  </button>
                  <button
                    type="button"
                    className="btn-edit-cancel"
                    onClick={handleCancelEdit}
                  >
                    Annulla
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="editable-list-item-content"
                  onClick={() => handleEdit(index)}
                  style={{ cursor: 'pointer' }}
                  title="Clicca per modificare"
                >
                  {renderItem(item, index)}
                </div>
                <div className="editable-list-item-controls">
                  <button
                    type="button"
                    className="btn-list-control"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    title="Sposta su"
                  >
                    &#9650;
                  </button>
                  <button
                    type="button"
                    className="btn-list-control"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === items.length - 1}
                    title="Sposta giu"
                  >
                    &#9660;
                  </button>
                  <button
                    type="button"
                    className="btn-list-control btn-edit"
                    onClick={() => handleEdit(index)}
                    title="Modifica"
                  >
                    &#9998;
                  </button>
                  <button
                    type="button"
                    className="btn-list-control btn-delete"
                    onClick={() => handleDelete(index)}
                    title="Elimina"
                  >
                    &#10005;
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}

      <button
        type="button"
        className="editable-list-add"
        onClick={handleAdd}
      >
        + {addLabel}
      </button>
    </div>
  );
}

export default EditableList;
