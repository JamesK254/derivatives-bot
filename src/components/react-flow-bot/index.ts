/**
 * React Flow Bot Builder - Main Export
 * Complete replacement for Blockly
 */

export { default as ReactFlowBotBuilder } from './ReactFlowBotBuilder';
export { default as NodePalette } from './components/NodePalette';
export { default as PropertyEditor } from './components/PropertyEditor';
export { createNodeTypes, createNodeInstance } from './nodes/NodeFactory';
export { generateCode, validateFlow } from './utils/CodeGenerator';
export {
  NODE_DEFINITIONS,
  getNodeByType,
  getNodesByCategory,
  getAllNodes,
  searchNodes,
} from './config/nodeDefinitions';

export type {
  NodeDefinition,
  NodeCategory,
  NodeHandle,
  NodeField,
} from './config/nodeDefinitions';

export type { GeneratedCode } from './utils/CodeGenerator';
