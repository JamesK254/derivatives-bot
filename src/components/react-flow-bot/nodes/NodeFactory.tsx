/**
 * Node Factory - Generates React Flow nodes from node definitions
 * Replaces all individual Blockly block components
 */

import React, { memo, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeDefinition } from '../config/nodeDefinitions';

// Map string positions to React Flow Position enum
const positionMap: Record<string, Position> = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
};

interface GenericNodeProps extends NodeProps {
  data: {
    definition: NodeDefinition;
    [key: string]: any;
  };
}

/**
 * Generic Node Component
 * Dynamically renders any node based on its definition
 */
const GenericNode: React.FC<GenericNodeProps> = ({ data, selected, isConnectable }) => {
  const { definition } = data;

  const style = useMemo(() => ({
    padding: '12px 16px',
    borderRadius: '8px',
    background: definition.gradient || definition.color,
    color: '#fff',
    border: selected ? '2px solid #3b82f6' : `2px solid ${definition.color}`,
    minWidth: '180px',
    boxShadow: selected
      ? '0 8px 16px rgba(59, 130, 246, 0.3)'
      : '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '13px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  }), [definition, selected]);

  const titleStyle = useMemo(() => ({
    fontWeight: 'bold',
    marginBottom: '6px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  }), []);

  const fieldContainerStyle = useMemo(() => ({
    marginTop: '8px',
    fontSize: '12px',
    opacity: 0.95,
  }), []);

  return (
    <div style={style} className="custom-node">
      {/* Render handles */}
      {definition.handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={positionMap[handle.position]}
          id={handle.id}
          isConnectable={isConnectable}
          style={{
            background: handle.type === 'source' ? '#10b981' : '#3b82f6',
            width: '10px',
            height: '10px',
            border: '2px solid #fff',
          }}
        />
      ))}

      {/* Node title */}
      <div style={titleStyle}>
        {definition.icon && <span>{definition.icon}</span>}
        <span>{definition.label}</span>
      </div>

      {/* Render fields (simplified - values shown, editing in property panel) */}
      {definition.fields.length > 0 && (
        <div style={fieldContainerStyle}>
          {definition.fields.map((field) => (
            <div key={field.name} style={{ marginTop: '4px' }}>
              <strong>{field.label}:</strong>{' '}
              {data[field.name] !== undefined
                ? String(data[field.name])
                : String(field.defaultValue || '')}
            </div>
          ))}
        </div>
      )}

      {/* Show special badges */}
      {definition.isMandatory && (
        <div
          style={{
            marginTop: '6px',
            padding: '2px 6px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            fontSize: '10px',
            display: 'inline-block',
          }}
        >
          REQUIRED
        </div>
      )}
    </div>
  );
};

export default memo(GenericNode);

/**
 * Create node types object for React Flow
 * Maps all node types to the GenericNode component
 */
export const createNodeTypes = (nodeDefinitions: Record<string, NodeDefinition>) => {
  const nodeTypes: Record<string, React.ComponentType<NodeProps>> = {};

  Object.keys(nodeDefinitions).forEach((type) => {
    nodeTypes[type] = GenericNode;
  });

  return nodeTypes;
};

/**
 * Create a new node instance from definition
 */
export const createNodeInstance = (
  definition: NodeDefinition,
  position: { x: number; y: number },
  id?: string
) => {
  const nodeId = id || `${definition.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Initialize node data with default values from fields
  const initialData: Record<string, any> = {
    definition,
    label: definition.label,
  };

  definition.fields.forEach((field) => {
    initialData[field.name] = field.defaultValue;
  });

  return {
    id: nodeId,
    type: definition.type,
    position,
    data: initialData,
  };
};
