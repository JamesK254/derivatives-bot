import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TradingNodeData } from '../types/trading.types';

const ConditionNode: React.FC<NodeProps<TradingNodeData>> = ({ data, isConnectable }) => {
  return (
    <div
      style={{
        padding: '15px 20px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        color: '#333',
        border: '2px solid #f59e0b',
        minWidth: '180px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        isConnectable={isConnectable}
        style={{ background: '#fff', width: '10px', height: '10px' }}
      />

      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
        🔀 Condition
      </div>

      <div style={{ fontSize: '12px' }}>
        {data.condition || 'If condition...'}
      </div>

      {/* True path output */}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        isConnectable={isConnectable}
        style={{ background: '#22c55e', width: '10px', height: '10px', top: '50%' }}
      />

      {/* False path output */}
      <Handle
        type="source"
        position={Position.Left}
        id="false"
        isConnectable={isConnectable}
        style={{ background: '#ef4444', width: '10px', height: '10px', top: '50%' }}
      />

      <div style={{ fontSize: '10px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#dc2626' }}>← False</span>
        <span style={{ color: '#16a34a' }}>True →</span>
      </div>
    </div>
  );
};

export default ConditionNode;
