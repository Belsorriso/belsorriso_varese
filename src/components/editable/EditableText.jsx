import { useState, useRef, useEffect } from 'react';
import { useEditMode } from '../../context/EditModeContext';
import { useContent } from '../../hooks/useContent';

function EditableText({
  page,
  section,
  field,
  tag: Tag = 'p',
  className = '',
  multiline = false,
  defaultValue = '',
  style = {}
}) {
  const { isEditMode, isAdmin } = useEditMode();
  const { getField, updateField } = useContent(page);
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState('');
  const inputRef = useRef(null);

  const currentValue = getField(section, field, defaultValue);

  useEffect(() => {
    setLocalValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.select) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleClick = (e) => {
    if (isEditMode && isAdmin) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== currentValue) {
      updateField(section, field, localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setLocalValue(currentValue);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  if (!isEditMode || !isAdmin) {
    return <Tag className={className} style={style}>{currentValue}</Tag>;
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          className={`editable-input editable-textarea ${className}`}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            ...style,
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
            color: 'inherit'
          }}
        />
      );
    }

    return (
      <input
        ref={inputRef}
        type="text"
        className={`editable-input ${className}`}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          ...style,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          color: 'inherit'
        }}
      />
    );
  }

  return (
    <Tag
      className={`editable-element ${className}`}
      style={style}
      onClick={handleClick}
      title="Clicca per modificare"
    >
      {currentValue || <span className="editable-placeholder">Clicca per aggiungere testo...</span>}
    </Tag>
  );
}

export default EditableText;
