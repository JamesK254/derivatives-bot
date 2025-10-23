import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from '../nodes';
import { TradingNodeData } from '../types/trading.types';
import { generateCode } from '../utils/codeGenerator';

const initialNodes: Node<TradingNodeData>[] = [
  {
    id: '1',
    type: 'tradeDefinition',
    position: { x: 250, y: 50 },
    data: {
      label: 'Trade Definition',
      type: 'tradeDefinition',
      tradeType: 'CALL',
      market: 'forex',
      symbol: 'frxEURUSD',
      stake: 1,
      duration: 5,
      durationType: 'ticks',
    },
  },
  {
    id: '2',
    type: 'beforePurchase',
    position: { x: 250, y: 200 },
    data: {
      label: 'Before Purchase',
      type: 'beforePurchase',
      condition: 'balance > 10',
    },
  },
  {
    id: '3',
    type: 'duringPurchase',
    position: { x: 250, y: 350 },
    data: {
      label: 'During Purchase',
      type: 'duringPurchase',
      action: 'console.log("Trade active")',
    },
  },
  {
    id: '4',
    type: 'afterPurchase',
    position: { x: 250, y: 500 },
    data: {
      label: 'After Purchase',
      type: 'afterPurchase',
      action: 'this.updateStats()',
      notificationMessage: 'Trade completed!',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
];

const TradingFlow: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [showCode, setShowCode] = useState(false);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleGenerateCode = () => {
    const result = generateCode(nodes, edges);
    setGeneratedCode(result.javascript);
    setShowCode(true);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trading-strategy.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveStrategy = () => {
    const strategy = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(strategy, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trading-strategy.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      {/* Main Flow Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
          />

          {/* Top Panel - Actions */}
          <Panel position="top-right" style={{ margin: 10 }}>
            <div style={{
              background: 'white',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
            }}>
              <button
                onClick={handleGenerateCode}
                style={{
                  padding: '8px 16px',
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                🔨 Generate Code
              </button>
              <button
                onClick={handleSaveStrategy}
                style={{
                  padding: '8px 16px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                💾 Save Strategy
              </button>
            </div>
          </Panel>

          {/* Bottom Panel - Info */}
          <Panel position="top-left" style={{ margin: 10 }}>
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              maxWidth: '300px',
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
                🤖 Trading Bot - React Flow POC
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                Drag nodes to rearrange. Connect nodes to create your trading strategy.
                Click "Generate Code" to see the executable JavaScript.
              </p>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Code Preview Panel */}
      {showCode && (
        <div style={{
          width: '500px',
          background: '#1e1e1e',
          color: '#d4d4d4',
          overflow: 'auto',
          padding: '20px',
          fontFamily: 'monospace',
          fontSize: '12px',
          position: 'relative',
        }}>
          <div style={{
            position: 'sticky',
            top: 0,
            background: '#1e1e1e',
            paddingBottom: '10px',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h3 style={{ margin: 0, color: '#4ade80' }}>Generated Code</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleDownloadCode}
                style={{
                  padding: '6px 12px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                📥 Download
              </button>
              <button
                onClick={() => setShowCode(false)}
                style={{
                  padding: '6px 12px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                ✕ Close
              </button>
            </div>
          </div>
          <pre style={{
            margin: '10px 0 0 0',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}>
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TradingFlow;
