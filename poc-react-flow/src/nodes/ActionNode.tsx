import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TradingNodeData } from '../types/trading.types';

const ActionNode: React.FC<NodeProps<TradingNodeData>> = ({ data, isConnectable }) => {
  return (
    <div
      style={{
        padding: '12px 18px',
        borderRadius: '6px',
        background: '#ffffff',
        color: '#333',
        border: '2px solid #6366f1',
        minWidth: '160px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        isConnectable={isConnectable}
        style={{ background: '#6366f1', width: '8px', height: '8px' }}
      />

      <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '13px', color: '#6366f1' }}>
        ⚡ Action
      </div>

      <div style={{ fontSize: '12px', color: '#666' }}>
        {data.action || data.label}
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        isConnectable={isConnectable}
        style={{ background: '#6366f1', width: '8px', height: '8px' }}
      />
    </div>
  );
};

export default ActionNode;
