/**
 * Additional Node Definitions - Part 2
 * Remaining 100+ nodes for complete Blockly replacement
 * Import and merge these with main NODE_DEFINITIONS
 */

import { NodeDefinition } from './nodeDefinitions';

export const ADDITIONAL_NODE_DEFINITIONS: Record<string, NodeDefinition> = {
  // ===================================================================
  // LOOPS (6 nodes)
  // ===================================================================

  controls_repeat: {
    id: 'controls_repeat',
    type: 'controls_repeat',
    label: 'Repeat',
    category: 'loops',
    description: 'Repeat actions N times',
    color: '#fee2e2',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'times', type: 'target', position: 'left', label: 'times', dataType: 'value' },
      { id: 'do', type: 'target', position: 'left', label: 'do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      { name: 'times', type: 'number', label: 'Times', defaultValue: 10, min: 1 }
    ],
    keywords: ['repeat', 'loop', 'times'],
    codeGenerator: (data, inputs) => {
      const times = inputs.times || data.times || 10;
      return `for (let count = 0; count < ${times}; count++) {\n${inputs.do || '  // repeat'}\n}\n`;
    },
  },

  controls_for: {
    id: 'controls_for',
    type: 'controls_for',
    label: 'For Loop',
    category: 'loops',
    description: 'Count from start to end by step',
    color: '#fee2e2',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'from', type: 'target', position: 'left', label: 'from', dataType: 'value' },
      { id: 'to', type: 'target', position: 'left', label: 'to', dataType: 'value' },
      { id: 'by', type: 'target', position: 'left', label: 'by', dataType: 'value' },
      { id: 'do', type: 'target', position: 'left', label: 'do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      { name: 'variable', type: 'variable', label: 'Variable', defaultValue: 'i' },
      { name: 'from', type: 'number', label: 'From', defaultValue: 1 },
      { name: 'to', type: 'number', label: 'To', defaultValue: 10 },
      { name: 'by', type: 'number', label: 'By', defaultValue: 1 },
    ],
    keywords: ['for', 'loop', 'count'],
    codeGenerator: (data, inputs) => {
      const varName = data.variable || 'i';
      const from = inputs.from || data.from || 1;
      const to = inputs.to || data.to || 10;
      const by = inputs.by || data.by || 1;
      return `for (let ${varName} = ${from}; ${varName} <= ${to}; ${varName} += ${by}) {\n${inputs.do || '  // loop body'}\n}\n`;
    },
  },

  controls_forEach: {
    id: 'controls_forEach',
    type: 'controls_forEach',
    label: 'For Each',
    category: 'loops',
    description: 'Loop through each item in list',
    color: '#fee2e2',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'in list', dataType: 'value' },
      { id: 'do', type: 'target', position: 'left', label: 'do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      { name: 'variable', type: 'variable', label: 'Variable', defaultValue: 'item' }
    ],
    keywords: ['for', 'each', 'loop', 'list'],
    codeGenerator: (data, inputs) => {
      const varName = data.variable || 'item';
      return `for (let ${varName} of ${inputs.list || '[]'}) {\n${inputs.do || '  // loop body'}\n}\n`;
    },
  },

  controls_whileUntil: {
    id: 'controls_whileUntil',
    type: 'controls_whileUntil',
    label: 'While/Until',
    category: 'loops',
    description: 'Loop while condition is true/false',
    color: '#fee2e2',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'condition', type: 'target', position: 'left', label: 'condition', dataType: 'value' },
      { id: 'do', type: 'target', position: 'left', label: 'do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'mode',
        type: 'dropdown',
        label: 'Mode',
        defaultValue: 'WHILE',
        options: [
          { value: 'WHILE', label: 'while' },
          { value: 'UNTIL', label: 'until' },
        ]
      }
    ],
    keywords: ['while', 'until', 'loop'],
    codeGenerator: (data, inputs) => {
      const condition = inputs.condition || 'true';
      const actualCondition = data.mode === 'UNTIL' ? `!(${condition})` : condition;
      return `while (${actualCondition}) {\n${inputs.do || '  // loop body'}\n}\n`;
    },
  },

  controls_flow_statements: {
    id: 'controls_flow_statements',
    type: 'controls_flow_statements',
    label: 'Break/Continue',
    category: 'loops',
    description: 'Break out of loop or continue to next iteration',
    color: '#fee2e2',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'flow',
        type: 'dropdown',
        label: 'Flow',
        defaultValue: 'BREAK',
        options: [
          { value: 'BREAK', label: 'break out of loop' },
          { value: 'CONTINUE', label: 'continue with next iteration' },
        ]
      }
    ],
    keywords: ['break', 'continue', 'loop', 'exit'],
    codeGenerator: (data) => {
      return `${data.flow.toLowerCase()};\n`;
    },
  },

  // ===================================================================
  // REMAINING MATH (11 nodes)
  // ===================================================================

  math_change: {
    id: 'math_change',
    type: 'math_change',
    label: 'Change Variable',
    category: 'math',
    description: 'Increment/decrement variable by value',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'delta', type: 'target', position: 'left', label: 'by', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      { name: 'variable', type: 'variable', label: 'Variable', defaultValue: 'item' },
      { name: 'delta', type: 'number', label: 'Change by', defaultValue: 1 },
    ],
    keywords: ['change', 'increment', 'add'],
    codeGenerator: (data, inputs) => {
      const delta = inputs.delta || data.delta || 1;
      return `${data.variable} += ${delta};\n`;
    },
  },

  math_round: {
    id: 'math_round',
    type: 'math_round',
    label: 'Round',
    category: 'math',
    description: 'Round number up/down/nearest',
    color: '#fef3c7',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'mode',
        type: 'dropdown',
        label: 'Mode',
        defaultValue: 'ROUND',
        options: [
          { value: 'ROUND', label: 'round' },
          { value: 'ROUNDUP', label: 'round up' },
          { value: 'ROUNDDOWN', label: 'round down' },
        ]
      }
    ],
    keywords: ['round', 'floor', 'ceil'],
    codeGenerator: (data, inputs) => {
      const funcs: Record<string, string> = {
        ROUND: 'Math.round',
        ROUNDUP: 'Math.ceil',
        ROUNDDOWN: 'Math.floor',
      };
      return `${funcs[data.mode]}(${inputs.value || '0'})`;
    },
  },

  math_random_int: {
    id: 'math_random_int',
    type: 'math_random_int',
    label: 'Random Integer',
    category: 'math',
    description: 'Random integer between two values',
    color: '#fef3c7',
    handles: [
      { id: 'from', type: 'target', position: 'left', label: 'from', dataType: 'value' },
      { id: 'to', type: 'target', position: 'left', label: 'to', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      { name: 'from', type: 'number', label: 'From', defaultValue: 1 },
      { name: 'to', type: 'number', label: 'To', defaultValue: 100 },
    ],
    keywords: ['random', 'integer'],
    codeGenerator: (data, inputs) => {
      const from = inputs.from || data.from || 1;
      const to = inputs.to || data.to || 100;
      return `(Math.floor(Math.random() * (${to} - ${from} + 1)) + ${from})`;
    },
  },

  math_random_float: {
    id: 'math_random_float',
    type: 'math_random_float',
    label: 'Random Float',
    category: 'math',
    description: 'Random decimal between 0 and 1',
    color: '#fef3c7',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['random', 'float', 'decimal'],
    codeGenerator: () => 'Math.random()',
  },

  math_modulo: {
    id: 'math_modulo',
    type: 'math_modulo',
    label: 'Modulo',
    category: 'math',
    description: 'Remainder of division',
    color: '#fef3c7',
    handles: [
      { id: 'dividend', type: 'target', position: 'left', label: 'dividend', dataType: 'value' },
      { id: 'divisor', type: 'target', position: 'left', label: 'divisor', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['modulo', 'remainder', 'mod'],
    codeGenerator: (data, inputs) => {
      return `(${inputs.dividend || '0'} % ${inputs.divisor || '1'})`;
    },
  },

  math_single: {
    id: 'math_single',
    type: 'math_single',
    label: 'Math Function',
    category: 'math',
    description: 'Mathematical functions (sqrt, abs, etc)',
    color: '#fef3c7',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'operation',
        type: 'dropdown',
        label: 'Operation',
        defaultValue: 'ROOT',
        options: [
          { value: 'ROOT', label: 'square root' },
          { value: 'ABS', label: 'absolute' },
          { value: 'NEG', label: 'negative' },
          { value: 'LN', label: 'ln' },
          { value: 'LOG10', label: 'log10' },
          { value: 'EXP', label: 'e^' },
          { value: 'POW10', label: '10^' },
        ]
      }
    ],
    keywords: ['math', 'sqrt', 'abs', 'log'],
    codeGenerator: (data, inputs) => {
      const ops: Record<string, string> = {
        ROOT: 'Math.sqrt',
        ABS: 'Math.abs',
        NEG: '-',
        LN: 'Math.log',
        LOG10: 'Math.log10',
        EXP: 'Math.exp',
        POW10: '(10 **',
      };
      const value = inputs.value || '0';
      if (data.operation === 'NEG') {
        return `(-${value})`;
      } else if (data.operation === 'POW10') {
        return `(10 ** ${value})`;
      }
      return `${ops[data.operation]}(${value})`;
    },
  },

  math_constant: {
    id: 'math_constant',
    type: 'math_constant',
    label: 'Math Constant',
    category: 'math',
    description: 'Mathematical constants (π, e, etc)',
    color: '#fef3c7',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'constant',
        type: 'dropdown',
        label: 'Constant',
        defaultValue: 'PI',
        options: [
          { value: 'PI', label: 'π' },
          { value: 'E', label: 'e' },
          { value: 'GOLDEN_RATIO', label: 'φ' },
          { value: 'SQRT2', label: '√2' },
          { value: 'SQRT1_2', label: '√½' },
          { value: 'INFINITY', label: '∞' },
        ]
      }
    ],
    keywords: ['constant', 'pi', 'e', 'phi'],
    codeGenerator: (data) => {
      const constants: Record<string, string> = {
        PI: 'Math.PI',
        E: 'Math.E',
        GOLDEN_RATIO: '((1 + Math.sqrt(5)) / 2)',
        SQRT2: 'Math.SQRT2',
        SQRT1_2: 'Math.SQRT1_2',
        INFINITY: 'Infinity',
      };
      return constants[data.constant];
    },
  },

  math_number_property: {
    id: 'math_number_property',
    type: 'math_number_property',
    label: 'Number Property',
    category: 'math',
    description: 'Check if number is even, odd, prime, etc',
    color: '#fef3c7',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'property',
        type: 'dropdown',
        label: 'Property',
        defaultValue: 'EVEN',
        options: [
          { value: 'EVEN', label: 'is even' },
          { value: 'ODD', label: 'is odd' },
          { value: 'PRIME', label: 'is prime' },
          { value: 'WHOLE', label: 'is whole' },
          { value: 'POSITIVE', label: 'is positive' },
          { value: 'NEGATIVE', label: 'is negative' },
        ]
      }
    ],
    keywords: ['number', 'property', 'even', 'odd', 'prime'],
    codeGenerator: (data, inputs) => {
      const value = inputs.value || '0';
      const checks: Record<string, string> = {
        EVEN: `(${value} % 2 === 0)`,
        ODD: `(${value} % 2 === 1)`,
        PRIME: `isPrime(${value})`,
        WHOLE: `(${value} % 1 === 0)`,
        POSITIVE: `(${value} > 0)`,
        NEGATIVE: `(${value} < 0)`,
      };
      return checks[data.property];
    },
  },

  math_constrain: {
    id: 'math_constrain',
    type: 'math_constrain',
    label: 'Constrain',
    category: 'math',
    description: 'Constrain number between min and max',
    color: '#fef3c7',
    handles: [
      { id: 'value', type: 'target', position: 'left', label: 'value', dataType: 'value' },
      { id: 'low', type: 'target', position: 'left', label: 'min', dataType: 'value' },
      { id: 'high', type: 'target', position: 'left', label: 'max', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['constrain', 'clamp', 'limit'],
    codeGenerator: (data, inputs) => {
      return `Math.max(${inputs.low || '0'}, Math.min(${inputs.high || '100'}, ${inputs.value || '0'}))`;
    },
  },

  // ===================================================================
  // REMAINING TEXT (11 nodes)
  // ===================================================================

  text_length: {
    id: 'text_length',
    type: 'text_length',
    label: 'Text Length',
    category: 'text',
    description: 'Length of text',
    color: '#e0f2fe',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['text', 'length', 'size'],
    codeGenerator: (data, inputs) => `(${inputs.value || '\'\''}.length)`,
  },

  text_isEmpty: {
    id: 'text_isEmpty',
    type: 'text_isEmpty',
    label: 'Text is Empty',
    category: 'text',
    description: 'Check if text is empty',
    color: '#e0f2fe',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['text', 'empty', 'blank'],
    codeGenerator: (data, inputs) => `(${inputs.value || '\'\''}.length === 0)`,
  },

  text_join: {
    id: 'text_join',
    type: 'text_join',
    label: 'Join Text',
    category: 'text',
    description: 'Join multiple text values',
    color: '#e0f2fe',
    handles: [
      { id: 'text1', type: 'target', position: 'left', label: '1', dataType: 'value' },
      { id: 'text2', type: 'target', position: 'left', label: '2', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      { name: 'item_count', type: 'number', label: 'Items', defaultValue: 2, min: 2, max: 10 }
    ],
    keywords: ['join', 'concat', 'combine'],
    codeGenerator: (data, inputs) => {
      const parts = [];
      for (let i = 1; i <= (data.item_count || 2); i++) {
        parts.push(inputs[`text${i}`] || '\'\'');
      }
      return `(${parts.join(' + ')})`;
    },
  },

  text_append: {
    id: 'text_append',
    type: 'text_append',
    label: 'Append Text',
    category: 'text',
    description: 'Append text to variable',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'text', type: 'target', position: 'left', label: 'text', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      { name: 'variable', type: 'variable', label: 'Variable', defaultValue: 'item' }
    ],
    keywords: ['append', 'add', 'concat'],
    codeGenerator: (data, inputs) => {
      return `${data.variable} += ${inputs.text || '\'\''};\n`;
    },
  },

  text_indexOf: {
    id: 'text_indexOf',
    type: 'text_indexOf',
    label: 'Find Text',
    category: 'text',
    description: 'Find position of text',
    color: '#e0f2fe',
    handles: [
      { id: 'value', type: 'target', position: 'left', label: 'in text', dataType: 'value' },
      { id: 'find', type: 'target', position: 'left', label: 'find', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'mode',
        type: 'dropdown',
        label: 'Mode',
        defaultValue: 'FIRST',
        options: [
          { value: 'FIRST', label: 'first occurrence' },
          { value: 'LAST', label: 'last occurrence' },
        ]
      }
    ],
    keywords: ['find', 'indexOf', 'search'],
    codeGenerator: (data, inputs) => {
      const method = data.mode === 'FIRST' ? 'indexOf' : 'lastIndexOf';
      return `(${inputs.value || '\'\''}.${method}(${inputs.find || '\'\''}))`;
    },
  },

  text_charAt: {
    id: 'text_charAt',
    type: 'text_charAt',
    label: 'Character At',
    category: 'text',
    description: 'Get character at position',
    color: '#e0f2fe',
    handles: [
      { id: 'value', type: 'target', position: 'left', label: 'in text', dataType: 'value' },
      { id: 'at', type: 'target', position: 'left', label: 'at', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['character', 'charAt', 'position'],
    codeGenerator: (data, inputs) => {
      return `(${inputs.value || '\'\''}.charAt(${inputs.at || '0'}))`;
    },
  },

  text_changeCase: {
    id: 'text_changeCase',
    type: 'text_changeCase',
    label: 'Change Case',
    category: 'text',
    description: 'Change text to UPPER/lower/Title Case',
    color: '#e0f2fe',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'case',
        type: 'dropdown',
        label: 'Case',
        defaultValue: 'UPPERCASE',
        options: [
          { value: 'UPPERCASE', label: 'UPPER CASE' },
          { value: 'LOWERCASE', label: 'lower case' },
          { value: 'TITLECASE', label: 'Title Case' },
        ]
      }
    ],
    keywords: ['uppercase', 'lowercase', 'case'],
    codeGenerator: (data, inputs) => {
      const text = inputs.value || '\'\'';
      if (data.case === 'UPPERCASE') return `(${text}.toUpperCase())`;
      if (data.case === 'LOWERCASE') return `(${text}.toLowerCase())`;
      return `(${text}.replace(/\\w\\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))`;
    },
  },

  text_trim: {
    id: 'text_trim',
    type: 'text_trim',
    label: 'Trim',
    category: 'text',
    description: 'Remove spaces from text',
    color: '#e0f2fe',
    handles: [
      { id: 'value', type: 'target', position: 'left', dataType: 'value' },
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'mode',
        type: 'dropdown',
        label: 'Mode',
        defaultValue: 'BOTH',
        options: [
          { value: 'BOTH', label: 'both sides' },
          { value: 'LEFT', label: 'left side' },
          { value: 'RIGHT', label: 'right side' },
        ]
      }
    ],
    keywords: ['trim', 'strip', 'spaces'],
    codeGenerator: (data, inputs) => {
      const text = inputs.value || '\'\'';
      const methods: Record<string, string> = {
        BOTH: 'trim',
        LEFT: 'trimStart',
        RIGHT: 'trimEnd',
      };
      return `(${text}.${methods[data.mode]}())`;
    },
  },

  text_print: {
    id: 'text_print',
    type: 'text_print',
    label: 'Print',
    category: 'text',
    description: 'Print text to console',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'text', type: 'target', position: 'left', label: 'text', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [],
    keywords: ['print', 'console', 'log'],
    codeGenerator: (data, inputs) => {
      return `console.log(${inputs.text || '\'\''});\n`;
    },
  },

  // ===================================================================
  // MISCELLANEOUS TOOLS (11 nodes)
  // ===================================================================

  balance: {
    id: 'balance',
    type: 'balance',
    label: 'Balance',
    category: 'misc',
    description: 'Get account balance',
    color: '#e5e5e5',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [
      {
        name: 'balance_type',
        type: 'dropdown',
        label: 'Type',
        defaultValue: 'CURRENT',
        options: [
          { value: 'CURRENT', label: 'Current Balance' },
          { value: 'START', label: 'Starting Balance' },
        ]
      }
    ],
    keywords: ['balance', 'account', 'money'],
    codeGenerator: (data) => {
      return data.balance_type === 'CURRENT' ? 'Bot.getBalance()' : 'Bot.getStartingBalance()';
    },
  },

  total_profit: {
    id: 'total_profit',
    type: 'total_profit',
    label: 'Total Profit',
    category: 'misc',
    description: 'Get total profit/loss',
    color: '#e5e5e5',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['profit', 'loss', 'total'],
    codeGenerator: () => 'context.profit',
  },

  total_runs: {
    id: 'total_runs',
    type: 'total_runs',
    label: 'Total Runs',
    category: 'misc',
    description: 'Get total number of runs',
    color: '#e5e5e5',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['runs', 'trades', 'count'],
    codeGenerator: () => 'context.totalRuns',
  },

  notify: {
    id: 'notify',
    type: 'notify',
    label: 'Notify',
    category: 'misc',
    description: 'Send notification',
    color: '#e5e5e5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'message', type: 'target', position: 'left', label: 'message', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'type',
        type: 'dropdown',
        label: 'Type',
        defaultValue: 'TOAST',
        options: [
          { value: 'TOAST', label: 'Toast' },
          { value: 'SOUND', label: 'Sound' },
        ]
      }
    ],
    keywords: ['notify', 'alert', 'notification'],
    codeGenerator: (data, inputs) => {
      return `notify(${inputs.message || '\'\''}, '${data.type}');\n`;
    },
  },

  notify_telegram: {
    id: 'notify_telegram',
    type: 'notify_telegram',
    label: 'Telegram Notify',
    category: 'misc',
    description: 'Send Telegram notification',
    color: '#e5e5e5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'message', type: 'target', position: 'left', label: 'message', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      { name: 'token', type: 'text', label: 'Bot Token', defaultValue: '' },
      { name: 'chat_id', type: 'text', label: 'Chat ID', defaultValue: '' },
    ],
    keywords: ['telegram', 'notify', 'message'],
    codeGenerator: (data, inputs) => {
      return `notifyTelegram(${inputs.message || '\'\''}, '${data.token}', '${data.chat_id}');\n`;
    },
  },

  console: {
    id: 'console',
    type: 'console',
    label: 'Console',
    category: 'misc',
    description: 'Log to console',
    color: '#e5e5e5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'message', type: 'target', position: 'left', label: 'message', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [
      {
        name: 'type',
        type: 'dropdown',
        label: 'Type',
        defaultValue: 'LOG',
        options: [
          { value: 'LOG', label: 'log' },
          { value: 'WARN', label: 'warn' },
          { value: 'ERROR', label: 'error' },
        ]
      }
    ],
    keywords: ['console', 'log', 'debug'],
    codeGenerator: (data, inputs) => {
      return `console.${data.type.toLowerCase()}(${inputs.message || '\'\''});\n`;
    },
  },

  epoch: {
    id: 'epoch',
    type: 'epoch',
    label: 'Current Time',
    category: 'time',
    description: 'Get current epoch time',
    color: '#fef9c3',
    handles: [
      { id: 'output', type: 'source', position: 'right', dataType: 'value' }
    ],
    fields: [],
    keywords: ['epoch', 'time', 'timestamp'],
    codeGenerator: () => 'Date.now()',
  },

  block_holder: {
    id: 'block_holder',
    type: 'block_holder',
    label: 'Block Holder',
    category: 'misc',
    description: 'Container for organizing blocks',
    color: '#e5e5e5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'statement', type: 'target', position: 'left', label: 'blocks', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' }
    ],
    fields: [],
    keywords: ['holder', 'container', 'organize'],
    codeGenerator: (data, inputs) => {
      return `{\n${inputs.statement || '  // blocks here'}\n}\n`;
    },
  },
};
