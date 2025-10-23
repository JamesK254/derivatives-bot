import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TradingNodeData } from '../types/trading.types';

const DuringPurchaseNode: React.FC<NodeProps<TradingNodeData>> = ({ data, isConnectable }) => {
  return (
    <div
      style={{
        padding: '15px 20px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        border: '2px solid #0891b2',
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
        ⏱️ During Purchase
      </div>

      <div style={{ fontSize: '12px', opacity: 0.9 }}>
        <div>Monitor active trade</div>
        {data.action && (
          <div style={{ marginTop: '4px', fontStyle: 'italic' }}>
            Action: {data.action}
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

export default DuringPurchaseNode;
