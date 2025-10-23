import TradeDefinitionNode from './TradeDefinitionNode';
import BeforePurchaseNode from './BeforePurchaseNode';
import DuringPurchaseNode from './DuringPurchaseNode';
import AfterPurchaseNode from './AfterPurchaseNode';
import ConditionNode from './ConditionNode';
import ActionNode from './ActionNode';

// Export all node types for React Flow
export const nodeTypes = {
  tradeDefinition: TradeDefinitionNode,
  beforePurchase: BeforePurchaseNode,
  duringPurchase: DuringPurchaseNode,
  afterPurchase: AfterPurchaseNode,
  condition: ConditionNode,
  action: ActionNode,
};

export {
  TradeDefinitionNode,
  BeforePurchaseNode,
  DuringPurchaseNode,
  AfterPurchaseNode,
  ConditionNode,
  ActionNode,
};
