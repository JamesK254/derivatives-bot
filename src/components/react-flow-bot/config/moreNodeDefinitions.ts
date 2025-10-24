/**
 * More Node Definitions - Indicators, Tick Analysis, Lists, Functions, Time, Candles
 * Part of the Blockly to React Flow migration
 */

import { NodeDefinition } from './nodeDefinitions';

export const MORE_NODE_DEFINITIONS: Record<string, NodeDefinition> = {
  // ============================================================================
  // INDICATORS (14 nodes)
  // ============================================================================

  sma: {
    id: 'sma',
    type: 'sma',
    label: 'Simple Moving Average',
    category: 'indicators',
    description: 'Calculate Simple Moving Average of last N candles',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 10 },
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
        ],
      },
    ],
    keywords: ['sma', 'moving', 'average', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 10;
      const field = data.field || 'close';
      return `Bot.sma(${period}, '${field}')`;
    },
  },

  ema: {
    id: 'ema',
    type: 'ema',
    label: 'Exponential Moving Average',
    category: 'indicators',
    description: 'Calculate Exponential Moving Average of last N candles',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 10 },
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
        ],
      },
    ],
    keywords: ['ema', 'exponential', 'moving', 'average', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 10;
      const field = data.field || 'close';
      return `Bot.ema(${period}, '${field}')`;
    },
  },

  bb: {
    id: 'bb',
    type: 'bb',
    label: 'Bollinger Bands',
    category: 'indicators',
    description: 'Calculate Bollinger Bands',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'stddev', type: 'target', position: 'left', label: 'Std Dev', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 20 },
      { name: 'stddev', type: 'number', label: 'Standard Deviation', defaultValue: 2 },
      {
        name: 'band',
        type: 'dropdown',
        label: 'Band',
        defaultValue: 'middle',
        options: [
          { value: 'upper', label: 'Upper' },
          { value: 'middle', label: 'Middle' },
          { value: 'lower', label: 'Lower' },
        ],
      },
    ],
    keywords: ['bollinger', 'bands', 'bb', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 20;
      const stddev = inputs.stddev || data.stddev || 2;
      const band = data.band || 'middle';
      return `Bot.bb(${period}, ${stddev}).${band}`;
    },
  },

  bbp: {
    id: 'bbp',
    type: 'bbp',
    label: 'Bollinger Bands %B',
    category: 'indicators',
    description: 'Calculate Bollinger Bands %B (Price position within bands)',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'stddev', type: 'target', position: 'left', label: 'Std Dev', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 20 },
      { name: 'stddev', type: 'number', label: 'Standard Deviation', defaultValue: 2 },
    ],
    keywords: ['bollinger', 'bands', 'bbp', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 20;
      const stddev = inputs.stddev || data.stddev || 2;
      return `Bot.bbp(${period}, ${stddev})`;
    },
  },

  rsi: {
    id: 'rsi',
    type: 'rsi',
    label: 'RSI',
    category: 'indicators',
    description: 'Calculate Relative Strength Index',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'period', type: 'number', label: 'Period', defaultValue: 14 }],
    keywords: ['rsi', 'relative', 'strength', 'index', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 14;
      return `Bot.rsi(${period})`;
    },
  },

  rsia: {
    id: 'rsia',
    type: 'rsia',
    label: 'RSI Array',
    category: 'indicators',
    description: 'Get RSI array for multiple periods',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'period', type: 'number', label: 'Period', defaultValue: 14 }],
    keywords: ['rsi', 'array', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 14;
      return `Bot.rsiArray(${period})`;
    },
  },

  macd: {
    id: 'macd',
    type: 'macd',
    label: 'MACD',
    category: 'indicators',
    description: 'Calculate MACD indicator',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'fast', type: 'target', position: 'left', label: 'Fast', dataType: 'value' },
      { id: 'slow', type: 'target', position: 'left', label: 'Slow', dataType: 'value' },
      { id: 'signal', type: 'target', position: 'left', label: 'Signal', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'fast', type: 'number', label: 'Fast Period', defaultValue: 12 },
      { name: 'slow', type: 'number', label: 'Slow Period', defaultValue: 26 },
      { name: 'signal', type: 'number', label: 'Signal Period', defaultValue: 9 },
      {
        name: 'line',
        type: 'dropdown',
        label: 'Line',
        defaultValue: 'macd',
        options: [
          { value: 'macd', label: 'MACD' },
          { value: 'signal', label: 'Signal' },
          { value: 'histogram', label: 'Histogram' },
        ],
      },
    ],
    keywords: ['macd', 'moving', 'average', 'convergence', 'divergence', 'indicator'],
    codeGenerator: (data, inputs) => {
      const fast = inputs.fast || data.fast || 12;
      const slow = inputs.slow || data.slow || 26;
      const signal = inputs.signal || data.signal || 9;
      const line = data.line || 'macd';
      return `Bot.macd(${fast}, ${slow}, ${signal}).${line}`;
    },
  },

  macda: {
    id: 'macda',
    type: 'macda',
    label: 'MACD Array',
    category: 'indicators',
    description: 'Get MACD array for multiple periods',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'fast', type: 'target', position: 'left', label: 'Fast', dataType: 'value' },
      { id: 'slow', type: 'target', position: 'left', label: 'Slow', dataType: 'value' },
      { id: 'signal', type: 'target', position: 'left', label: 'Signal', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'fast', type: 'number', label: 'Fast Period', defaultValue: 12 },
      { name: 'slow', type: 'number', label: 'Slow Period', defaultValue: 26 },
      { name: 'signal', type: 'number', label: 'Signal Period', defaultValue: 9 },
    ],
    keywords: ['macd', 'array', 'indicator'],
    codeGenerator: (data, inputs) => {
      const fast = inputs.fast || data.fast || 12;
      const slow = inputs.slow || data.slow || 26;
      const signal = inputs.signal || data.signal || 9;
      return `Bot.macdArray(${fast}, ${slow}, ${signal})`;
    },
  },

  smaa: {
    id: 'smaa',
    type: 'smaa',
    label: 'SMA Array',
    category: 'indicators',
    description: 'Get SMA array for multiple periods',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 10 },
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
        ],
      },
    ],
    keywords: ['sma', 'array', 'moving', 'average'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 10;
      const field = data.field || 'close';
      return `Bot.smaArray(${period}, '${field}')`;
    },
  },

  emaa: {
    id: 'emaa',
    type: 'emaa',
    label: 'EMA Array',
    category: 'indicators',
    description: 'Get EMA array for multiple periods',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 10 },
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'close', label: 'Close' },
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
        ],
      },
    ],
    keywords: ['ema', 'array', 'exponential', 'moving', 'average'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 10;
      const field = data.field || 'close';
      return `Bot.emaArray(${period}, '${field}')`;
    },
  },

  bba: {
    id: 'bba',
    type: 'bba',
    label: 'Bollinger Bands Array',
    category: 'indicators',
    description: 'Get Bollinger Bands array',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'stddev', type: 'target', position: 'left', label: 'Std Dev', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 20 },
      { name: 'stddev', type: 'number', label: 'Standard Deviation', defaultValue: 2 },
    ],
    keywords: ['bollinger', 'bands', 'array'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 20;
      const stddev = inputs.stddev || data.stddev || 2;
      return `Bot.bbArray(${period}, ${stddev})`;
    },
  },

  bbpa: {
    id: 'bbpa',
    type: 'bbpa',
    label: 'Bollinger Bands %B Array',
    category: 'indicators',
    description: 'Get Bollinger Bands %B array',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'stddev', type: 'target', position: 'left', label: 'Std Dev', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 20 },
      { name: 'stddev', type: 'number', label: 'Standard Deviation', defaultValue: 2 },
    ],
    keywords: ['bollinger', 'bands', 'bbp', 'array'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 20;
      const stddev = inputs.stddev || data.stddev || 2;
      return `Bot.bbpArray(${period}, ${stddev})`;
    },
  },

  stochastic: {
    id: 'stochastic',
    type: 'stochastic',
    label: 'Stochastic',
    category: 'indicators',
    description: 'Calculate Stochastic oscillator',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'smooth_k', type: 'target', position: 'left', label: 'Smooth K', dataType: 'value' },
      { id: 'smooth_d', type: 'target', position: 'left', label: 'Smooth D', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'period', type: 'number', label: 'Period', defaultValue: 14 },
      { name: 'smooth_k', type: 'number', label: 'Smooth K', defaultValue: 3 },
      { name: 'smooth_d', type: 'number', label: 'Smooth D', defaultValue: 3 },
      {
        name: 'line',
        type: 'dropdown',
        label: 'Line',
        defaultValue: 'k',
        options: [
          { value: 'k', label: '%K' },
          { value: 'd', label: '%D' },
        ],
      },
    ],
    keywords: ['stochastic', 'oscillator', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 14;
      const smoothK = inputs.smooth_k || data.smooth_k || 3;
      const smoothD = inputs.smooth_d || data.smooth_d || 3;
      const line = data.line || 'k';
      return `Bot.stochastic(${period}, ${smoothK}, ${smoothD}).${line}`;
    },
  },

  atr: {
    id: 'atr',
    type: 'atr',
    label: 'ATR',
    category: 'indicators',
    description: 'Calculate Average True Range',
    color: '#e0f2fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'period', type: 'target', position: 'left', label: 'Period', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'period', type: 'number', label: 'Period', defaultValue: 14 }],
    keywords: ['atr', 'average', 'true', 'range', 'indicator'],
    codeGenerator: (data, inputs) => {
      const period = inputs.period || data.period || 14;
      return `Bot.atr(${period})`;
    },
  },

  // ============================================================================
  // TICK ANALYSIS (16 nodes)
  // ============================================================================

  tick: {
    id: 'tick',
    type: 'tick',
    label: 'Last Tick',
    category: 'tick_analysis',
    description: 'Get the last tick value',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['tick', 'last', 'price'],
    codeGenerator: () => `Bot.getLastTick()`,
  },

  tick_direction: {
    id: 'tick_direction',
    type: 'tick_direction',
    label: 'Tick Direction',
    category: 'tick_analysis',
    description: 'Get the direction of the last tick (up/down)',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['tick', 'direction'],
    codeGenerator: () => `Bot.getLastTickDirection()`,
  },

  ticks: {
    id: 'ticks',
    type: 'ticks',
    label: 'Ticks List',
    category: 'tick_analysis',
    description: 'Get list of last N ticks',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 10 }],
    keywords: ['ticks', 'list', 'array'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 10;
      return `Bot.getTicks(${count})`;
    },
  },

  tick_value: {
    id: 'tick_value',
    type: 'tick_value',
    label: 'Tick Value',
    category: 'tick_analysis',
    description: 'Get tick value at specific index',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'index', type: 'target', position: 'left', label: 'Index', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'index', type: 'number', label: 'Index', defaultValue: 0 }],
    keywords: ['tick', 'value', 'index'],
    codeGenerator: (data, inputs) => {
      const index = inputs.index || data.index || 0;
      return `Bot.getTickValue(${index})`;
    },
  },

  ohlc: {
    id: 'ohlc',
    type: 'ohlc',
    label: 'OHLC',
    category: 'tick_analysis',
    description: 'Get OHLC (Open, High, Low, Close) for last candle',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'close', label: 'Close' },
        ],
      },
    ],
    keywords: ['ohlc', 'open', 'high', 'low', 'close', 'candle'],
    codeGenerator: (data) => {
      const field = data.field || 'close';
      return `Bot.getOhlc().${field}`;
    },
  },

  ohlc_values: {
    id: 'ohlc_values',
    type: 'ohlc_values',
    label: 'OHLC Values',
    category: 'tick_analysis',
    description: 'Get OHLC values for last N candles',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'count', type: 'number', label: 'Number of Candles', defaultValue: 10 },
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'close', label: 'Close' },
        ],
      },
    ],
    keywords: ['ohlc', 'values', 'array', 'candles'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 10;
      const field = data.field || 'close';
      return `Bot.getOhlcValues(${count}, '${field}')`;
    },
  },

  ohlc_value_at: {
    id: 'ohlc_value_at',
    type: 'ohlc_value_at',
    label: 'OHLC Value At',
    category: 'tick_analysis',
    description: 'Get OHLC value at specific index',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'index', type: 'target', position: 'left', label: 'Index', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'index', type: 'number', label: 'Index', defaultValue: 0 },
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'close', label: 'Close' },
        ],
      },
    ],
    keywords: ['ohlc', 'value', 'index'],
    codeGenerator: (data, inputs) => {
      const index = inputs.index || data.index || 0;
      const field = data.field || 'close';
      return `Bot.getOhlcValueAt(${index}, '${field}')`;
    },
  },

  read_ohlc: {
    id: 'read_ohlc',
    type: 'read_ohlc',
    label: 'Read OHLC',
    category: 'tick_analysis',
    description: 'Read OHLC field from candle object',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'candle', type: 'target', position: 'left', label: 'Candle', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'field',
        type: 'dropdown',
        label: 'Field',
        defaultValue: 'close',
        options: [
          { value: 'open', label: 'Open' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'close', label: 'Close' },
          { value: 'epoch', label: 'Epoch' },
        ],
      },
    ],
    keywords: ['read', 'ohlc', 'candle'],
    codeGenerator: (data, inputs) => {
      const field = data.field || 'close';
      const candle = inputs.candle || 'candle';
      return `${candle}.${field}`;
    },
  },

  last_digit: {
    id: 'last_digit',
    type: 'last_digit',
    label: 'Last Digit',
    category: 'tick_analysis',
    description: 'Get last digit of tick',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['last', 'digit', 'tick'],
    codeGenerator: () => `Bot.getLastDigit()`,
  },

  last_digit_list: {
    id: 'last_digit_list',
    type: 'last_digit_list',
    label: 'Last Digit List',
    category: 'tick_analysis',
    description: 'Get list of last digits for N ticks',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 10 }],
    keywords: ['last', 'digit', 'list', 'array'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 10;
      return `Bot.getLastDigitList(${count})`;
    },
  },

  tick_analysis: {
    id: 'tick_analysis',
    type: 'tick_analysis',
    label: 'Tick Analysis',
    category: 'tick_analysis',
    description: 'Analyze ticks pattern',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 5 },
      {
        name: 'analysis_type',
        type: 'dropdown',
        label: 'Analysis Type',
        defaultValue: 'direction',
        options: [
          { value: 'direction', label: 'Direction' },
          { value: 'volatility', label: 'Volatility' },
          { value: 'trend', label: 'Trend' },
        ],
      },
    ],
    keywords: ['tick', 'analysis', 'pattern'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 5;
      const analysisType = data.analysis_type || 'direction';
      return `Bot.analyzeTicks(${count}, '${analysisType}')`;
    },
  },

  check_direction: {
    id: 'check_direction',
    type: 'check_direction',
    label: 'Check Direction',
    category: 'tick_analysis',
    description: 'Check if last N ticks match direction',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'boolean' },
    ],
    fields: [
      { name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 3 },
      {
        name: 'direction',
        type: 'dropdown',
        label: 'Direction',
        defaultValue: 'rise',
        options: [
          { value: 'rise', label: 'Rise' },
          { value: 'fall', label: 'Fall' },
        ],
      },
    ],
    keywords: ['check', 'direction', 'tick', 'rise', 'fall'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 3;
      const direction = data.direction || 'rise';
      return `Bot.checkDirection(${count}, '${direction}')`;
    },
  },

  check_rising: {
    id: 'check_rising',
    type: 'check_rising',
    label: 'Check Rising',
    category: 'tick_analysis',
    description: 'Check if ticks are rising',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'boolean' },
    ],
    fields: [{ name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 3 }],
    keywords: ['check', 'rising', 'tick', 'up'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 3;
      return `Bot.checkRising(${count})`;
    },
  },

  check_falling: {
    id: 'check_falling',
    type: 'check_falling',
    label: 'Check Falling',
    category: 'tick_analysis',
    description: 'Check if ticks are falling',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'boolean' },
    ],
    fields: [{ name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 3 }],
    keywords: ['check', 'falling', 'tick', 'down'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 3;
      return `Bot.checkFalling(${count})`;
    },
  },

  tick_in_direction: {
    id: 'tick_in_direction',
    type: 'tick_in_direction',
    label: 'Tick in Direction',
    category: 'tick_analysis',
    description: 'Count ticks in specific direction',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 10 },
      {
        name: 'direction',
        type: 'dropdown',
        label: 'Direction',
        defaultValue: 'rise',
        options: [
          { value: 'rise', label: 'Rise' },
          { value: 'fall', label: 'Fall' },
        ],
      },
    ],
    keywords: ['tick', 'direction', 'count'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 10;
      const direction = data.direction || 'rise';
      return `Bot.ticksInDirection(${count}, '${direction}')`;
    },
  },

  total_tick_movement: {
    id: 'total_tick_movement',
    type: 'total_tick_movement',
    label: 'Total Tick Movement',
    category: 'tick_analysis',
    description: 'Calculate total tick movement over N ticks',
    color: '#fef3c7',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'count', type: 'target', position: 'left', label: 'Count', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'count', type: 'number', label: 'Number of Ticks', defaultValue: 10 }],
    keywords: ['total', 'tick', 'movement', 'volatility'],
    codeGenerator: (data, inputs) => {
      const count = inputs.count || data.count || 10;
      return `Bot.totalTickMovement(${count})`;
    },
  },

  // ============================================================================
  // LISTS (12 nodes)
  // ============================================================================

  lists_create_with: {
    id: 'lists_create_with',
    type: 'lists_create_with',
    label: 'Create List',
    category: 'lists',
    description: 'Create a list with items',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'item0', type: 'target', position: 'left', label: 'Item 1', dataType: 'value' },
      { id: 'item1', type: 'target', position: 'left', label: 'Item 2', dataType: 'value' },
      { id: 'item2', type: 'target', position: 'left', label: 'Item 3', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [{ name: 'items', type: 'number', label: 'Number of Items', defaultValue: 3 }],
    keywords: ['list', 'create', 'array'],
    codeGenerator: (data, inputs) => {
      const itemCount = data.items || 3;
      const items = [];
      for (let i = 0; i < itemCount; i++) {
        items.push(inputs[`item${i}`] || '');
      }
      return `[${items.join(', ')}]`;
    },
  },

  lists_length: {
    id: 'lists_length',
    type: 'lists_length',
    label: 'List Length',
    category: 'lists',
    description: 'Get the length of a list',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['list', 'length', 'size'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      return `${list}.length`;
    },
  },

  lists_isEmpty: {
    id: 'lists_isEmpty',
    type: 'lists_isEmpty',
    label: 'List is Empty',
    category: 'lists',
    description: 'Check if list is empty',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'boolean' },
    ],
    fields: [],
    keywords: ['list', 'empty', 'check'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      return `${list}.length === 0`;
    },
  },

  lists_indexOf: {
    id: 'lists_indexOf',
    type: 'lists_indexOf',
    label: 'List Index Of',
    category: 'lists',
    description: 'Find index of item in list',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'value', type: 'target', position: 'left', label: 'Value', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'position',
        type: 'dropdown',
        label: 'Position',
        defaultValue: 'first',
        options: [
          { value: 'first', label: 'First' },
          { value: 'last', label: 'Last' },
        ],
      },
    ],
    keywords: ['list', 'index', 'find'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      const value = inputs.value || '""';
      const position = data.position || 'first';
      return position === 'first' ? `${list}.indexOf(${value})` : `${list}.lastIndexOf(${value})`;
    },
  },

  lists_getIndex: {
    id: 'lists_getIndex',
    type: 'lists_getIndex',
    label: 'Get Item from List',
    category: 'lists',
    description: 'Get item from list at index',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'index', type: 'target', position: 'left', label: 'Index', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'mode',
        type: 'dropdown',
        label: 'Mode',
        defaultValue: 'get',
        options: [
          { value: 'get', label: 'Get' },
          { value: 'get_remove', label: 'Get and Remove' },
          { value: 'remove', label: 'Remove' },
        ],
      },
      {
        name: 'where',
        type: 'dropdown',
        label: 'Where',
        defaultValue: 'from_start',
        options: [
          { value: 'from_start', label: 'From Start' },
          { value: 'from_end', label: 'From End' },
          { value: 'first', label: 'First' },
          { value: 'last', label: 'Last' },
          { value: 'random', label: 'Random' },
        ],
      },
    ],
    keywords: ['list', 'get', 'item', 'index'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      const index = inputs.index || '0';
      const mode = data.mode || 'get';
      const where = data.where || 'from_start';

      let indexExpr = index;
      if (where === 'from_end') indexExpr = `${list}.length - ${index}`;
      else if (where === 'first') indexExpr = '0';
      else if (where === 'last') indexExpr = `${list}.length - 1`;
      else if (where === 'random')
        indexExpr = `Math.floor(Math.random() * ${list}.length)`;

      if (mode === 'get') return `${list}[${indexExpr}]`;
      else if (mode === 'get_remove') return `${list}.splice(${indexExpr}, 1)[0]`;
      else return `${list}.splice(${indexExpr}, 1)`;
    },
  },

  lists_setIndex: {
    id: 'lists_setIndex',
    type: 'lists_setIndex',
    label: 'Set Item in List',
    category: 'lists',
    description: 'Set item in list at index',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'index', type: 'target', position: 'left', label: 'Index', dataType: 'value' },
      { id: 'value', type: 'target', position: 'left', label: 'Value', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      {
        name: 'mode',
        type: 'dropdown',
        label: 'Mode',
        defaultValue: 'set',
        options: [
          { value: 'set', label: 'Set' },
          { value: 'insert', label: 'Insert' },
        ],
      },
      {
        name: 'where',
        type: 'dropdown',
        label: 'Where',
        defaultValue: 'from_start',
        options: [
          { value: 'from_start', label: 'From Start' },
          { value: 'from_end', label: 'From End' },
          { value: 'first', label: 'First' },
          { value: 'last', label: 'Last' },
        ],
      },
    ],
    keywords: ['list', 'set', 'item', 'index'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      const index = inputs.index || '0';
      const value = inputs.value || '""';
      const mode = data.mode || 'set';
      const where = data.where || 'from_start';

      let indexExpr = index;
      if (where === 'from_end') indexExpr = `${list}.length - ${index}`;
      else if (where === 'first') indexExpr = '0';
      else if (where === 'last') indexExpr = `${list}.length - 1`;

      if (mode === 'set') return `${list}[${indexExpr}] = ${value};\n`;
      else return `${list}.splice(${indexExpr}, 0, ${value});\n`;
    },
  },

  lists_getSublist: {
    id: 'lists_getSublist',
    type: 'lists_getSublist',
    label: 'Get Sublist',
    category: 'lists',
    description: 'Get a portion of a list',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'at1', type: 'target', position: 'left', label: 'From', dataType: 'value' },
      { id: 'at2', type: 'target', position: 'left', label: 'To', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'from', type: 'number', label: 'From Index', defaultValue: 0 },
      { name: 'to', type: 'number', label: 'To Index', defaultValue: 1 },
    ],
    keywords: ['list', 'sublist', 'slice'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      const from = inputs.at1 || data.from || 0;
      const to = inputs.at2 || data.to || 1;
      return `${list}.slice(${from}, ${to})`;
    },
  },

  lists_split: {
    id: 'lists_split',
    type: 'lists_split',
    label: 'Split/Join List',
    category: 'lists',
    description: 'Split text to list or join list to text',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'value', type: 'target', position: 'left', label: 'Value', dataType: 'value' },
      { id: 'delimiter', type: 'target', position: 'left', label: 'Delimiter', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'mode',
        type: 'dropdown',
        label: 'Mode',
        defaultValue: 'split',
        options: [
          { value: 'split', label: 'Split Text' },
          { value: 'join', label: 'Join List' },
        ],
      },
      { name: 'delimiter', type: 'text', label: 'Delimiter', defaultValue: ',' },
    ],
    keywords: ['list', 'split', 'join', 'text'],
    codeGenerator: (data, inputs) => {
      const value = inputs.value || '""';
      const delimiter = inputs.delimiter || `"${data.delimiter || ','}"`;
      const mode = data.mode || 'split';
      return mode === 'split'
        ? `${value}.split(${delimiter})`
        : `${value}.join(${delimiter})`;
    },
  },

  lists_sort: {
    id: 'lists_sort',
    type: 'lists_sort',
    label: 'Sort List',
    category: 'lists',
    description: 'Sort a list',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'type',
        type: 'dropdown',
        label: 'Type',
        defaultValue: 'numeric',
        options: [
          { value: 'numeric', label: 'Numeric' },
          { value: 'alphabetic', label: 'Alphabetic' },
          { value: 'alphabetic_ignorecase', label: 'Alphabetic (ignore case)' },
        ],
      },
      {
        name: 'direction',
        type: 'dropdown',
        label: 'Direction',
        defaultValue: 'ascending',
        options: [
          { value: 'ascending', label: 'Ascending' },
          { value: 'descending', label: 'Descending' },
        ],
      },
    ],
    keywords: ['list', 'sort'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      const type = data.type || 'numeric';
      const direction = data.direction || 'ascending';

      let sortFn = '';
      if (type === 'numeric') sortFn = '(a, b) => a - b';
      else if (type === 'alphabetic') sortFn = '(a, b) => a.localeCompare(b)';
      else sortFn = '(a, b) => a.toLowerCase().localeCompare(b.toLowerCase())';

      const sorted = `[...${list}].sort(${sortFn})`;
      return direction === 'ascending' ? sorted : `${sorted}.reverse()`;
    },
  },

  lists_reverse: {
    id: 'lists_reverse',
    type: 'lists_reverse',
    label: 'Reverse List',
    category: 'lists',
    description: 'Reverse a list',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['list', 'reverse'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      return `[...${list}].reverse()`;
    },
  },

  lists_sum: {
    id: 'lists_sum',
    type: 'lists_sum',
    label: 'Sum of List',
    category: 'lists',
    description: 'Calculate sum of numeric list',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['list', 'sum', 'total'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      return `${list}.reduce((a, b) => a + b, 0)`;
    },
  },

  lists_average: {
    id: 'lists_average',
    type: 'lists_average',
    label: 'Average of List',
    category: 'lists',
    description: 'Calculate average of numeric list',
    color: '#ddd6fe',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'list', type: 'target', position: 'left', label: 'List', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['list', 'average', 'mean'],
    codeGenerator: (data, inputs) => {
      const list = inputs.list || '[]';
      return `${list}.reduce((a, b) => a + b, 0) / ${list}.length`;
    },
  },

  // ============================================================================
  // FUNCTIONS (6 nodes)
  // ============================================================================

  procedures_defnoreturn: {
    id: 'procedures_defnoreturn',
    type: 'procedures_defnoreturn',
    label: 'Function (no return)',
    category: 'functions',
    description: 'Define a function without return value',
    color: '#fce7f3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'do', type: 'target', position: 'left', label: 'Do', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      { name: 'name', type: 'text', label: 'Function Name', defaultValue: 'myFunction' },
      { name: 'params', type: 'text', label: 'Parameters (comma separated)', defaultValue: '' },
    ],
    keywords: ['function', 'procedure', 'define'],
    codeGenerator: (data, inputs) => {
      const name = data.name || 'myFunction';
      const params = data.params || '';
      const body = inputs.do || '  // function body';
      return `function ${name}(${params}) {\n${body}\n}\n`;
    },
  },

  procedures_defreturn: {
    id: 'procedures_defreturn',
    type: 'procedures_defreturn',
    label: 'Function (with return)',
    category: 'functions',
    description: 'Define a function with return value',
    color: '#fce7f3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'do', type: 'target', position: 'left', label: 'Do', dataType: 'statement' },
      { id: 'return', type: 'target', position: 'left', label: 'Return', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      { name: 'name', type: 'text', label: 'Function Name', defaultValue: 'myFunction' },
      { name: 'params', type: 'text', label: 'Parameters (comma separated)', defaultValue: '' },
    ],
    keywords: ['function', 'procedure', 'define', 'return'],
    codeGenerator: (data, inputs) => {
      const name = data.name || 'myFunction';
      const params = data.params || '';
      const body = inputs.do || '  // function body';
      const returnValue = inputs.return || 'null';
      return `function ${name}(${params}) {\n${body}\n  return ${returnValue};\n}\n`;
    },
  },

  procedures_callnoreturn: {
    id: 'procedures_callnoreturn',
    type: 'procedures_callnoreturn',
    label: 'Call Function',
    category: 'functions',
    description: 'Call a function without return value',
    color: '#fce7f3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'arg0', type: 'target', position: 'left', label: 'Arg 1', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      { name: 'name', type: 'text', label: 'Function Name', defaultValue: 'myFunction' },
      { name: 'args', type: 'number', label: 'Number of Arguments', defaultValue: 0 },
    ],
    keywords: ['function', 'call', 'invoke'],
    codeGenerator: (data, inputs) => {
      const name = data.name || 'myFunction';
      const argCount = data.args || 0;
      const args = [];
      for (let i = 0; i < argCount; i++) {
        args.push(inputs[`arg${i}`] || '');
      }
      return `${name}(${args.join(', ')});\n`;
    },
  },

  procedures_callreturn: {
    id: 'procedures_callreturn',
    type: 'procedures_callreturn',
    label: 'Call Function (return)',
    category: 'functions',
    description: 'Call a function with return value',
    color: '#fce7f3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'arg0', type: 'target', position: 'left', label: 'Arg 1', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'name', type: 'text', label: 'Function Name', defaultValue: 'myFunction' },
      { name: 'args', type: 'number', label: 'Number of Arguments', defaultValue: 0 },
    ],
    keywords: ['function', 'call', 'invoke', 'return'],
    codeGenerator: (data, inputs) => {
      const name = data.name || 'myFunction';
      const argCount = data.args || 0;
      const args = [];
      for (let i = 0; i < argCount; i++) {
        args.push(inputs[`arg${i}`] || '');
      }
      return `${name}(${args.join(', ')})`;
    },
  },

  procedures_ifreturn: {
    id: 'procedures_ifreturn',
    type: 'procedures_ifreturn',
    label: 'If Return',
    category: 'functions',
    description: 'Conditional return from function',
    color: '#fce7f3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'condition', type: 'target', position: 'left', label: 'Condition', dataType: 'boolean' },
      { id: 'value', type: 'target', position: 'left', label: 'Value', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [],
    keywords: ['function', 'return', 'if', 'conditional'],
    codeGenerator: (data, inputs) => {
      const condition = inputs.condition || 'true';
      const value = inputs.value || '';
      return `if (${condition}) return ${value};\n`;
    },
  },

  loader_load: {
    id: 'loader_load',
    type: 'loader_load',
    label: 'Load Block',
    category: 'functions',
    description: 'Load and execute a saved block',
    color: '#fce7f3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'statement' },
    ],
    fields: [
      { name: 'block_id', type: 'text', label: 'Block ID', defaultValue: '' },
    ],
    keywords: ['load', 'block', 'saved'],
    codeGenerator: (data) => {
      const blockId = data.block_id || '';
      return `Bot.loadBlock('${blockId}');\n`;
    },
  },

  // ============================================================================
  // TIME TOOLS (6 nodes)
  // ============================================================================

  time_now: {
    id: 'time_now',
    type: 'time_now',
    label: 'Current Time',
    category: 'time',
    description: 'Get current timestamp',
    color: '#fef9c3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['time', 'now', 'current', 'timestamp'],
    codeGenerator: () => `Date.now()`,
  },

  time_format: {
    id: 'time_format',
    type: 'time_format',
    label: 'Format Time',
    category: 'time',
    description: 'Format timestamp to readable string',
    color: '#fef9c3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'time', type: 'target', position: 'left', label: 'Time', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      {
        name: 'format',
        type: 'dropdown',
        label: 'Format',
        defaultValue: 'datetime',
        options: [
          { value: 'datetime', label: 'Date and Time' },
          { value: 'date', label: 'Date Only' },
          { value: 'time', label: 'Time Only' },
        ],
      },
    ],
    keywords: ['time', 'format', 'date'],
    codeGenerator: (data, inputs) => {
      const time = inputs.time || 'Date.now()';
      const format = data.format || 'datetime';
      if (format === 'datetime') return `new Date(${time}).toLocaleString()`;
      else if (format === 'date') return `new Date(${time}).toLocaleDateString()`;
      else return `new Date(${time}).toLocaleTimeString()`;
    },
  },

  time_hour: {
    id: 'time_hour',
    type: 'time_hour',
    label: 'Hour',
    category: 'time',
    description: 'Get hour from timestamp',
    color: '#fef9c3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'time', type: 'target', position: 'left', label: 'Time', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['time', 'hour'],
    codeGenerator: (data, inputs) => {
      const time = inputs.time || 'Date.now()';
      return `new Date(${time}).getHours()`;
    },
  },

  time_minute: {
    id: 'time_minute',
    type: 'time_minute',
    label: 'Minute',
    category: 'time',
    description: 'Get minute from timestamp',
    color: '#fef9c3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'time', type: 'target', position: 'left', label: 'Time', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['time', 'minute'],
    codeGenerator: (data, inputs) => {
      const time = inputs.time || 'Date.now()';
      return `new Date(${time}).getMinutes()`;
    },
  },

  time_second: {
    id: 'time_second',
    type: 'time_second',
    label: 'Second',
    category: 'time',
    description: 'Get second from timestamp',
    color: '#fef9c3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'time', type: 'target', position: 'left', label: 'Time', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['time', 'second'],
    codeGenerator: (data, inputs) => {
      const time = inputs.time || 'Date.now()';
      return `new Date(${time}).getSeconds()`;
    },
  },

  time_elapsed: {
    id: 'time_elapsed',
    type: 'time_elapsed',
    label: 'Time Elapsed',
    category: 'time',
    description: 'Calculate time difference in milliseconds',
    color: '#fef9c3',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'start', type: 'target', position: 'left', label: 'Start', dataType: 'value' },
      { id: 'end', type: 'target', position: 'left', label: 'End', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [],
    keywords: ['time', 'elapsed', 'difference'],
    codeGenerator: (data, inputs) => {
      const start = inputs.start || 'Date.now()';
      const end = inputs.end || 'Date.now()';
      return `(${end} - ${start})`;
    },
  },

  // ============================================================================
  // CANDLE TOOLS (4 nodes)
  // ============================================================================

  candle_direction: {
    id: 'candle_direction',
    type: 'candle_direction',
    label: 'Candle Direction',
    category: 'candle',
    description: 'Get direction of candle (bullish/bearish)',
    color: '#d1fae5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'candle', type: 'target', position: 'left', label: 'Candle', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'index', type: 'number', label: 'Candle Index (0 = latest)', defaultValue: 0 },
    ],
    keywords: ['candle', 'direction', 'bullish', 'bearish'],
    codeGenerator: (data, inputs) => {
      const index = data.index || 0;
      const candle = inputs.candle || `Bot.getCandle(${index})`;
      return `${candle}.close > ${candle}.open ? 'bullish' : 'bearish'`;
    },
  },

  candle_body_size: {
    id: 'candle_body_size',
    type: 'candle_body_size',
    label: 'Candle Body Size',
    category: 'candle',
    description: 'Calculate candle body size',
    color: '#d1fae5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'candle', type: 'target', position: 'left', label: 'Candle', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'index', type: 'number', label: 'Candle Index (0 = latest)', defaultValue: 0 },
    ],
    keywords: ['candle', 'body', 'size'],
    codeGenerator: (data, inputs) => {
      const index = data.index || 0;
      const candle = inputs.candle || `Bot.getCandle(${index})`;
      return `Math.abs(${candle}.close - ${candle}.open)`;
    },
  },

  candle_shadow: {
    id: 'candle_shadow',
    type: 'candle_shadow',
    label: 'Candle Shadow',
    category: 'candle',
    description: 'Get candle shadow (upper or lower)',
    color: '#d1fae5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'candle', type: 'target', position: 'left', label: 'Candle', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'index', type: 'number', label: 'Candle Index (0 = latest)', defaultValue: 0 },
      {
        name: 'shadow',
        type: 'dropdown',
        label: 'Shadow',
        defaultValue: 'upper',
        options: [
          { value: 'upper', label: 'Upper' },
          { value: 'lower', label: 'Lower' },
        ],
      },
    ],
    keywords: ['candle', 'shadow', 'wick'],
    codeGenerator: (data, inputs) => {
      const index = data.index || 0;
      const candle = inputs.candle || `Bot.getCandle(${index})`;
      const shadow = data.shadow || 'upper';
      if (shadow === 'upper') {
        return `${candle}.high - Math.max(${candle}.open, ${candle}.close)`;
      } else {
        return `Math.min(${candle}.open, ${candle}.close) - ${candle}.low`;
      }
    },
  },

  candle_range: {
    id: 'candle_range',
    type: 'candle_range',
    label: 'Candle Range',
    category: 'candle',
    description: 'Get total candle range (high - low)',
    color: '#d1fae5',
    handles: [
      { id: 'input', type: 'target', position: 'top', dataType: 'statement' },
      { id: 'candle', type: 'target', position: 'left', label: 'Candle', dataType: 'value' },
      { id: 'output', type: 'source', position: 'bottom', dataType: 'value' },
    ],
    fields: [
      { name: 'index', type: 'number', label: 'Candle Index (0 = latest)', defaultValue: 0 },
    ],
    keywords: ['candle', 'range', 'high', 'low'],
    codeGenerator: (data, inputs) => {
      const index = data.index || 0;
      const candle = inputs.candle || `Bot.getCandle(${index})`;
      return `${candle}.high - ${candle}.low`;
    },
  },
};
