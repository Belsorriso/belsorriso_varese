import { useState } from 'react';

function ArrayEditor({
  items = [],
  onChange,
  fields,
  title,
  itemLabel = 'Elemento',
  maxItems,
  renderPreview
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleAdd = () => {
    if (maxItems && items.length >= maxItems) return;

    const newItem = {};
    fields.forEach(field => {
      if (field.type === 'array') {
        newItem[field.name] = [];
      } else if (field.type === 'checkbox') {
        newItem[field.name] = false;
      } else {
        newItem[field.name] = field.default || '';
      }
    });

    const newItems = [...items, newItem];
    onChange(newItems);
    setExpandedIndex(newItems.length - 1);
  };

  const handleRemove = (index) => {
    if (!window.confirm(`Sei sicuro di voler eliminare questo ${itemLabel.toLowerCase()}?`)) return;
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleChange = (index, fieldName, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [fieldName]: value };
    onChange(newItems);
  };

  const handleMove = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    onChange(newItems);
    setExpandedIndex(newIndex);
  };

  const handleArrayFieldChange = (itemIndex, fieldName, subIndex, value) => {
    const newItems = [...items];
    const newArray = [...(newItems[itemIndex][fieldName] || [])];
    newArray[subIndex] = value;
    newItems[itemIndex] = { ...newItems[itemIndex], [fieldName]: newArray };
    onChange(newItems);
  };

  const handleArrayFieldAdd = (itemIndex, fieldName) => {
    const newItems = [...items];
    const newArray = [...(newItems[itemIndex][fieldName] || []), ''];
    newItems[itemIndex] = { ...newItems[itemIndex], [fieldName]: newArray };
    onChange(newItems);
  };

  const handleArrayFieldRemove = (itemIndex, fieldName, subIndex) => {
    const newItems = [...items];
    const newArray = (newItems[itemIndex][fieldName] || []).filter((_, i) => i !== subIndex);
    newItems[itemIndex] = { ...newItems[itemIndex], [fieldName]: newArray };
    onChange(newItems);
  };

  const renderField = (field, item, index) => {
    const value = item[field.name];

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(index, field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(index, field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(index, field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleChange(index, field.name, e.target.value)}
          >
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleChange(index, field.name, e.target.checked)}
            />
            {field.checkboxLabel}
          </label>
        );

      case 'array':
        return (
          <div className="array-field">
            {(value || []).map((subItem, subIndex) => (
              <div key={subIndex} className="array-field-item">
                <input
                  type="text"
                  value={subItem}
                  onChange={(e) => handleArrayFieldChange(index, field.name, subIndex, e.target.value)}
                  placeholder={field.itemPlaceholder}
                />
                <button
                  type="button"
                  className="btn-icon btn-remove"
                  onClick={() => handleArrayFieldRemove(index, field.name, subIndex)}
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-small"
              onClick={() => handleArrayFieldAdd(index, field.name)}
            >
              + Aggiungi {field.itemLabel || 'elemento'}
            </button>
          </div>
        );

      case 'image':
        return (
          <div className="image-field">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(index, field.name, e.target.value)}
              placeholder="URL immagine..."
            />
            {value && (
              <img src={value} alt="Preview" className="image-preview-small" />
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(index, field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="array-editor">
      {title && <h4 className="array-editor-title">{title}</h4>}

      <div className="array-editor-items">
        {items.map((item, index) => (
          <div key={index} className={`array-editor-item ${expandedIndex === index ? 'expanded' : ''}`}>
            <div
              className="array-editor-item-header"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <span className="item-number">{index + 1}</span>
              <span className="item-title">
                {renderPreview
                  ? renderPreview(item, index)
                  : item[fields[0]?.name] || `${itemLabel} ${index + 1}`
                }
              </span>
              <div className="item-actions">
                <button
                  type="button"
                  className="btn-icon"
                  onClick={(e) => { e.stopPropagation(); handleMove(index, -1); }}
                  disabled={index === 0}
                  title="Sposta su"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={(e) => { e.stopPropagation(); handleMove(index, 1); }}
                  disabled={index === items.length - 1}
                  title="Sposta giu"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="btn-icon btn-remove"
                  onClick={(e) => { e.stopPropagation(); handleRemove(index); }}
                  title="Elimina"
                >
                  x
                </button>
              </div>
            </div>

            {expandedIndex === index && (
              <div className="array-editor-item-content">
                {fields.map(field => (
                  <div key={field.name} className="form-group">
                    <label>{field.label}</label>
                    {renderField(field, item, index)}
                    {field.help && <small className="field-help">{field.help}</small>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-secondary add-item-btn"
        onClick={handleAdd}
        disabled={maxItems && items.length >= maxItems}
      >
        + Aggiungi {itemLabel}
      </button>

      {maxItems && (
        <small className="items-count">{items.length} / {maxItems} {itemLabel}</small>
      )}
    </div>
  );
}

export default ArrayEditor;
