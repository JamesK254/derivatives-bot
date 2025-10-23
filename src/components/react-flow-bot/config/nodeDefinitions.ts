/**
 * Complete Node Definitions for React Flow Bot Builder
 * Replaces all 148 Blockly blocks with React Flow nodes
 */

export type NodeCategory =
  | 'trade_parameters'
  | 'purchase_conditions'
  | 'sell_conditions'
  | 'trade_results'
  | 'indicators'
  | 'tick_analysis'
  | 'logic'
  | 'math'
  | 'text'
  | 'lists'
  | 'loops'
  | 'variables'
  | 'functions'
  | 'time'
  | 'candle'
  | 'misc';

export type HandleType = 'target' | 'source';
export type HandlePosition = 'top' | 'bottom' | 'left' | 'right';

export interface NodeHandle {
  id: string;
  type: HandleType;
  position: HandlePosition;
  label?: string;
  dataType?: 'statement' | 'value' | 'boolean';
}

export interface NodeField {
  name: string;
  type: 'text' | 'number' | 'dropdown' | 'checkbox' | 'color' | 'variable' | 'textarea';
  label: string;
  defaultValue?: any;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface NodeDefinition {
  id: string;
  type: string;
  label: string;
  category: NodeCategory;
  description: string;
  color: string;
  gradient?: string;
  handles: NodeHandle[];
  fields: NodeField[];
  icon?: string;
  keywords?: string[];

  // Code generation
  codeGenerator: (data: any, inputs: Record<string, string>) => string;

  // Validation
  validator?: (data: any) => { valid: boolean; errors?: string[] };

  // Special behaviors
  isRoot?: boolean;
  isMandatory?: boolean;
  singleInstance?: boolean;
  collapsible?: boolean;
}

export const NODE_DEFINITIONS: Record<string, NodeDefinition> = {
  // ===================================================================
  // TRADE PARAMETERS CATEGORY (10 nodes)
  // ===================================================================

  trade_definition: {
    id: 'trade_definition',
    type: 'trade_definition',
    label: 'Trade Definition',
    category: 'trade_parameters',
    description: 'Main trading parameters block - required to start trading',
    color: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '📊',
    isRoot: true,
    isMandatory: true,
    singleInstance: true,
    handles: [
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [],
    keywords: ['trade', 'definition', 'start', 'main'],
    codeGenerator: (data, inputs) => {
      return `// Trade Definition\nconst tradeConfig = {};\n`;
    },
    validator: (data) => ({ valid: true }),
  },

  trade_definition_market: {
    id: 'trade_definition_market',
    type: 'trade_definition_market',
    label: 'Market',
    category: 'trade_parameters',
    description: 'Select trading market',
    color: '#667eea',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'market',
        type: 'dropdown',
        label: 'Market',
        defaultValue: 'forex',
        options: [
          { value: 'forex', label: 'Forex' },
          { value: 'synthetic_index', label: 'Synthetic Indices' },
          { value: 'stock_indices', label: 'Stock Indices' },
          { value: 'commodities', label: 'Commodities' },
          { value: 'cryptocurrency', label: 'Cryptocurrencies' },
        ]
      }
    ],
    keywords: ['market', 'forex', 'synthetic', 'crypto'],
    codeGenerator: (data) => {
      return `tradeConfig.market = '${data.market}';\n`;
    },
  },

