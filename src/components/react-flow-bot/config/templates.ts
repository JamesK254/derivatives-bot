/**
 * Strategy Templates
 * Pre-built trading strategies for quick start
 */

import { Node, Edge } from 'reactflow';

export interface StrategyTemplate {
  id: string;
  name: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  nodes: Node[];
  edges: Edge[];
  tags: string[];
}

export const STRATEGY_TEMPLATES: StrategyTemplate[] = [
  {
    id: 'simple-rise-fall',
    name: 'Simple Rise/Fall',
    description: 'Basic strategy that buys Rise when last 3 ticks are rising',
    category: 'beginner',
    tags: ['rise', 'fall', 'simple', 'tick-analysis'],
    nodes: [
      {
        id: 'node-1',
        type: 'trade_definition',
        position: { x: 250, y: 50 },
        data: {
          definition: {
            id: 'trade_definition',
            type: 'trade_definition',
            label: 'Trade Definition',
            category: 'trade_parameters',
          },
          trade_type: 'rise_fall',
          symbol: 'frxEURUSD',
        },
      },
      {
        id: 'node-2',
        type: 'before_purchase',
        position: { x: 250, y: 180 },
        data: {
          definition: {
            id: 'before_purchase',
            type: 'before_purchase',
            label: 'Before Purchase',
            category: 'purchase_conditions',
          },
        },
      },
      {
        id: 'node-3',
        type: 'check_rising',
        position: { x: 100, y: 320 },
        data: {
          definition: {
            id: 'check_rising',
            type: 'check_rising',
            label: 'Check Rising',
            category: 'tick_analysis',
          },
          count: 3,
        },
      },
      {
        id: 'node-4',
        type: 'controls_if',
        position: { x: 250, y: 320 },
        data: {
          definition: {
            id: 'controls_if',
            type: 'controls_if',
            label: 'If',
            category: 'logic',
          },
        },
      },
      {
        id: 'node-5',
        type: 'purchase',
        position: { x: 400, y: 320 },
        data: {
          definition: {
            id: 'purchase',
            type: 'purchase',
            label: 'Purchase',
            category: 'purchase_conditions',
          },
          purchase_type: 'CALL',
        },
      },
      {
        id: 'node-6',
        type: 'trade_again',
        position: { x: 250, y: 480 },
        data: {
          definition: {
            id: 'trade_again',
            type: 'trade_again',
            label: 'Trade Again',
            category: 'trade_results',
          },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e2-4', source: 'node-2', target: 'node-4', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e3-4', source: 'node-3', target: 'node-4', sourceHandle: 'output', targetHandle: 'condition' },
      { id: 'e4-5', source: 'node-4', target: 'node-5', sourceHandle: 'do', targetHandle: 'input' },
      { id: 'e5-6', source: 'node-5', target: 'node-6', sourceHandle: 'output', targetHandle: 'input' },
    ],
  },

  {
    id: 'martingale-basic',
    name: 'Martingale (Basic)',
    description: 'Classic Martingale strategy - doubles stake after loss',
    category: 'intermediate',
    tags: ['martingale', 'money-management', 'progressive'],
    nodes: [
      {
        id: 'node-1',
        type: 'trade_definition',
        position: { x: 250, y: 50 },
        data: {
          definition: {
            id: 'trade_definition',
            type: 'trade_definition',
            label: 'Trade Definition',
            category: 'trade_parameters',
          },
          trade_type: 'rise_fall',
          symbol: 'frxEURUSD',
          stake: 1,
        },
      },
      {
        id: 'node-2',
        type: 'variables_set',
        position: { x: 250, y: 180 },
        data: {
          definition: {
            id: 'variables_set',
            type: 'variables_set',
            label: 'Set Variable',
            category: 'variables',
          },
          var_name: 'stake',
          value: 1,
        },
      },
      {
        id: 'node-3',
        type: 'before_purchase',
        position: { x: 250, y: 280 },
        data: {
          definition: {
            id: 'before_purchase',
            type: 'before_purchase',
            label: 'Before Purchase',
            category: 'purchase_conditions',
          },
        },
      },
      {
        id: 'node-4',
        type: 'purchase',
        position: { x: 250, y: 380 },
        data: {
          definition: {
            id: 'purchase',
            type: 'purchase',
            label: 'Purchase',
            category: 'purchase_conditions',
          },
          purchase_type: 'CALL',
        },
      },
      {
        id: 'node-5',
        type: 'after_purchase',
        position: { x: 250, y: 480 },
        data: {
          definition: {
            id: 'after_purchase',
            type: 'after_purchase',
            label: 'After Purchase',
            category: 'trade_results',
          },
        },
      },
      {
        id: 'node-6',
        type: 'check_result',
        position: { x: 100, y: 580 },
        data: {
          definition: {
            id: 'check_result',
            type: 'check_result',
            label: 'Check Result',
            category: 'trade_results',
          },
          result_type: 'win',
        },
      },
      {
        id: 'node-7',
        type: 'controls_if',
        position: { x: 250, y: 580 },
        data: {
          definition: {
            id: 'controls_if',
            type: 'controls_if',
            label: 'If',
            category: 'logic',
          },
        },
      },
      {
        id: 'node-8',
        type: 'variables_set',
        position: { x: 400, y: 620 },
        data: {
          definition: {
            id: 'variables_set',
            type: 'variables_set',
            label: 'Reset Stake',
            category: 'variables',
          },
          var_name: 'stake',
          value: 1,
        },
      },
      {
        id: 'node-9',
        type: 'math_arithmetic',
        position: { x: 100, y: 720 },
        data: {
          definition: {
            id: 'math_arithmetic',
            type: 'math_arithmetic',
            label: 'Multiply',
            category: 'math',
          },
          operator: 'multiply',
        },
      },
      {
        id: 'node-10',
        type: 'variables_set',
        position: { x: 250, y: 720 },
        data: {
          definition: {
            id: 'variables_set',
            type: 'variables_set',
            label: 'Double Stake',
            category: 'variables',
          },
          var_name: 'stake',
        },
      },
      {
        id: 'node-11',
        type: 'trade_again',
        position: { x: 250, y: 820 },
        data: {
          definition: {
            id: 'trade_again',
            type: 'trade_again',
            label: 'Trade Again',
            category: 'trade_results',
          },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e2-3', source: 'node-2', target: 'node-3', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e3-4', source: 'node-3', target: 'node-4', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e4-5', source: 'node-4', target: 'node-5', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e5-7', source: 'node-5', target: 'node-7', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e6-7', source: 'node-6', target: 'node-7', sourceHandle: 'output', targetHandle: 'condition' },
      { id: 'e7-8', source: 'node-7', target: 'node-8', sourceHandle: 'do', targetHandle: 'input' },
      { id: 'e7-10', source: 'node-7', target: 'node-10', sourceHandle: 'else', targetHandle: 'input' },
      { id: 'e9-10', source: 'node-9', target: 'node-10', sourceHandle: 'output', targetHandle: 'value' },
      { id: 'e8-11', source: 'node-8', target: 'node-11', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e10-11', source: 'node-10', target: 'node-11', sourceHandle: 'output', targetHandle: 'input' },
    ],
  },

  {
    id: 'sma-crossover',
    name: 'SMA Crossover',
    description: 'Buy when fast SMA crosses above slow SMA',
    category: 'intermediate',
    tags: ['sma', 'moving-average', 'crossover', 'indicators'],
    nodes: [
      {
        id: 'node-1',
        type: 'trade_definition',
        position: { x: 250, y: 50 },
        data: {
          definition: {
            id: 'trade_definition',
            type: 'trade_definition',
            label: 'Trade Definition',
            category: 'trade_parameters',
          },
          trade_type: 'rise_fall',
          symbol: 'frxEURUSD',
        },
      },
      {
        id: 'node-2',
        type: 'before_purchase',
        position: { x: 250, y: 180 },
        data: {
          definition: {
            id: 'before_purchase',
            type: 'before_purchase',
            label: 'Before Purchase',
            category: 'purchase_conditions',
          },
        },
      },
      {
        id: 'node-3',
        type: 'sma',
        position: { x: 50, y: 320 },
        data: {
          definition: {
            id: 'sma',
            type: 'sma',
            label: 'Fast SMA',
            category: 'indicators',
          },
          period: 10,
          field: 'close',
        },
      },
      {
        id: 'node-4',
        type: 'sma',
        position: { x: 200, y: 320 },
        data: {
          definition: {
            id: 'sma',
            type: 'sma',
            label: 'Slow SMA',
            category: 'indicators',
          },
          period: 20,
          field: 'close',
        },
      },
      {
        id: 'node-5',
        type: 'logic_compare',
        position: { x: 350, y: 320 },
        data: {
          definition: {
            id: 'logic_compare',
            type: 'logic_compare',
            label: 'Compare',
            category: 'logic',
          },
          operator: 'GT',
        },
      },
      {
        id: 'node-6',
        type: 'controls_if',
        position: { x: 250, y: 420 },
        data: {
          definition: {
            id: 'controls_if',
            type: 'controls_if',
            label: 'If',
            category: 'logic',
          },
        },
      },
      {
        id: 'node-7',
        type: 'purchase',
        position: { x: 400, y: 460 },
        data: {
          definition: {
            id: 'purchase',
            type: 'purchase',
            label: 'Purchase',
            category: 'purchase_conditions',
          },
          purchase_type: 'CALL',
        },
      },
      {
        id: 'node-8',
        type: 'trade_again',
        position: { x: 250, y: 580 },
        data: {
          definition: {
            id: 'trade_again',
            type: 'trade_again',
            label: 'Trade Again',
            category: 'trade_results',
          },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e2-6', source: 'node-2', target: 'node-6', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e3-5', source: 'node-3', target: 'node-5', sourceHandle: 'output', targetHandle: 'a' },
      { id: 'e4-5', source: 'node-4', target: 'node-5', sourceHandle: 'output', targetHandle: 'b' },
      { id: 'e5-6', source: 'node-5', target: 'node-6', sourceHandle: 'output', targetHandle: 'condition' },
      { id: 'e6-7', source: 'node-6', target: 'node-7', sourceHandle: 'do', targetHandle: 'input' },
      { id: 'e7-8', source: 'node-7', target: 'node-8', sourceHandle: 'output', targetHandle: 'input' },
    ],
  },

  {
    id: 'rsi-strategy',
    name: 'RSI Overbought/Oversold',
    description: 'Buy when RSI < 30 (oversold), Sell when RSI > 70 (overbought)',
    category: 'intermediate',
    tags: ['rsi', 'oscillator', 'overbought', 'oversold'],
    nodes: [
      {
        id: 'node-1',
        type: 'trade_definition',
        position: { x: 250, y: 50 },
        data: {
          definition: {
            id: 'trade_definition',
            type: 'trade_definition',
            label: 'Trade Definition',
            category: 'trade_parameters',
          },
          trade_type: 'rise_fall',
          symbol: 'frxEURUSD',
        },
      },
      {
        id: 'node-2',
        type: 'before_purchase',
        position: { x: 250, y: 180 },
        data: {
          definition: {
            id: 'before_purchase',
            type: 'before_purchase',
            label: 'Before Purchase',
            category: 'purchase_conditions',
          },
        },
      },
      {
        id: 'node-3',
        type: 'rsi',
        position: { x: 50, y: 320 },
        data: {
          definition: {
            id: 'rsi',
            type: 'rsi',
            label: 'RSI',
            category: 'indicators',
          },
          period: 14,
        },
      },
      {
        id: 'node-4',
        type: 'logic_compare',
        position: { x: 150, y: 420 },
        data: {
          definition: {
            id: 'logic_compare',
            type: 'logic_compare',
            label: 'RSI < 30',
            category: 'logic',
          },
          operator: 'LT',
        },
      },
      {
        id: 'node-5',
        type: 'math_number',
        position: { x: 50, y: 500 },
        data: {
          definition: {
            id: 'math_number',
            type: 'math_number',
            label: 'Number',
            category: 'math',
          },
          value: 30,
        },
      },
      {
        id: 'node-6',
        type: 'controls_if',
        position: { x: 250, y: 520 },
        data: {
          definition: {
            id: 'controls_if',
            type: 'controls_if',
            label: 'If Oversold',
            category: 'logic',
          },
        },
      },
      {
        id: 'node-7',
        type: 'purchase',
        position: { x: 400, y: 560 },
        data: {
          definition: {
            id: 'purchase',
            type: 'purchase',
            label: 'Purchase',
            category: 'purchase_conditions',
          },
          purchase_type: 'CALL',
        },
      },
      {
        id: 'node-8',
        type: 'trade_again',
        position: { x: 250, y: 680 },
        data: {
          definition: {
            id: 'trade_again',
            type: 'trade_again',
            label: 'Trade Again',
            category: 'trade_results',
          },
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e2-6', source: 'node-2', target: 'node-6', sourceHandle: 'output', targetHandle: 'input' },
      { id: 'e3-4', source: 'node-3', target: 'node-4', sourceHandle: 'output', targetHandle: 'a' },
      { id: 'e5-4', source: 'node-5', target: 'node-4', sourceHandle: 'output', targetHandle: 'b' },
      { id: 'e4-6', source: 'node-4', target: 'node-6', sourceHandle: 'output', targetHandle: 'condition' },
      { id: 'e6-7', source: 'node-6', target: 'node-7', sourceHandle: 'do', targetHandle: 'input' },
      { id: 'e7-8', source: 'node-7', target: 'node-8', sourceHandle: 'output', targetHandle: 'input' },
    ],
  },

  {
    id: 'empty',
    name: 'Empty Workspace',
    description: 'Start with a blank canvas',
    category: 'beginner',
    tags: ['empty', 'blank', 'start'],
    nodes: [],
    edges: [],
  },
];

// Helper functions
export const getTemplateById = (id: string): StrategyTemplate | undefined => {
  return STRATEGY_TEMPLATES.find((template) => template.id === id);
};

export const getTemplatesByCategory = (category: 'beginner' | 'intermediate' | 'advanced'): StrategyTemplate[] => {
  return STRATEGY_TEMPLATES.filter((template) => template.category === category);
};

export const searchTemplates = (query: string): StrategyTemplate[] => {
  const lowerQuery = query.toLowerCase();
  return STRATEGY_TEMPLATES.filter((template) => {
    const matchesName = template.name.toLowerCase().includes(lowerQuery);
    const matchesDescription = template.description.toLowerCase().includes(lowerQuery);
    const matchesTags = template.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
    return matchesName || matchesDescription || matchesTags;
  });
};
