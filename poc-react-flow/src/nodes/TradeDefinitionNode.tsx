import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TradingNodeData } from '../types/trading.types';

const TradeDefinitionNode: React.FC<NodeProps<TradingNodeData>> = ({ data, isConnectable }) => {
  return (
    <div
      style={{
        padding: '15px 20px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: '2px solid #5a67d8',
        minWidth: '200px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
        📊 Trade Definition
      </div>

      <div style={{ fontSize: '12px', opacity: 0.9 }}>
        {data.tradeType && (
          <div>Type: <strong>{data.tradeType}</strong></div>
        )}
        {data.market && (
          <div>Market: <strong>{data.market}</strong></div>
        )}
        {data.symbol && (
          <div>Symbol: <strong>{data.symbol}</strong></div>
        )}
        {data.stake && (
          <div>Stake: <strong>${data.stake}</strong></div>
        )}
        {data.duration && (
          <div>Duration: <strong>{data.duration} {data.durationType}</strong></div>
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

export default TradeDefinitionNode;
