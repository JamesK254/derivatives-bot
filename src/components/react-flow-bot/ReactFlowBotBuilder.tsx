/**
 * React Flow Bot Builder - Main Editor Component
 * Replaces Blockly workspace entirely
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  OnNodesDelete,
  OnEdgesDelete,
  Panel,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { createNodeTypes, createNodeInstance } from './nodes/NodeFactory';
import NodePalette from './components/NodePalette';
import PropertyEditor from './components/PropertyEditor';
import { NODE_DEFINITIONS, NodeDefinition, getNodeByType } from './config/nodeDefinitions';
import { generateCode, validateFlow } from './utils/CodeGenerator';

import './ReactFlowBotBuilder.scss';

interface ReactFlowBotBuilderProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  onCodeGenerate?: (code: string) => void;
  onSave?: (nodes: Node[], edges: Edge[]) => void;
  readOnly?: boolean;
}

const ReactFlowBotBuilderInner: React.FC<ReactFlowBotBuilderProps> = ({
  initialNodes = [],
  initialEdges = [],
  onCodeGenerate,
  onSave,
  readOnly = false,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showPropertyEditor, setShowPropertyEditor] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isPaletteOpen, setIsPaletteOpen] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const nodeTypes = React.useMemo(() => createNodeTypes(NODE_DEFINITIONS), []);

  // Handle connection between nodes
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // Handle node click
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setShowPropertyEditor(true);
  }, []);

  // Handle node selection from palette
  const onNodeSelect = useCallback(
    (definition: NodeDefinition) => {
      // Check for single instance blocks
      if (definition.singleInstance) {
        const existing = nodes.find(n => n.type === definition.type);
        if (existing) {
          alert(`Only one "${definition.label}" block is allowed.`);
          return;
        }
      }

      // Create new node at center of viewport
      const position = reactFlowInstance
        ? reactFlowInstance.project({
            x: window.innerWidth / 2 - 100,
            y: window.innerHeight / 2 - 50,
          })
        : { x: 250, y: 100 };

      const newNode = createNodeInstance(definition, position);
      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, reactFlowInstance, setNodes]
  );

  // Handle drag and drop from palette
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const definitionData = event.dataTransfer.getData('application/reactflow-node');
      if (!definitionData) return;

      const definition: NodeDefinition = JSON.parse(definitionData);

      // Check for single instance blocks
      if (definition.singleInstance) {
        const existing = nodes.find(n => n.type === definition.type);
        if (existing) {
          alert(`Only one "${definition.label}" block is allowed.`);
          return;
        }
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = createNodeInstance(definition, position);
      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, reactFlowInstance, setNodes]
  );

  // Update node properties
  const onUpdateNode = useCallback(
    (nodeId: string, updates: Record<string, any>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...updates,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Handle code generation
  const handleGenerateCode = useCallback(() => {
    const result = generateCode(nodes, edges);

    setGeneratedCode(result.javascript);
    setValidationErrors(result.errors);

    if (result.errors.length > 0) {
      alert('Code generation failed. See errors in the code panel.');
    }

    setShowCodePanel(true);

    if (onCodeGenerate) {
      onCodeGenerate(result.javascript);
    }
  }, [nodes, edges, onCodeGenerate]);

  // Handle save
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(nodes, edges);
    }
  }, [nodes, edges, onSave]);

  // Handle validate
  const handleValidate = useCallback(() => {
    const result = validateFlow(nodes, edges);

    if (result.valid) {
      alert('✅ Flow is valid! No errors found.');
    } else {
      alert(`❌ Validation failed:\n\n${result.errors.join('\n')}`);
    }

    setValidationErrors(result.errors);
  }, [nodes, edges]);

  // Handle download code
  const handleDownloadCode = useCallback(() => {
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trading-strategy.js';
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedCode]);

  // Handle clear workspace
  const handleClear = useCallback(() => {
    if (confirm('Are you sure you want to clear the workspace? This cannot be undone.')) {
      setNodes([]);
      setEdges([]);
    }
  }, [setNodes, setEdges]);

  return (
    <div className="react-flow-bot-builder">
      {/* Node Palette */}
      {!readOnly && (
        <NodePalette
          onNodeSelect={onNodeSelect}
          isOpen={isPaletteOpen}
          onToggle={() => setIsPaletteOpen(!isPaletteOpen)}
        />
      )}

      {/* Main Canvas */}
      <div className="react-flow-bot-builder__canvas" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          deleteKeyCode={readOnly ? null : ['Backspace', 'Delete']}
          nodesDraggable={!readOnly}
          nodesConnectable={!readOnly}
          elementsSelectable={!readOnly}
        >
          <Background />
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />

          {/* Top Panel - Actions */}
          {!readOnly && (
            <Panel position="top-right" style={{ margin: 10 }}>
              <div className="react-flow-bot-builder__actions">
                <button onClick={handleValidate} className="btn btn--secondary" title="Validate flow">
                  ✓ Validate
                </button>
                <button onClick={handleGenerateCode} className="btn btn--primary" title="Generate code">
                  🔨 Generate Code
                </button>
                <button onClick={handleSave} className="btn btn--success" title="Save strategy">
                  💾 Save
                </button>
                <button onClick={handleClear} className="btn btn--danger" title="Clear workspace">
                  🗑️ Clear
                </button>
              </div>
            </Panel>
          )}

          {/* Info Panel */}
          <Panel position="top-left" style={{ margin: 10 }}>
            <div className="react-flow-bot-builder__info">
              <h3>🤖 Trading Bot Builder</h3>
              <p>
                {nodes.length} block{nodes.length !== 1 ? 's' : ''}, {edges.length} connection
                {edges.length !== 1 ? 's' : ''}
              </p>
              {validationErrors.length > 0 && (
                <div className="react-flow-bot-builder__validation-errors">
                  ⚠️ {validationErrors.length} error{validationErrors.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Code Panel */}
      {showCodePanel && (
        <div className="react-flow-bot-builder__code-panel">
          <div className="react-flow-bot-builder__code-header">
            <h3>Generated Code</h3>
            <div className="react-flow-bot-builder__code-actions">
              <button onClick={handleDownloadCode} className="btn btn--small btn--secondary">
                📥 Download
              </button>
              <button onClick={() => setShowCodePanel(false)} className="btn btn--small btn--danger">
                ✕ Close
              </button>
            </div>
          </div>

          {validationErrors.length > 0 && (
            <div className="react-flow-bot-builder__code-errors">
              <h4>❌ Errors:</h4>
              <ul>
                {validationErrors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <pre className="react-flow-bot-builder__code-content">{generatedCode}</pre>
        </div>
      )}

      {/* Property Editor */}
      {showPropertyEditor && selectedNode && (
        <PropertyEditor
          selectedNode={selectedNode}
          onUpdateNode={onUpdateNode}
          onClose={() => setShowPropertyEditor(false)}
          variables={[]} // TODO: Extract from nodes
        />
      )}
    </div>
  );
};

// Wrap with ReactFlowProvider
const ReactFlowBotBuilder: React.FC<ReactFlowBotBuilderProps> = (props) => (
  <ReactFlowProvider>
    <ReactFlowBotBuilderInner {...props} />
  </ReactFlowProvider>
);

export default ReactFlowBotBuilder;