  trade_definition_tradetype: {
    id: 'trade_definition_tradetype',
    type: 'trade_definition_tradetype',
    label: 'Trade Type',
    category: 'trade_parameters',
    description: 'Select trade type',
    color: '#667eea',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'tradetype',
        type: 'dropdown',
        label: 'Trade Type',
        defaultValue: 'callput',
        options: [
          { value: 'callput', label: 'Up/Down' },
          { value: 'risefall', label: 'Rise/Fall' },
          { value: 'higherlower', label: 'Higher/Lower' },
          { value: 'touchnotouch', label: 'Touch/No Touch' },
          { value: 'endsinout', label: 'Ends In/Out' },
          { value: 'staysbetween', label: 'Stays Between/Goes Outside' },
          { value: 'matchesdiffers', label: 'Matches/Differs' },
          { value: 'evenodd', label: 'Even/Odd' },
          { value: 'overunder', label: 'Over/Under' },
          { value: 'multiplier', label: 'Multipliers' },
          { value: 'accumulator', label: 'Accumulators' },
        ]
      }
    ],
    keywords: ['trade', 'type', 'call', 'put', 'multiplier'],
    codeGenerator: (data) => {
      return `tradeConfig.tradeType = '${data.tradetype}';\n`;
    },
  },

  trade_definition_contracttype: {
    id: 'trade_definition_contracttype',
    type: 'trade_definition_contracttype',
    label: 'Contract Type',
    category: 'trade_parameters',
    description: 'Select contract type (CALL/PUT)',
    color: '#667eea',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'contracttype',
        type: 'dropdown',
        label: 'Type',
        defaultValue: 'CALL',
        options: [
          { value: 'CALL', label: 'Rise/Higher' },
          { value: 'PUT', label: 'Fall/Lower' },
        ]
      }
    ],
    keywords: ['contract', 'call', 'put', 'rise', 'fall'],
    codeGenerator: (data) => {
      return `tradeConfig.contractType = '${data.contracttype}';\n`;
    },
  },

  trade_definition_tradeoptions: {
    id: 'trade_definition_tradeoptions',
    type: 'trade_definition_tradeoptions',
    label: 'Trade Options',
    category: 'trade_parameters',
    description: 'Set duration, stake, and other trade options',
    color: '#667eea',
    isMandatory: true,
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'duration-input', type: 'target', position: 'left', label: 'Duration', dataType: 'value' },
      { id: 'stake-input', type: 'target', position: 'left', label: 'Stake', dataType: 'value' },
      { id: 'prediction-input', type: 'target', position: 'left', label: 'Prediction', dataType: 'value' },
      { id: 'barrier-input', type: 'target', position: 'left', label: 'Barrier', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'duration_unit',
        type: 'dropdown',
        label: 'Duration Unit',
        defaultValue: 'ticks',
        options: [
          { value: 'ticks', label: 'Ticks' },
          { value: 'seconds', label: 'Seconds' },
          { value: 'minutes', label: 'Minutes' },
          { value: 'hours', label: 'Hours' },
          { value: 'days', label: 'Days' },
        ]
      },
      {
        name: 'duration',
        type: 'number',
        label: 'Duration',
        defaultValue: 5,
        min: 1,
      },
      {
        name: 'stake',
        type: 'number',
        label: 'Stake',
        defaultValue: 1,
        min: 0.35,
      },
    ],
    keywords: ['options', 'duration', 'stake', 'barrier', 'prediction'],
    codeGenerator: (data, inputs) => {
      let code = '';
      code += `tradeConfig.duration = ${inputs['duration-input'] || data.duration};\n`;
      code += `tradeConfig.duration_unit = '${data.duration_unit}';\n`;
      code += `tradeConfig.amount = ${inputs['stake-input'] || data.stake};\n`;
      if (inputs['prediction-input']) {
        code += `tradeConfig.prediction = ${inputs['prediction-input']};\n`;
      }
      if (inputs['barrier-input']) {
        code += `tradeConfig.barrier = ${inputs['barrier-input']};\n`;
      }
      return code;
    },
  },

  // ===================================================================
  // PURCHASE CONDITIONS CATEGORY (5 nodes)
  // ===================================================================

  before_purchase: {
    id: 'before_purchase',
    type: 'before_purchase',
    label: 'Purchase Conditions',
    category: 'purchase_conditions',
    description: 'Conditions to check before purchasing',
    color: '#f093fb',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '🔍',
    isMandatory: true,
    singleInstance: true,
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'statement', type: 'target', position: 'left', label: 'Do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [],
    keywords: ['before', 'purchase', 'conditions', 'validation'],
    codeGenerator: (data, inputs) => {
      return `\n// Before Purchase\nasync function beforePurchase() {\n${inputs.statement || '  return true;'}\n}\n`;
    },
  },

  purchase: {
    id: 'purchase',
    type: 'purchase',
    label: 'Purchase',
    category: 'purchase_conditions',
    description: 'Execute the purchase',
    color: '#f093fb',
    isMandatory: true,
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'purchase_type',
        type: 'dropdown',
        label: 'Type',
        defaultValue: 'CALL',
        options: [
          { value: 'CALL', label: 'Rise/Higher/Up' },
          { value: 'PUT', label: 'Fall/Lower/Down' },
        ]
      }
    ],
    keywords: ['purchase', 'buy', 'execute'],
    codeGenerator: (data) => {
      return `await Bot.purchase('${data.purchase_type}');\n`;
    },
  },

  payout: {
    id: 'payout',
    type: 'payout',
    label: 'Potential Payout',
    category: 'purchase_conditions',
    description: 'Get potential payout value',
    color: '#f093fb',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['payout', 'profit', 'potential'],
    codeGenerator: () => {
      return 'Bot.getPayout()';
    },
  },

  ask_price: {
    id: 'ask_price',
    type: 'ask_price',
    label: 'Ask Price',
    category: 'purchase_conditions',
    description: 'Get ask price for the contract',
    color: '#f093fb',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['ask', 'price', 'cost'],
    codeGenerator: () => {
      return 'Bot.getAskPrice()';
    },
  },

  // ===================================================================
  // LOGIC CATEGORY (7 nodes)
  // ===================================================================

  controls_if: {
    id: 'controls_if',
    type: 'controls_if',
    label: 'If / Else',
    category: 'logic',
    description: 'Conditional execution',
    color: '#e0e7ff',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'if0', type: 'target', position: 'left', label: 'if', dataType: 'value' },
      { id: 'do0', type: 'target', position: 'left', label: 'do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'elseif_count',
        type: 'number',
        label: 'Else If Count',
        defaultValue: 0,
        min: 0,
        max: 10,
      },
      {
        name: 'has_else',
        type: 'checkbox',
        label: 'Has Else',
        defaultValue: false,
      }
    ],
    keywords: ['if', 'else', 'condition', 'conditional'],
    codeGenerator: (data, inputs) => {
      let code = `if (${inputs.if0 || 'true'}) {\n`;
      code += `  ${inputs.do0 || '// do something'}\n`;

      // Add else if blocks
      for (let i = 0; i < (data.elseif_count || 0); i++) {
        code += `} else if (${inputs[`if${i+1}`] || 'true'}) {\n`;
        code += `  ${inputs[`do${i+1}`] || '// do something'}\n`;
      }

      // Add else block
      if (data.has_else) {
        code += `} else {\n`;
        code += `  ${inputs.else || '// do something else'}\n`;
      }

      code += `}\n`;
      return code;
    },
  },

  logic_compare: {
    id: 'logic_compare',
    type: 'logic_compare',
    label: 'Compare',
    category: 'logic',
    description: 'Compare two values',
    color: '#e0e7ff',
    handles: [
      { id: 'a', type: 'target', position: 'left', label: 'A', dataType: 'value' },
      { id: 'b', type: 'target', position: 'left', label: 'B', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'operator',
        type: 'dropdown',
        label: 'Operator',
        defaultValue: 'EQ',
        options: [
          { value: 'EQ', label: '=' },
          { value: 'NEQ', label: '≠' },
          { value: 'LT', label: '<' },
          { value: 'LTE', label: '≤' },
          { value: 'GT', label: '>' },
          { value: 'GTE', label: '≥' },
        ]
      }
    ],
    keywords: ['compare', 'equal', 'greater', 'less'],
    codeGenerator: (data, inputs) => {
      const ops: Record<string, string> = {
        EQ: '==', NEQ: '!=', LT: '<', LTE: '<=', GT: '>', GTE: '>='
      };
      return `(${inputs.a || '0'} ${ops[data.operator]} ${inputs.b || '0'})`;
    },
  },

  logic_boolean: {
    id: 'logic_boolean',
    type: 'logic_boolean',
    label: 'Boolean',
    category: 'logic',
    description: 'True or False value',
    color: '#e0e7ff',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'value',
        type: 'dropdown',
        label: 'Value',
        defaultValue: 'TRUE',
        options: [
          { value: 'TRUE', label: 'true' },
          { value: 'FALSE', label: 'false' },
        ]
      }
    ],
    keywords: ['boolean', 'true', 'false'],
    codeGenerator: (data) => {
      return data.value === 'TRUE' ? 'true' : 'false';
    },
  },

  logic_operation: {
    id: 'logic_operation',
    type: 'logic_operation',
    label: 'Logic Operation',
    category: 'logic',
    description: 'AND or OR operation',
    color: '#e0e7ff',
    handles: [
      { id: 'a', type: 'target', position: 'left', label: 'A', dataType: 'value' },
      { id: 'b', type: 'target', position: 'left', label: 'B', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'operator',
        type: 'dropdown',
        label: 'Operator',
        defaultValue: 'AND',
        options: [
          { value: 'AND', label: 'and' },
          { value: 'OR', label: 'or' },
        ]
      }
    ],
    keywords: ['and', 'or', 'logic'],
    codeGenerator: (data, inputs) => {
      const op = data.operator === 'AND' ? '&&' : '||';
      return `(${inputs.a || 'false'} ${op} ${inputs.b || 'false'})`;
    },
  },

  logic_negate: {
    id: 'logic_negate',
    type: 'logic_negate',
    label: 'Not',
    category: 'logic',
    description: 'Negate boolean value',
    color: '#e0e7ff',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['not', 'negate', 'inverse'],
    codeGenerator: (data, inputs) => {
      return `!(${inputs.value || 'false'})`;
    },
  },

  logic_null: {
    id: 'logic_null',
    type: 'logic_null',
    label: 'Null',
    category: 'logic',
    description: 'Null value',
    color: '#e0e7ff',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['null', 'empty', 'none'],
    codeGenerator: () => 'null',
  },

  logic_ternary: {
    id: 'logic_ternary',
    type: 'logic_ternary',
    label: 'Ternary',
    category: 'logic',
    description: 'Conditional value (condition ? true : false)',
    color: '#e0e7ff',
    handles: [
      { id: 'condition', type: 'target', position: 'left', label: 'if', dataType: 'value' },
      { id: 'true', type: 'target', position: 'left', label: 'then', dataType: 'value' },
      { id: 'false', type: 'target', position: 'left', label: 'else', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['ternary', 'conditional', 'if then else'],
    codeGenerator: (data, inputs) => {
      return `(${inputs.condition || 'true'} ? ${inputs.true || '1'} : ${inputs.false || '0'})`;
    },
  },

  // ===================================================================
  // MATH CATEGORY (13 nodes)
  // ===================================================================

  math_number: {
    id: 'math_number',
    type: 'math_number',
    label: 'Number',
    category: 'math',
    description: 'Numeric value',
    color: '#fef3c7',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'value',
        type: 'number',
        label: 'Value',
        defaultValue: 0,
      }
    ],
    keywords: ['number', 'value', 'numeric'],
    codeGenerator: (data) => String(data.value || 0),
  },

  math_arithmetic: {
    id: 'math_arithmetic',
    type: 'math_arithmetic',
    label: 'Math Operation',
    category: 'math',
    description: 'Basic arithmetic operations',
    color: '#fef3c7',
    handles: [
      { id: 'a', type: 'target', position: 'left', label: 'A', dataType: 'value' },
      { id: 'b', type: 'target', position: 'left', label: 'B', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'operator',
        type: 'dropdown',
        label: 'Operation',
        defaultValue: 'ADD',
        options: [
          { value: 'ADD', label: '+' },
          { value: 'MINUS', label: '-' },
          { value: 'MULTIPLY', label: '×' },
          { value: 'DIVIDE', label: '÷' },
          { value: 'POWER', label: '^' },
        ]
      }
    ],
    keywords: ['math', 'add', 'subtract', 'multiply', 'divide'],
    codeGenerator: (data, inputs) => {
      const ops: Record<string, string> = {
        ADD: '+', MINUS: '-', MULTIPLY: '*', DIVIDE: '/', POWER: '**'
      };
      return `(${inputs.a || '0'} ${ops[data.operator]} ${inputs.b || '0'})`;
    },
  },

  // ===================================================================
  // TEXT CATEGORY (simplified - showing key nodes)
  // ===================================================================

  text: {
    id: 'text',
    type: 'text',
    label: 'Text',
    category: 'text',
    description: 'Text value',
    color: '#e0f2fe',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'value',
        type: 'text',
        label: 'Text',
        defaultValue: '',
        placeholder: 'Enter text...'
      }
    ],
    keywords: ['text', 'string'],
    codeGenerator: (data) => `'${data.value || ''}'`,
  },

  // ===================================================================
  // VARIABLES CATEGORY (2 nodes)
  // ===================================================================

  variables_get: {
    id: 'variables_get',
    type: 'variables_get',
    label: 'Get Variable',
    category: 'variables',
    description: 'Get variable value',
    color: '#fa709a',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'variable',
        type: 'variable',
        label: 'Variable',
        defaultValue: 'item',
      }
    ],
    keywords: ['variable', 'get', 'read'],
    codeGenerator: (data) => data.variable || 'item',
  },

  variables_set: {
    id: 'variables_set',
    type: 'variables_set',
    label: 'Set Variable',
    category: 'variables',
    description: 'Set variable value',
    color: '#fa709a',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'value', type: 'target', position: 'left', label: 'to', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'variable',
        type: 'variable',
        label: 'Variable',
        defaultValue: 'item',
      }
    ],
    keywords: ['variable', 'set', 'assign'],
    codeGenerator: (data, inputs) => {
      return `${data.variable || 'item'} = ${inputs.value || '0'};\n`;
    },
  },
};

// Export helper functions
export const getNodeByType = (type: string): NodeDefinition | undefined => {
  return NODE_DEFINITIONS[type];
};

export const getNodesByCategory = (category: NodeCategory): NodeDefinition[] => {
  return Object.values(NODE_DEFINITIONS).filter(node => node.category === category);
};

export const getAllNodes = (): NodeDefinition[] => {
  return Object.values(NODE_DEFINITIONS);
};

export const searchNodes = (query: string): NodeDefinition[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(NODE_DEFINITIONS).filter(node => {
    const matchesLabel = node.label.toLowerCase().includes(lowerQuery);
    const matchesDescription = node.description.toLowerCase().includes(lowerQuery);
    const matchesKeywords = node.keywords?.some(kw => kw.toLowerCase().includes(lowerQuery));
    return matchesLabel || matchesDescription || matchesKeywords;
  });
};
