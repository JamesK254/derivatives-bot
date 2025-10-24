/**
 * Final Node Definitions - Remaining critical nodes
 * Part of the Blockly to React Flow migration
 */

import { NodeDefinition } from './nodeDefinitions';

export const FINAL_NODE_DEFINITIONS: Record<string, NodeDefinition> = {
  // ============================================================================
  // ADDITIONAL VARIABLES (3 nodes)
  // ============================================================================

  variables_create: {
    id: 'variables_create',
    type: 'variables_create',
    label: 'Create Variable',
    category: 'variables',
    description: 'Create a new variable',
    color: '#fbbf24',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'value', type: 'target', position: 'left', label: 'Value', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      { name: 'var_name', type: 'text', label: 'Variable Name', defaultValue: 'myVar' },
      {
        name: 'var_type',
        type: 'dropdown',
        label: 'Type',
        defaultValue: 'let',
        options: [
          { value: 'let', label: 'Let' },
          { value: 'const', label: 'Const' },
          { value: 'var', label: 'Var' },
        ],
      },
    ],
    keywords: ['variable', 'create', 'declare'],
    codeGenerator: (data, inputs) => {
      const varName = data.var_name || 'myVar';
      const varType = data.var_type || 'let';
      const value = inputs.value || 'null';
      return `${varType} ${varName} = ${value};\n`;
    },
  },

  math_on_list: {
    id: 'math_on_list',
    type: 'math_on_list',
    label: 'Math on List',
    category: 'math',
    description: 'Perform mathematical operations on a list',
    color: '#bbf7d0',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'operation',
        type: 'dropdown',
        label: 'Operation',
        defaultValue: 'sum',
        options: [
          { value: 'sum', label: 'Sum' },
          { value: 'min', label: 'Min' },
          { value: 'max', label: 'Max' },
          { value: 'average', label: 'Average' },
          { value: 'median', label: 'Median' },
          { value: 'mode', label: 'Mode' },
          { value: 'std_dev', label: 'Standard Deviation' },
        ],
      },
    ],
    keywords: ['math', 'list', 'sum', 'average', 'min', 'max'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      const operation = data.operation || 'sum';

      switch (operation) {
        case 'sum':
          return `${list}.reduce((a, b) => a + b, 0)`;
        case 'min':
          return `Math.min(...${list})`;
        case 'max':
          return `Math.max(...${list})`;
        case 'average':
          return `${list}.reduce((a, b) => a + b, 0) / ${list}.length`;
        case 'median':
          return `(() => { const sorted = [...${list}].sort((a, b) => a - b); const mid = Math.floor(sorted.length / 2); return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2; })()`;
        case 'mode':
          return `(() => { const freq = {}; let maxFreq = 0; let mode; ${list}.forEach(v => { freq[v] = (freq[v] || 0) + 1; if (freq[v] > maxFreq) { maxFreq = freq[v]; mode = v; } }); return mode; })()`;
        case 'std_dev':
          return `(() => { const avg = ${list}.reduce((a, b) => a + b, 0) / ${list}.length; const variance = ${list}.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / ${list}.length; return Math.sqrt(variance); })()`;
        default:
          return `${list}.reduce((a, b) => a + b, 0)`;
      }
    },
  },

  // ============================================================================
  // ADDITIONAL TRADE BLOCKS (4 nodes)
  // ============================================================================

  trade_options: {
    id: 'trade_options',
    type: 'trade_options',
    label: 'Trade Options',
    category: 'trade_parameters',
    description: 'Additional trade options and settings',
    color: '#dbeafe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      { name: 'prediction', type: 'number', label: 'Prediction', defaultValue: 0 },
      { name: 'barrier', type: 'number', label: 'Barrier', defaultValue: 0 },
      { name: 'barrier2', type: 'number', label: 'Barrier 2', defaultValue: 0 },
    ],
    keywords: ['trade', 'options', 'prediction', 'barrier'],
    codeGenerator: (data) => {
      let code = '';
      if (data.prediction) code += `  prediction: ${data.prediction},\n`;
      if (data.barrier) code += `  barrier: ${data.barrier},\n`;
      if (data.barrier2) code += `  barrier2: ${data.barrier2},\n`;
      return code;
    },
  },

  market_dropdown: {
    id: 'market_dropdown',
    type: 'market_dropdown',
    label: 'Market Selector',
    category: 'trade_parameters',
    description: 'Select market for trading',
    color: '#dbeafe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'market',
        type: 'dropdown',
        label: 'Market',
        defaultValue: 'forex',
        options: [
          { value: 'forex', label: 'Forex' },
          { value: 'indices', label: 'Indices' },
          { value: 'commodities', label: 'Commodities' },
          { value: 'synthetic', label: 'Synthetic Indices' },
        ],
      },
    ],
    keywords: ['market', 'forex', 'indices', 'commodities'],
    codeGenerator: (data) => `'${data.market || 'forex'}'`,
  },

  submarket_dropdown: {
    id: 'submarket_dropdown',
    type: 'submarket_dropdown',
    label: 'Submarket Selector',
    category: 'trade_parameters',
    description: 'Select submarket for trading',
    color: '#dbeafe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'submarket',
        type: 'dropdown',
        label: 'Submarket',
        defaultValue: 'major_pairs',
        options: [
          { value: 'major_pairs', label: 'Major Pairs' },
          { value: 'minor_pairs', label: 'Minor Pairs' },
          { value: 'smart_fx', label: 'Smart FX' },
          { value: 'crash_boom', label: 'Crash/Boom' },
        ],
      },
    ],
    keywords: ['submarket', 'pairs'],
    codeGenerator: (data) => `'${data.submarket || 'major_pairs'}'`,
  },

  symbol_dropdown: {
    id: 'symbol_dropdown',
    type: 'symbol_dropdown',
    label: 'Symbol Selector',
    category: 'trade_parameters',
    description: 'Select trading symbol',
    color: '#dbeafe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'symbol', type: 'text', label: 'Symbol', defaultValue: 'frxEURUSD' },
    ],
    keywords: ['symbol', 'asset', 'pair'],
    codeGenerator: (data) => `'${data.symbol || 'frxEURUSD'}'`,
  },

  // ============================================================================
  // ADDITIONAL UTILITY BLOCKS (3 nodes)
  // ============================================================================

  color_picker: {
    id: 'color_picker',
    type: 'color_picker',
    label: 'Color',
    category: 'misc',
    description: 'Pick a color value',
    color: '#f3f4f6',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'color', type: 'color', label: 'Color', defaultValue: '#ff0000' },
    ],
    keywords: ['color', 'picker'],
    codeGenerator: (data) => `'${data.color || '#ff0000'}'`,
  },

  contract_check: {
    id: 'contract_check',
    type: 'contract_check',
    label: 'Contract Check',
    category: 'trade_results',
    description: 'Check contract status and properties',
    color: '#fce7f3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'boolean' },
    ],
    fields: [
      {
        name: 'check_type',
        type: 'dropdown',
        label: 'Check Type',
        defaultValue: 'is_finished',
        options: [
          { value: 'is_finished', label: 'Is Finished' },
          { value: 'is_won', label: 'Is Won' },
          { value: 'is_lost', label: 'Is Lost' },
          { value: 'is_sold', label: 'Is Sold' },
        ],
      },
    ],
    keywords: ['contract', 'check', 'status'],
    codeGenerator: (data) => {
      const checkType = data.check_type || 'is_finished';
      switch (checkType) {
        case 'is_finished':
          return `contract.is_finished`;
        case 'is_won':
          return `contract.profit > 0`;
        case 'is_lost':
          return `contract.profit < 0`;
        case 'is_sold':
          return `contract.is_sold`;
        default:
          return `contract.is_finished`;
      }
    },
  },

  timeout: {
    id: 'timeout',
    type: 'timeout',
    label: 'Timeout',
    category: 'misc',
    description: 'Wait for specified milliseconds',
    color: '#f3f4f6',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'duration', type: 'target', position: 'left', label: 'Duration (ms)', dataType: 'value' },
      { id: 'do', type: 'target', position: 'left', label: 'Do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      { name: 'duration', type: 'number', label: 'Duration (ms)', defaultValue: 1000 },
    ],
    keywords: ['timeout', 'wait', 'delay', 'sleep'],
    codeGenerator: (data, inputs) => {
      const duration = inputs.duration || data.duration || 1000;
      const doCode = inputs.do || '  // timeout callback';
      return `setTimeout(() => {\n${doCode}\n}, ${duration});\n`;
    },
  },
};
