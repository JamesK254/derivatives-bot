/**
 * Workspace Wrapper - React Flow Version
 * Replaces Blockly workspace with React Flow
 */

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { ReactFlowBotBuilder } from '@/components/react-flow-bot';
import { Node, Edge } from 'reactflow';
import Toolbar from './toolbar';
import StopBotModal from '../dashboard/stop-bot-modal';
import './workspace.scss';

const WorkspaceWrapperReactFlow = observer(() => {
  const { blockly_store, run_panel } = useStore();
  const { is_loading } = blockly_store;
  const [nodes, setNodes] = React.useState<Node[]>([]);
  const [edges, setEdges] = React.useState<Edge[]>([]);

  // Initialize with default nodes (trade_definition as starting point)
  React.useEffect(() => {
    // TODO: Load saved strategy from storage
    // For now, start with empty workspace
  }, []);

  const handleCodeGenerate = React.useCallback((code: string) => {
    // Store generated code for execution
    console.log('Generated code:', code);

    // TODO: Pass this to the execution engine
    // window.Blockly?.JavaScript?.workspaceToCode replacement
  }, []);

  const handleSave = React.useCallback((savedNodes: Node[], savedEdges: Edge[]) => {
    // Save strategy
    console.log('Saving strategy:', savedNodes, savedEdges);

    // TODO: Implement save logic
    // Similar to current save modal functionality
  }, []);

  if (is_loading) return null;

  return (
    <React.Fragment>
      <div className="workspace-wrapper-reactflow" style={{ width: '100%', height: '100%' }}>
        <ReactFlowBotBuilder
          initialNodes={nodes}
          initialEdges={edges}
          onCodeGenerate={handleCodeGenerate}
          onSave={handleSave}
          readOnly={false}
        />
      </div>
      <Toolbar />
      <StopBotModal />
    </React.Fragment>
  );
});

export default WorkspaceWrapperReactFlow;
