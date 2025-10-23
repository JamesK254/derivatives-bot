/**
 * Code Generator - Converts React Flow graph to executable JavaScript
 * Replaces Blockly's JavaScript code generator
 */

import { Node, Edge } from 'reactflow';
import { NodeDefinition } from '../config/nodeDefinitions';

export interface GeneratedCode {
  javascript: string;
  errors: string[];
  warnings: string[];
}

export class CodeGenerator {
  private nodes: Node[];
  private edges: Edge[];
  private nodeMap: Map<string, Node>;
  private edgeMap: Map<string, Edge[]>;
  private visitedNodes: Set<string>;
  private errors: string[];
  private warnings: string[];

  constructor(nodes: Node[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
    this.nodeMap = new Map(nodes.map(node => [node.id, node]));
    this.edgeMap = this.buildEdgeMap();
    this.visitedNodes = new Set();
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Main generation method
   */
  generate(): GeneratedCode {
    this.visitedNodes.clear();
    this.errors = [];
    this.warnings = [];

    // Find root node (trade_definition)
    const rootNode = this.nodes.find(node => node.type === 'trade_definition');

    if (!rootNode) {
      this.errors.push('No Trade Definition block found. This block is required to start trading.');
      return {
        javascript: '// ERROR: Missing Trade Definition block',
        errors: this.errors,
        warnings: this.warnings,
      };
    }

    // Validate mandatory blocks
    this.validateMandatoryBlocks();

    if (this.errors.length > 0) {
      return {
        javascript: '// ERROR: Validation failed. See errors below.\n// ' + this.errors.join('\n// '),
        errors: this.errors,
        warnings: this.warnings,
      };
    }

    // Generate code
    let code = this.generateHeader();
    code += this.generateFromRoot(rootNode);
    code += this.generateFooter();

    return {
      javascript: code,
      errors: this.errors,
      warnings: this.warnings,
    };
  }

  /**
   * Build edge map for quick lookups
   */
  private buildEdgeMap(): Map<string, Edge[]> {
    const map = new Map<string, Edge[]>();

    this.edges.forEach(edge => {
      // Outgoing edges (source)
      const outgoing = map.get(edge.source) || [];
      outgoing.push(edge);
      map.set(edge.source, outgoing);
    });

    return map;
  }

  /**
   * Validate mandatory blocks
   */
  private validateMandatoryBlocks() {
    const tradeDefNode = this.nodes.find(n => n.type === 'trade_definition');
    if (!tradeDefNode) {
      this.errors.push('Trade Definition block is required');
    }

    const beforePurchaseNode = this.nodes.find(n => n.type === 'before_purchase');
    if (!beforePurchaseNode) {
      this.errors.push('Purchase Conditions (before_purchase) block is required');
    }

    const purchaseNode = this.nodes.find(n => n.type === 'purchase');
    if (!purchaseNode) {
      this.errors.push('Purchase block is required');
    }

    // Check for trade options
    const hasTradeOptions = this.nodes.some(n =>
      n.type === 'trade_definition_tradeoptions' ||
      n.type === 'trade_definition_multiplier' ||
      n.type === 'trade_definition_accumulator'
    );

    if (!hasTradeOptions) {
      this.errors.push('Trade Options block is required (tradeoptions/multiplier/accumulator)');
    }

    // Check for single instance blocks
    const singleInstanceTypes = ['trade_definition', 'before_purchase', 'during_purchase', 'after_purchase'];
    singleInstanceTypes.forEach(type => {
      const count = this.nodes.filter(n => n.type === type).length;
      if (count > 1) {
        this.errors.push(`Only one ${type} block is allowed. Found ${count}.`);
      }
    });
  }

  /**
   * Generate code header
   */
  private generateHeader(): string {
    return `/**
 * Auto-generated Trading Bot Strategy
 * Generated from React Flow visual programming
 * Date: ${new Date().toISOString()}
 */

/* global Bot, notify */

// Initialize bot
let tradeConfig = {};
let context = {
  balance: 0,
  profit: 0,
  totalRuns: 0,
  variables: {},
};

`;
  }

  /**
   * Generate code from root node
   */
  private generateFromRoot(rootNode: Node): string {
    let code = '';

    // Traverse the flow starting from root
    code += this.traverseStatementChain(rootNode);

    return code;
  }

  /**
   * Traverse a chain of statement blocks
   */
  private traverseStatementChain(startNode: Node): string {
    let code = '';
    let currentNode: Node | undefined = startNode;

    while (currentNode) {
      if (this.visitedNodes.has(currentNode.id)) {
        this.warnings.push(`Circular reference detected at node ${currentNode.id}`);
        break;
      }

      this.visitedNodes.add(currentNode.id);

      // Generate code for current node
      code += this.generateNodeCode(currentNode);

      // Find next node in chain
      const nextEdge = this.getOutgoingEdges(currentNode.id).find(
        e => e.sourceHandle === 'output'
      );

      if (nextEdge) {
        currentNode = this.nodeMap.get(nextEdge.target);
      } else {
        currentNode = undefined;
      }
    }

    return code;
  }

  /**
   * Generate code for a single node
   */
  private generateNodeCode(node: Node): string {
    const definition: NodeDefinition | undefined = node.data.definition;

    if (!definition) {
      this.errors.push(`Node ${node.id} has no definition`);
      return `// ERROR: Missing definition for node ${node.id}\n`;
    }

    // Collect input values from connected nodes
    const inputs: Record<string, string> = {};

    this.getIncomingEdges(node.id).forEach(edge => {
      const sourceNode = this.nodeMap.get(edge.source);
      if (sourceNode) {
        const handleId = edge.targetHandle || 'input';
        inputs[handleId] = this.generateNodeValue(sourceNode);
      }
    });

    // Use the node's code generator
    try {
      const generatedCode = definition.codeGenerator(node.data, inputs);
      return generatedCode;
    } catch (error) {
      this.errors.push(`Error generating code for node ${node.id}: ${error}`);
      return `// ERROR: Failed to generate code for ${definition.label}\n`;
    }
  }

  /**
   * Generate value code for a node (used for value nodes)
   */
  private generateNodeValue(node: Node): string {
    const definition: NodeDefinition | undefined = node.data.definition;

    if (!definition) {
      return '/* missing definition */';
    }

    // For value nodes, generate the value expression
    const inputs: Record<string, string> = {};

    this.getIncomingEdges(node.id).forEach(edge => {
      const sourceNode = this.nodeMap.get(edge.source);
      if (sourceNode) {
        const handleId = edge.targetHandle || 'input';
        inputs[handleId] = this.generateNodeValue(sourceNode);
      }
    });

    try {
      return definition.codeGenerator(node.data, inputs);
    } catch (error) {
      this.errors.push(`Error generating value for node ${node.id}: ${error}`);
      return '/* error */';
    }
  }

  /**
   * Get outgoing edges for a node
   */
  private getOutgoingEdges(nodeId: string): Edge[] {
    return this.edgeMap.get(nodeId) || [];
  }

  /**
   * Get incoming edges for a node
   */
  private getIncomingEdges(nodeId: string): Edge[] {
    return this.edges.filter(edge => edge.target === nodeId);
  }

  /**
   * Generate code footer
   */
  private generateFooter(): string {
    return `
// Export strategy
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { tradeConfig, context };
}
`;
  }

  /**
   * Find a specific node type
   */
  private findNode(type: string): Node | undefined {
    return this.nodes.find(node => node.type === type);
  }

  /**
   * Find all nodes of a specific type
   */
  private findNodes(type: string): Node[] {
    return this.nodes.filter(node => node.type === type);
  }

  /**
   * Get variables defined in the workspace
   */
  public getDefinedVariables(): string[] {
    const variables = new Set<string>();

    this.nodes.forEach(node => {
      if (node.type === 'variables_set' || node.type === 'variables_get') {
        if (node.data.variable) {
          variables.add(node.data.variable);
        }
      }
    });

    return Array.from(variables);
  }

  /**
   * Get functions defined in the workspace
   */
  public getDefinedFunctions(): string[] {
    const functions = new Set<string>();

    this.nodes.forEach(node => {
      if (node.type === 'procedures_defnoreturn' || node.type === 'procedures_defreturn') {
        if (node.data.name) {
          functions.add(node.data.name);
        }
      }
    });

    return Array.from(functions);
  }
}

/**
 * Quick generate function
 */
export function generateCode(nodes: Node[], edges: Edge[]): GeneratedCode {
  const generator = new CodeGenerator(nodes, edges);
  return generator.generate();
}

/**
 * Validate flow without generating code
 */
export function validateFlow(nodes: Node[], edges: Edge[]): { valid: boolean; errors: string[]; warnings: string[] } {
  const generator = new CodeGenerator(nodes, edges);
  const result = generator.generate();

  return {
    valid: result.errors.length === 0,
    errors: result.errors,
    warnings: result.warnings,
  };
}
