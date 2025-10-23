import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TradingNodeData } from '../types/trading.types';

const BeforePurchaseNode: React.FC<NodeProps<TradingNodeData>> = ({ data, isConnectable }) => {
  return (
    <div
      style={{
        padding: '15px 20px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        border: '2px solid #e91e63',
        minWidth: '200px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Input handle - receives from previous node */}
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        isConnectable={isConnectable}
        style={{ background: '#fff', width: '10px', height: '10px' }}
      />

      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
        🔍 Before Purchase
      </div>

      <div style={{ fontSize: '12px', opacity: 0.9 }}>
        <div>Pre-trade validation</div>
        {data.condition && (
          <div style={{ marginTop: '4px', fontStyle: 'italic' }}>
            Condition: {data.condition}
          </div>
        )}
      </div>

      {/* Output handle - connects to next node */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        isConnectable={isConnectable}
        style={{ background: '#fff', width: '10px', height: '10px' }}
      />
    </div>
  );
};

export default BeforePurchaseNode;
