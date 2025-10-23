import { Node, Edge } from 'reactflow';
import { TradingNodeData, GeneratedCode } from '../types/trading.types';

/**
 * Converts a React Flow graph into executable JavaScript code
 * Similar to how Blockly generates code from blocks
 */
export class TradingCodeGenerator {
  private nodes: Node<TradingNodeData>[];
  private edges: Edge[];
  private nodeMap: Map<string, Node<TradingNodeData>>;
  private edgeMap: Map<string, Edge[]>;

  constructor(nodes: Node<TradingNodeData>[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
    this.nodeMap = new Map(nodes.map(node => [node.id, node]));

    // Create edge map: nodeId -> outgoing edges
    this.edgeMap = new Map();
    edges.forEach(edge => {
      const existing = this.edgeMap.get(edge.source) || [];
      existing.push(edge);
      this.edgeMap.set(edge.source, existing);
    });
  }

  /**
   * Generate JavaScript code from the flow
   */
  generate(): GeneratedCode {
    const tradeDefNode = this.findStartNode();

    if (!tradeDefNode) {
      return {
        javascript: '// No trade definition found',
      };
    }

    const code = this.generateStrategyCode(tradeDefNode);

    return {
      javascript: code,
      blocklyEquivalent: this.generateBlocklyEquivalent(),
    };
  }

  /**
   * Find the starting node (trade definition)
   */
  private findStartNode(): Node<TradingNodeData> | undefined {
    return this.nodes.find(node => node.type === 'tradeDefinition');
  }

  /**
   * Generate the complete trading strategy code
   */
  private generateStrategyCode(startNode: Node<TradingNodeData>): string {
    const lines: string[] = [];

    lines.push('// Auto-generated Trading Strategy');
    lines.push('// Generated from React Flow visual programming');
    lines.push('');
    lines.push('class TradingStrategy {');
    lines.push('  constructor() {');
    lines.push('    this.variables = {};');
    lines.push('    this.context = {');
    lines.push('      balance: 0,');
    lines.push('      profit: 0,');
    lines.push('      totalRuns: 0,');
    lines.push('    };');
    lines.push('  }');
    lines.push('');

    // Generate trade definition
    lines.push('  // Trade Definition');
    lines.push('  getTradeConfig() {');
    lines.push('    return {');
    lines.push(`      tradeType: '${startNode.data.tradeType || 'CALL'}',`);
    lines.push(`      market: '${startNode.data.market || 'forex'}',`);
    lines.push(`      symbol: '${startNode.data.symbol || 'frxEURUSD'}',`);
    lines.push(`      stake: ${startNode.data.stake || 1},`);
    lines.push(`      duration: ${startNode.data.duration || 5},`);
    lines.push(`      durationType: '${startNode.data.durationType || 'ticks'}',`);
    lines.push('    };');
    lines.push('  }');
    lines.push('');

    // Find and generate before purchase
    const beforePurchaseNode = this.findNextNode(startNode.id, 'beforePurchase');
    if (beforePurchaseNode) {
      lines.push('  // Before Purchase Hook');
      lines.push('  async beforePurchase() {');
      lines.push('    console.log("Before purchase validation...");');
      if (beforePurchaseNode.data.condition) {
        lines.push(`    // Condition: ${beforePurchaseNode.data.condition}`);
        lines.push(`    if (${this.convertConditionToCode(beforePurchaseNode.data.condition)}) {`);
        lines.push('      return true; // Proceed with purchase');
        lines.push('    }');
        lines.push('    return false; // Skip purchase');
      } else {
        lines.push('    return true; // No conditions, proceed');
      }
      lines.push('  }');
      lines.push('');
    }

    // Find and generate during purchase
    const duringPurchaseNode = this.findNextNode(beforePurchaseNode?.id || startNode.id, 'duringPurchase');
    if (duringPurchaseNode) {
      lines.push('  // During Purchase Hook');
      lines.push('  async duringPurchase(contract) {');
      lines.push('    console.log("Monitoring trade...", contract);');
      if (duringPurchaseNode.data.action) {
        lines.push(`    // Action: ${duringPurchaseNode.data.action}`);
        lines.push(`    ${this.convertActionToCode(duringPurchaseNode.data.action)}`);
      }
      lines.push('  }');
      lines.push('');
    }

    // Find and generate after purchase
    const afterPurchaseNode = this.findNextNode(duringPurchaseNode?.id || beforePurchaseNode?.id || startNode.id, 'afterPurchase');
    if (afterPurchaseNode) {
      lines.push('  // After Purchase Hook');
      lines.push('  async afterPurchase(contract) {');
      lines.push('    console.log("Trade completed", contract);');
      lines.push('    this.context.totalRuns++;');
      lines.push('    ');
      if (afterPurchaseNode.data.action) {
        lines.push(`    // Action: ${afterPurchaseNode.data.action}`);
        lines.push(`    ${this.convertActionToCode(afterPurchaseNode.data.action)}`);
      }
      if (afterPurchaseNode.data.notificationMessage) {
        lines.push(`    this.notify('${afterPurchaseNode.data.notificationMessage}');`);
      }
      lines.push('    ');
      lines.push('    // Update profit/loss');
      lines.push('    if (contract.profit > 0) {');
      lines.push('      this.context.profit += contract.profit;');
      lines.push('      console.log("Win! Total profit:", this.context.profit);');
      lines.push('    } else {');
      lines.push('      this.context.profit += contract.profit;');
      lines.push('      console.log("Loss. Total profit:", this.context.profit);');
      lines.push('    }');
      lines.push('  }');
      lines.push('');
    }

    // Helper methods
    lines.push('  // Helper Methods');
    lines.push('  notify(message) {');
    lines.push('    console.log("[NOTIFICATION]:", message);');
    lines.push('    // Could integrate with Telegram, Email, etc.');
    lines.push('  }');
    lines.push('');
    lines.push('  async run() {');
    lines.push('    const config = this.getTradeConfig();');
    lines.push('    console.log("Starting strategy with config:", config);');
    lines.push('    ');
    lines.push('    // Simulated trading loop');
    lines.push('    const canProceed = await this.beforePurchase();');
    lines.push('    if (!canProceed) {');
    lines.push('      console.log("Conditions not met, skipping trade");');
    lines.push('      return;');
    lines.push('    }');
    lines.push('    ');
    lines.push('    // Simulate contract purchase');
    lines.push('    const contract = {');
    lines.push('      id: Math.random().toString(36),');
    lines.push('      ...config,');
    lines.push('      profit: Math.random() > 0.5 ? 0.85 : -1, // 50% win rate');
    lines.push('    };');
    lines.push('    ');
    lines.push('    await this.duringPurchase(contract);');
    lines.push('    await this.afterPurchase(contract);');
    lines.push('  }');
    lines.push('}');
    lines.push('');
    lines.push('// Export strategy');
    lines.push('export default TradingStrategy;');
    lines.push('');
    lines.push('// Example usage:');
    lines.push('// const strategy = new TradingStrategy();');
    lines.push('// strategy.run();');

    return lines.join('\n');
  }

  /**
   * Find next node of a specific type
   */
  private findNextNode(fromNodeId: string, type?: string): Node<TradingNodeData> | undefined {
    const outgoingEdges = this.edgeMap.get(fromNodeId) || [];

    for (const edge of outgoingEdges) {
      const targetNode = this.nodeMap.get(edge.target);
      if (targetNode && (!type || targetNode.type === type)) {
        return targetNode;
      }
    }

    return undefined;
  }

  /**
   * Convert a condition string to JavaScript code
   */
  private convertConditionToCode(condition: string): string {
    // Simple conversion - in a real system, you'd parse this properly
    return condition.replace(/balance/g, 'this.context.balance')
                   .replace(/profit/g, 'this.context.profit')
                   .replace(/totalRuns/g, 'this.context.totalRuns');
  }

  /**
   * Convert an action string to JavaScript code
   */
  private convertActionToCode(action: string): string {
    // Simple conversion - in a real system, you'd parse this properly
    return action + ';';
  }

  /**
   * Generate equivalent Blockly XML (for comparison)
   */
  private generateBlocklyEquivalent(): string {
    return `
<!-- Equivalent Blockly XML structure -->
<xml>
  <block type="trade_definition">
    <field name="TRADETYPE">CALL</field>
    <field name="MARKET">forex</field>
    <next>
      <block type="before_purchase">
        <statement name="BEFOREPURCHASE_STACK">
          <!-- Before purchase logic -->
        </statement>
        <next>
          <block type="during_purchase">
            <statement name="DURINGPURCHASE_STACK">
              <!-- During purchase logic -->
            </statement>
            <next>
              <block type="after_purchase">
                <statement name="AFTERPURCHASE_STACK">
                  <!-- After purchase logic -->
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
    `.trim();
  }
}

/**
 * Convenience function to generate code from nodes and edges
 */
export function generateCode(nodes: Node<TradingNodeData>[], edges: Edge[]): GeneratedCode {
  const generator = new TradingCodeGenerator(nodes, edges);
  return generator.generate();
}
