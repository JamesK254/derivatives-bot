/**
 * Property Editor - Edit node properties
 * Replaces Blockly's inline field editing
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Node } from 'reactflow';
import { NodeDefinition, NodeField } from '../config/nodeDefinitions';
import './PropertyEditor.scss';

interface PropertyEditorProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, updates: Record<string, any>) => void;
  onClose: () => void;
  variables?: string[];
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({
  selectedNode,
  onUpdateNode,
  onClose,
  variables = [],
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const definition: NodeDefinition | undefined = selectedNode?.data?.definition;

  useEffect(() => {
    if (selectedNode) {
      // Initialize form with current node data
      const initial: Record<string, any> = {};
      definition?.fields.forEach((field) => {
        initial[field.name] = selectedNode.data[field.name] ?? field.defaultValue;
      });
      setFormData(initial);
    }
  }, [selectedNode, definition]);

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, formData);
      onClose();
    }
  }, [selectedNode, formData, onUpdateNode, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!selectedNode || !definition) {
    return null;
  }

  return (
    <div className="property-editor">
      <div className="property-editor__overlay" onClick={handleCancel} />

      <div className="property-editor__panel">
        {/* Header */}
        <div className="property-editor__header">
          <div>
            <h3 className="property-editor__title">
              {definition.icon} {definition.label}
            </h3>
            <p className="property-editor__description">{definition.description}</p>
          </div>
          <button onClick={handleCancel} className="property-editor__close">
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="property-editor__content">
          {definition.fields.length === 0 ? (
            <div className="property-editor__empty">
              This block has no configurable properties.
            </div>
          ) : (
            <form className="property-editor__form">
              {definition.fields.map((field) => (
                <div key={field.name} className="property-editor__field">
                  <label className="property-editor__label" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {renderField(field, formData[field.name], (val) => handleFieldChange(field.name, val), variables)}
                </div>
              ))}
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="property-editor__footer">
          <button onClick={handleCancel} className="property-editor__button property-editor__button--secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="property-editor__button property-editor__button--primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Render different field types
function renderField(
  field: NodeField,
  value: any,
  onChange: (value: any) => void,
  variables: string[]
): React.ReactNode {
  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          id={field.name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="property-editor__input"
        />
      );

    case 'textarea':
      return (
        <textarea
          id={field.name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="property-editor__textarea"
          rows={4}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          id={field.name}
          value={value ?? ''}
          onChange={(e) => onChange(Number(e.target.value))}
          min={field.min}
          max={field.max}
          placeholder={field.placeholder}
          className="property-editor__input"
        />
      );

    case 'dropdown':
      return (
        <select
          id={field.name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="property-editor__select"
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case 'checkbox':
      return (
        <label className="property-editor__checkbox-label">
          <input
            type="checkbox"
            id={field.name}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="property-editor__checkbox"
          />
          <span>{field.label}</span>
        </label>
      );

    case 'color':
      return (
        <div className="property-editor__color-input">
          <input
            type="color"
            id={field.name}
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="property-editor__color-picker"
          />
          <input
            type="text"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="property-editor__input property-editor__input--color"
          />
        </div>
      );

    case 'variable':
      return (
        <div className="property-editor__variable-input">
          <select
            id={field.name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="property-editor__select"
          >
            <option value="">Select variable...</option>
            {variables.map((varName) => (
              <option key={varName} value={varName}>
                {varName}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or type new variable name"
            className="property-editor__input property-editor__input--variable"
          />
        </div>
      );

    default:
      return (
        <input
          type="text"
          id={field.name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="property-editor__input"
        />
      );
  }
}

export default PropertyEditor;
