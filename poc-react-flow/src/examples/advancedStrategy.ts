import { Node, Edge } from 'reactflow';
import { TradingNodeData } from '../types/trading.types';

/**
 * Advanced Trading Strategy Example
 * Demonstrates conditional logic and complex flows
 */
export const advancedStrategyNodes: Node<TradingNodeData>[] = [
  // Start: Trade Definition
  {
    id: 'trade-def-1',
    type: 'tradeDefinition',
    position: { x: 250, y: 50 },
    data: {
      label: 'Trade Definition',
      type: 'tradeDefinition',
      tradeType: 'CALL',
      market: 'forex',
      symbol: 'frxEURUSD',
      stake: 2,
      duration: 10,
      durationType: 'ticks',
    },
  },

  // Before Purchase with condition
  {
    id: 'before-1',
    type: 'beforePurchase',
    position: { x: 250, y: 200 },
    data: {
      label: 'Before Purchase',
      type: 'beforePurchase',
      condition: 'balance > 50 && totalRuns < 100',
    },
  },

  // Conditional check
  {
    id: 'condition-1',
    type: 'condition',
    position: { x: 250, y: 350 },
    data: {
      label: 'Check Balance',
      type: 'condition',
      condition: 'balance > 100',
    },
  },

  // High stake action (if balance > 100)
  {
    id: 'action-high-stake',
    type: 'action',
    position: { x: 450, y: 350 },
    data: {
      label: 'Increase Stake',
      type: 'action',
      action: 'this.setStake(5)',
    },
  },

  // Normal stake action (if balance <= 100)
  {
    id: 'action-normal-stake',
    type: 'action',
    position: { x: 50, y: 350 },
    data: {
      label: 'Keep Normal Stake',
      type: 'action',
      action: 'this.setStake(1)',
    },
  },

  // During Purchase
  {
    id: 'during-1',
    type: 'duringPurchase',
    position: { x: 250, y: 500 },
    data: {
      label: 'During Purchase',
      type: 'duringPurchase',
      action: 'this.monitorTicks()',
    },
  },

  // After Purchase
  {
    id: 'after-1',
    type: 'afterPurchase',
    position: { x: 250, y: 650 },
    data: {
      label: 'After Purchase',
      type: 'afterPurchase',
      action: 'this.updateStats()',
      notificationMessage: 'Trade completed successfully!',
    },
  },

  // Win/Loss condition check
  {
    id: 'condition-2',
    type: 'condition',
    position: { x: 250, y: 800 },
    data: {
      label: 'Trade Won?',
      type: 'condition',
      condition: 'contract.profit > 0',
    },
  },

  // Win notification
  {
    id: 'action-win',
    type: 'action',
    position: { x: 450, y: 800 },
    data: {
      label: 'Win Notification',
      type: 'action',
      action: 'this.notify("🎉 Trade Won!")',
    },
  },

  // Loss notification
  {
    id: 'action-loss',
    type: 'action',
    position: { x: 50, y: 800 },
    data: {
      label: 'Loss Handler',
      type: 'action',
      action: 'this.handleLoss()',
    },
  },
];

export const advancedStrategyEdges: Edge[] = [
  // Main flow
  { id: 'e1', source: 'trade-def-1', target: 'before-1', animated: true },
  { id: 'e2', source: 'before-1', target: 'condition-1', animated: true },

  // Conditional branches for stake
  { id: 'e3-true', source: 'condition-1', sourceHandle: 'true', target: 'action-high-stake', label: 'High Balance', animated: true },
  { id: 'e3-false', source: 'condition-1', sourceHandle: 'false', target: 'action-normal-stake', label: 'Low Balance', animated: true },

  // Merge back to during purchase
  { id: 'e4-high', source: 'action-high-stake', target: 'during-1', animated: true },
  { id: 'e4-normal', source: 'action-normal-stake', target: 'during-1', animated: true },

  // Continue to after purchase
  { id: 'e5', source: 'during-1', target: 'after-1', animated: true },

  // Check win/loss
  { id: 'e6', source: 'after-1', target: 'condition-2', animated: true },

  // Win/loss branches
  { id: 'e7-win', source: 'condition-2', sourceHandle: 'true', target: 'action-win', label: 'Win', animated: true, style: { stroke: '#22c55e' } },
  { id: 'e7-loss', source: 'condition-2', sourceHandle: 'false', target: 'action-loss', label: 'Loss', animated: true, style: { stroke: '#ef4444' } },
];

/**
 * Simple Martingale Strategy Example
 */
export const martingaleStrategyNodes: Node<TradingNodeData>[] = [
  {
    id: 'trade-1',
    type: 'tradeDefinition',
    position: { x: 300, y: 50 },
    data: {
      label: 'Martingale Trade',
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
    id: 'after-1',
    type: 'afterPurchase',
    position: { x: 300, y: 200 },
    data: {
      label: 'Check Result',
      type: 'afterPurchase',
      action: 'this.checkResult()',
    },
  },
  {
    id: 'condition-1',
    type: 'condition',
    position: { x: 300, y: 350 },
    data: {
      label: 'Lost?',
      type: 'condition',
      condition: 'contract.profit < 0',
    },
  },
  {
    id: 'action-double',
    type: 'action',
    position: { x: 500, y: 350 },
    data: {
      label: 'Double Stake',
      type: 'action',
      action: 'this.stake *= 2',
    },
  },
  {
    id: 'action-reset',
    type: 'action',
    position: { x: 100, y: 350 },
    data: {
      label: 'Reset Stake',
      type: 'action',
      action: 'this.stake = 1',
    },
  },
];

export const martingaleStrategyEdges: Edge[] = [
  { id: 'e1', source: 'trade-1', target: 'after-1', animated: true },
  { id: 'e2', source: 'after-1', target: 'condition-1', animated: true },
  { id: 'e3-loss', source: 'condition-1', sourceHandle: 'true', target: 'action-double', label: 'Loss - Double', animated: true },
  { id: 'e3-win', source: 'condition-1', sourceHandle: 'false', target: 'action-reset', label: 'Win - Reset', animated: true },
  // Loop back to start
  { id: 'e4-loop-double', source: 'action-double', target: 'trade-1', animated: true, type: 'smoothstep' },
  { id: 'e4-loop-reset', source: 'action-reset', target: 'trade-1', animated: true, type: 'smoothstep' },
];
