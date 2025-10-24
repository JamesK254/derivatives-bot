/**
 * Blockly XML to React Flow JSON Converter
 * Converts existing Blockly workspace XML to React Flow format
 */

import { Node, Edge } from 'reactflow';
import { NODE_DEFINITIONS, NodeDefinition } from '../config/nodeDefinitions';

interface BlocklyBlock {
  id: string;
  type: string;
  x: number;
  y: number;
  fields: Record<string, any>;
  inputs: Record<string, string>; // input name -> connected block ID
  next?: string; // next statement block ID
  parent?: string; // parent block ID
}

interface ConversionResult {
  nodes: Node[];
  edges: Edge[];
  errors: string[];
  warnings: string[];
}

/**
 * Parse Blockly XML and extract blocks
 */
function parseBlocklyXML(xml: string): BlocklyBlock[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const blocks: BlocklyBlock[] = [];

  const blockElements = doc.querySelectorAll('block');
  blockElements.forEach((blockEl) => {
    const block: BlocklyBlock = {
      id: blockEl.getAttribute('id') || `block-${Date.now()}-${Math.random()}`,
      type: blockEl.getAttribute('type') || 'unknown',
      x: parseInt(blockEl.getAttribute('x') || '0', 10),
      y: parseInt(blockEl.getAttribute('y') || '0', 10),
      fields: {},
      inputs: {},
    };

    // Parse fields
    blockEl.querySelectorAll(':scope > field').forEach((fieldEl) => {
      const name = fieldEl.getAttribute('name');
      const value = fieldEl.textContent || fieldEl.getAttribute('value');
      if (name) {
        block.fields[name] = value;
      }
    });

    // Parse value inputs
    blockEl.querySelectorAll(':scope > value').forEach((valueEl) => {
      const name = valueEl.getAttribute('name');
      const connectedBlock = valueEl.querySelector('block');
      if (name && connectedBlock) {
        const connectedId = connectedBlock.getAttribute('id');
        if (connectedId) {
          block.inputs[name] = connectedId;
        }
      }
    });

    // Parse statement inputs
    blockEl.querySelectorAll(':scope > statement').forEach((statementEl) => {
      const name = statementEl.getAttribute('name');
      const connectedBlock = statementEl.querySelector('block');
      if (name && connectedBlock) {
        const connectedId = connectedBlock.getAttribute('id');
        if (connectedId) {
          block.inputs[name] = connectedId;
        }
      }
    });

    // Parse next connection
    const nextEl = blockEl.querySelector(':scope > next > block');
    if (nextEl) {
      const nextId = nextEl.getAttribute('id');
      if (nextId) {
        block.next = nextId;
      }
    }

    blocks.push(block);
  });

  return blocks;
}

/**
 * Map Blockly block type to React Flow node type
 */
function mapBlockTypeToNodeType(blocklyType: string): string | null {
  // Direct mapping for most blocks
  if (NODE_DEFINITIONS[blocklyType]) {
    return blocklyType;
  }

  // Handle special cases and aliases
  const mappings: Record<string, string> = {
    // Trade parameters
    trade: 'trade_definition',
    trade_definition_market: 'trade_definition',
    trade_definition_tradetype: 'trade_definition',

    // Logic
    controls_if: 'controls_if',
    logic_compare: 'logic_compare',
    logic_operation: 'logic_operation',
    logic_boolean: 'logic_boolean',
    logic_negate: 'logic_negate',

    // Math
    math_number: 'math_number',
    math_arithmetic: 'math_arithmetic',

    // Variables
    variables_get: 'variables_get',
    variables_set: 'variables_set',

    // Text
    text: 'text',
    text_print: 'text_print',
  };

  return mappings[blocklyType] || null;
}

/**
 * Convert Blockly fields to React Flow node data
 */
function convertFields(blocklyType: string, fields: Record<string, any>): Record<string, any> {
  const data: Record<string, any> = {};

  // Copy all fields
  Object.entries(fields).forEach(([key, value]) => {
    // Convert field names to lowercase for consistency
    const fieldName = key.toLowerCase();
    data[fieldName] = value;
  });

  return data;
}

/**
 * Convert Blockly blocks to React Flow nodes and edges
 */
export function convertBlocklyToReactFlow(xml: string): ConversionResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  try {
    // Parse XML
    const blocklyBlocks = parseBlocklyXML(xml);

    if (blocklyBlocks.length === 0) {
      errors.push('No blocks found in XML');
      return { nodes, edges, errors, warnings };
    }

    // Create a map of block IDs for quick lookup
    const blockMap = new Map<string, BlocklyBlock>();
    blocklyBlocks.forEach((block) => {
      blockMap.set(block.id, block);
    });

    // Convert blocks to nodes
    blocklyBlocks.forEach((block) => {
      const nodeType = mapBlockTypeToNodeType(block.type);

      if (!nodeType) {
        warnings.push(`Unknown block type: ${block.type} (ID: ${block.id})`);
        return;
      }

      const definition = NODE_DEFINITIONS[nodeType];
      if (!definition) {
        warnings.push(`No definition found for node type: ${nodeType}`);
        return;
      }

      // Create node
      const node: Node = {
        id: block.id,
        type: nodeType,
        position: { x: block.x, y: block.y },
        data: {
          definition,
          ...convertFields(block.type, block.fields),
        },
      };

      nodes.push(node);
    });

    // Create edges from connections
    let edgeCounter = 0;
    blocklyBlocks.forEach((block) => {
      // Value and statement input connections
      Object.entries(block.inputs).forEach(([inputName, targetId]) => {
        if (targetId) {
          const edge: Edge = {
            id: `e-${edgeCounter++}`,
            source: targetId,
            target: block.id,
            sourceHandle: 'output',
            targetHandle: inputName.toLowerCase(),
          };
          edges.push(edge);
        }
      });

      // Next statement connection
      if (block.next) {
        const edge: Edge = {
          id: `e-${edgeCounter++}`,
          source: block.id,
          target: block.next,
          sourceHandle: 'output',
          targetHandle: 'input',
        };
        edges.push(edge);
      }
    });

    // Adjust positions for better layout
    nodes.forEach((node, index) => {
      // If position is 0,0 or very close, arrange in a grid
      if (node.position.x < 50 && node.position.y < 50) {
        node.position.x = 100 + (index % 3) * 300;
        node.position.y = 100 + Math.floor(index / 3) * 200;
      }
    });

  } catch (error) {
    errors.push(`Conversion error: ${(error as Error).message}`);
  }

  return { nodes, edges, errors, warnings };
}

/**
 * Validate conversion result
 */
export function validateConversion(result: ConversionResult): boolean {
  return result.errors.length === 0 && result.nodes.length > 0;
}

/**
 * Export conversion result as JSON
 */
export function exportConversion(result: ConversionResult): string {
  return JSON.stringify(
    {
      nodes: result.nodes,
      edges: result.edges,
      metadata: {
        convertedAt: new Date().toISOString(),
        nodeCount: result.nodes.length,
        edgeCount: result.edges.length,
        warnings: result.warnings,
      },
    },
    null,
    2
  );
}

/**
 * Load Blockly XML from file
 */
export async function loadBlocklyXMLFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
}
