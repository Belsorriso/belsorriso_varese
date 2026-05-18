import { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import ElementCard from './ElementCard';
import ElementPalette from './ElementPalette';
import ElementSettings from './ElementSettings';
import { v4 as uuidv4 } from 'uuid';

function ColumnEditor({ column, rowId, onUpdate }) {
  const [showPalette, setShowPalette] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  const { setNodeRef, isOver } = useDroppable({
    id: `col-${column.id}`,
  });

  const handleAddElement = (type) => {
    const newElement = {
      id: uuidv4(),
      type,
      settings: {},
    };
    onUpdate({ ...column, elements: [...(column.elements || []), newElement] });
    setShowPalette(false);
  };

  const handleDeleteElement = (elementId) => {
    onUpdate({ ...column, elements: (column.elements || []).filter(el => el.id !== elementId) });
  };

  const handleEditElement = (element) => {
    setEditingElement(element);
  };

  const handleUpdateElement = (updatedElement) => {
    const elements = (column.elements || []).map(el =>
      el.id === updatedElement.id ? updatedElement : el
    );
    onUpdate({ ...column, elements });
    setEditingElement(updatedElement);
  };

  const elements = column.elements || [];

  return (
    <div
      ref={setNodeRef}
      className={`pb-column-drop-zone ${isOver ? 'over' : ''}`}
      style={{ minHeight: 90, border: '2px dashed #c4b5fd', borderRadius: 8, background: '#faf5ff', padding: 8 }}
    >
      <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
        {elements.map(el => (
          <ElementCard
            key={el.id}
            element={el}
            onEdit={handleEditElement}
            onDelete={handleDeleteElement}
          />
        ))}
      </SortableContext>

      <button
        className="pb-add-element-btn"
        onClick={() => setShowPalette(true)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, padding: '12px 16px', width: '100%', boxSizing: 'border-box',
          border: '2px dashed #7c3aed', borderRadius: 8,
          background: '#ede9fe', color: '#5b21b6',
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
          marginTop: elements.length > 0 ? 8 : 0,
        }}
      >
        + Aggiungi Elemento
      </button>

      {showPalette && (
        <ElementPalette
          onSelect={handleAddElement}
          onClose={() => setShowPalette(false)}
        />
      )}

      {editingElement && (
        <ElementSettings
          element={editingElement}
          onChange={handleUpdateElement}
          onClose={() => setEditingElement(null)}
        />
      )}
    </div>
  );
}

export default ColumnEditor;
