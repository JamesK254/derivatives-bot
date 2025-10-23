import { Node, Edge } from 'reactflow';

// Trading Node Types - Similar to Blockly blocks
export type TradingNodeType =
  | 'tradeDefinition'
  | 'beforePurchase'
  | 'duringPurchase'
  | 'afterPurchase'
  | 'condition'
  | 'action'
  | 'variable'
  | 'calculation'
  | 'notification';

// Trading Node Data
export interface TradingNodeData {
  label: string;
  type: TradingNodeType;
  config?: Record<string, any>;
  // Specific configurations based on node type
  tradeType?: 'CALL' | 'PUT' | 'DIGITEVEN' | 'DIGITODD';
  market?: string;
  symbol?: string;
  stake?: number;
  duration?: number;
  durationType?: 'ticks' | 'seconds' | 'minutes';
  condition?: string;
  action?: string;
  variableName?: string;
  variableValue?: any;
  calculationExpression?: string;
  notificationMessage?: string;
  notificationType?: 'telegram' | 'email' | 'toast';
}

// Custom Node Type
export type TradingNode = Node<TradingNodeData>;

// Strategy Flow
export interface TradingStrategy {
  id: string;
  name: string;
  description?: string;
  nodes: TradingNode[];
  edges: Edge[];
  createdAt: Date;
  updatedAt: Date;
}

// Code Generation Result
export interface GeneratedCode {
  javascript: string;
  blocklyEquivalent?: string;
  ast?: any;
}

// Execution Context
export interface TradingContext {
  balance: number;
  profit: number;
  totalRuns: number;
  variables: Record<string, any>;
}
