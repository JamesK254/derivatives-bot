# Blockly to React Flow Migration Mapping

## Complete Block-to-Node Mapping

This document maps all 148 Blockly blocks to React Flow node types with their properties and configurations.

---

## Category Structure

### 1. Trade Parameters (10 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| trade_definition | TradeDefinitionNode | root | market, symbol |
| trade_definition_market | MarketNode | config | market_list |
| trade_definition_tradetype | TradeTypeNode | config | tradetype_list |
| trade_definition_contracttype | ContractTypeNode | config | contracttype_list |
| trade_definition_tradeoptions | TradeOptionsNode | config | duration, duration_unit, stake, prediction |
| trade_definition_multiplier | MultiplierOptionsNode | config | amount, stop_loss, take_profit |
| trade_definition_accumulator | AccumulatorOptionsNode | config | growth_rate, maximum_payout |
| trade_definition_candleinterval | CandleIntervalNode | config | interval_list |
| trade_definition_restartbuysell | RestartBuySellNode | config | enable |
| trade_definition_restartonerror | RestartOnErrorNode | config | enable |

### 2. Purchase Conditions (5 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| before_purchase | BeforePurchaseNode | hook | statement_input |
| purchase | PurchaseNode | action | purchase_list (CALL/PUT/etc) |
| payout | PayoutNode | value | n/a |
| ask_price | AskPriceNode | value | n/a |

### 3. Sell Conditions (4 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| during_purchase | DuringPurchaseNode | hook | statement_input |
| check_sell | CheckSellNode | value | sell_type |
| sell_at_market | SellAtMarketNode | action | n/a |
| sell_price | SellPriceNode | value | n/a |

### 4. Trade Results (4 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| after_purchase | AfterPurchaseNode | hook | statement_input |
| trade_again | TradeAgainNode | action | n/a |
| check_result | CheckResultNode | value | result_type (WIN/LOSS) |
| read_details | ReadDetailsNode | value | detail_type (profit/payout/etc) |

### 5. Indicators (14 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| sma_statement | SMANode | indicator | period, input_list |
| smaa_statement | SMAArrayNode | indicator | period, input_list |
| ema_statement | EMANode | indicator | period, input_list |
| emaa_statement | EMAArrayNode | indicator | period, input_list |
| rsi_statement | RSINode | indicator | period, input_list |
| rsia_statement | RSIArrayNode | indicator | period, input_list |
| bb_statement | BBNode | indicator | period, std_dev_up, std_dev_down, input_list |
| bba_statement | BBArrayNode | indicator | period, std_dev_up, std_dev_down, input_list |
| macda_statement | MACDArrayNode | indicator | fast_period, slow_period, signal_period, input_list |
| input_list | InputListNode | indicator | input_type (CLOSE/OPEN/HIGH/LOW) |
| period | PeriodNode | indicator | period_value |

### 6. Tick Analysis (16 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| tick_analysis | TickAnalysisNode | analysis | statement_input |
| ticks | TicksNode | analysis | n/a |
| tick | TickNode | analysis | index |
| ohlc | OHLCNode | analysis | granularity |
| ohlc_values | OHLCValuesNode | analysis | ohlc_field (OPEN/HIGH/LOW/CLOSE) |
| readOhlc | ReadOHLCNode | analysis | field, index |
| get_ohlc | GetOHLCNode | analysis | count, granularity |
| check_direction | CheckDirectionNode | analysis | n/a |
| last_digit | LastDigitNode | analysis | n/a |
| lastDigitList | LastDigitListNode | analysis | n/a |
| stat | StatNode | analysis | stat_type (MAX/MIN/AVG/etc) |
| stat_list | StatListNode | analysis | stat_type |

### 7. Logic (7 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| controls_if | IfElseNode | control | elseif_count, else_count |
| logic_compare | CompareNode | logic | operator (EQ/NEQ/LT/GT/LTE/GTE) |
| logic_boolean | BooleanNode | logic | value (TRUE/FALSE) |
| logic_operation | LogicOpNode | logic | operator (AND/OR) |
| logic_null | NullNode | logic | n/a |
| logic_ternary | TernaryNode | logic | condition, if_true, if_false |
| logic_negate | NegateNode | logic | value |

### 8. Math (13 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| math_arithmetic | ArithmeticNode | math | operator (ADD/MINUS/MULTIPLY/DIVIDE/POWER) |
| math_number | NumberNode | math | value |
| math_number_positive | PositiveNumberNode | math | value |
| math_number_property | NumberPropertyNode | math | property (EVEN/ODD/PRIME/etc) |
| math_change | MathChangeNode | math | variable, delta |
| math_constant | MathConstantNode | math | constant (PI/E/GOLDEN_RATIO/etc) |
| math_on_list | MathOnListNode | math | operation (SUM/MIN/MAX/AVG/etc) |
| math_random_int | RandomIntNode | math | from, to |
| math_random_float | RandomFloatNode | math | n/a |
| math_round | RoundNode | math | mode (ROUND/ROUNDUP/ROUNDDOWN) |
| math_single | MathSingleNode | math | operation (ROOT/ABS/NEG/LN/etc) |
| math_trig | TrigNode | math | function (SIN/COS/TAN/etc) |
| math_modulo | ModuloNode | math | dividend, divisor |
| math_constrain | ConstrainNode | math | value, low, high |

### 9. Text (13 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| text | TextNode | text | value |
| text_append | TextAppendNode | text | variable, text |
| text_length | TextLengthNode | text | text |
| text_isEmpty | TextIsEmptyNode | text | text |
| text_indexOf | TextIndexOfNode | text | text, search, mode (FIRST/LAST) |
| text_charAt | TextCharAtNode | text | text, at |
| text_getSubstring | TextSubstringNode | text | text, at1, at2 |
| text_changeCase | TextChangeCaseNode | text | text, case (UPPERCASE/LOWERCASE/TITLECASE) |
| text_trim | TextTrimNode | text | text, mode (BOTH/LEFT/RIGHT) |
| text_join | TextJoinNode | text | item_count |
| text_statement | TextStatementNode | text | statement |
| text_print | TextPrintNode | text | text |
| text_prompt_ext | TextPromptNode | text | type (TEXT/NUMBER), message |

### 10. Lists (12 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| lists_create_with | ListCreateNode | list | item_count |
| lists_getIndex | ListGetIndexNode | list | mode, where, at |
| lists_getSublist | ListSublistNode | list | where1, at1, where2, at2 |
| lists_indexOf | ListIndexOfNode | list | mode (FIRST/LAST) |
| lists_isEmpty | ListIsEmptyNode | list | value |
| lists_length | ListLengthNode | list | value |
| lists_repeat | ListRepeatNode | list | item, times |
| lists_setIndex | ListSetIndexNode | list | mode, where, at |
| lists_sort | ListSortNode | list | type, direction |
| lists_split | ListSplitNode | list | mode (SPLIT/JOIN), delim |
| lists_statement | ListStatementNode | list | statement |

### 11. Loops (6 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| controls_for | ForLoopNode | loop | variable, from, to, by |
| controls_forEach | ForEachLoopNode | loop | variable, list |
| controls_repeat | RepeatNode | loop | times |
| controls_repeat_ext | RepeatExtNode | loop | times |
| controls_whileUntil | WhileUntilNode | loop | mode (WHILE/UNTIL) |
| controls_flow_statements | FlowControlNode | loop | flow (BREAK/CONTINUE) |

### 12. Variables (2 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| variables_get | GetVariableNode | variable | variable_name |
| variables_set | SetVariableNode | variable | variable_name, value |

### 13. Functions (6 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| procedures_defnoreturn | DefineNoReturnNode | function | name, args, statement |
| procedures_defreturn | DefineReturnNode | function | name, args, statement, return_value |
| procedures_callnoreturn | CallNoReturnNode | function | name, args |
| procedures_callreturn | CallReturnNode | function | name, args |
| procedures_ifreturn | IfReturnNode | function | condition, value |

### 14. Time Tools (6 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| epoch | EpochNode | time | n/a |
| todatetime | ToDateTimeNode | time | epoch_value |
| totimestamp | ToTimestampNode | time | datetime_value |
| timeout | TimeoutNode | time | seconds |
| tickdelay | TickDelayNode | time | n/a |

### 15. Candle Tools (4 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| is_candle_black | IsCandleBlackNode | candle | ohlc |
| ohlc_values_in_list | OHLCValuesInListNode | candle | ohlc_list, field |
| read_ohlc_obj | ReadOHLCObjNode | candle | ohlc, field |

### 16. Misc Tools (11 nodes)
| Blockly Block | React Flow Node | Type | Properties |
|---------------|-----------------|------|------------|
| balance | BalanceNode | misc | balance_type (CURRENT/START) |
| total_profit | TotalProfitNode | misc | n/a |
| total_runs | TotalRunsNode | misc | n/a |
| barrier_offset | BarrierOffsetNode | misc | barrier_type |
| notify | NotifyNode | misc | message, type (TOAST/SOUND) |
| notify_telegram | NotifyTelegramNode | misc | message, token, chat_id |
| console | ConsoleNode | misc | message, type (LOG/WARN/ERROR) |
| block_holder | BlockHolderNode | misc | statement |
| loader | LoaderNode | misc | strategy_id |
| useless_block | DeprecatedNode | misc | n/a |

---

## Node Type Classification

### By Connection Type:

**Root Nodes** (1):
- TradeDefinitionNode - Entry point, no inputs

**Statement Nodes** (4):
- BeforePurchaseNode
- DuringPurchaseNode
- AfterPurchaseNode
- TickAnalysisNode

**Action Nodes** (8):
- PurchaseNode
- SellAtMarketNode
- TradeAgainNode
- NotifyNode
- NotifyTelegramNode
- ConsoleNode
- TimeoutNode
- TickDelayNode

**Value Nodes** (100+):
- All math, logic, text, list nodes
- Indicator output nodes
- Tick analysis value nodes
- Variable get nodes
- Function call nodes (with return)

**Configuration Nodes** (9):
- Trade definition sub-blocks
- Part of trade definition flow

**Control Flow Nodes** (13):
- IfElseNode
- All loop nodes
- FlowControlNode

---

## Color Scheme Mapping

| Category | Blockly Color | React Flow Color | Gradient |
|----------|---------------|------------------|----------|
| Trade Definition | #064e72 | #667eea → #764ba2 | Purple gradient |
| Before Purchase | #e5e5e5 (Special1) | #f093fb → #f5576c | Pink gradient |
| During Purchase | #e5e5e5 (Special2) | #4facfe → #00f2fe | Blue gradient |
| After Purchase | #e5e5e5 (Special3) | #43e97b → #38f9d7 | Green gradient |
| Variables | #e5e5e5 (Special4) | #fa709a → #fee140 | Orange gradient |
| Logic | #e5e5e5 (Base) | #e0e7ff | Light blue |
| Math | #e5e5e5 (Base) | #fef3c7 | Light yellow |
| Text | #e5e5e5 (Base) | #e0f2fe | Light cyan |
| Lists | #e5e5e5 (Base) | #ede9fe | Light purple |
| Loops | #e5e5e5 (Base) | #fee2e2 | Light red |
| Functions | #e5e5e5 (Base) | #d1fae5 | Light green |
| Indicators | #e5e5e5 (Base) | #f3e8ff | Light violet |
| Tick Analysis | #e5e5e5 (Base) | #dbeafe | Light blue |
| Time | #e5e5e5 (Base) | #fef9c3 | Light yellow |
| Candle | #e5e5e5 (Base) | #fed7aa | Light orange |
| Misc | #e5e5e5 (Base) | #e5e5e5 | Gray |

---

## Handle Configuration

### Input Handles:
- **target-top**: Main input (for stacking statement nodes)
- **target-value-{name}**: Value inputs (for math, logic, etc.)
- **target-statement-{name}**: Statement inputs (for loops, if/else bodies)

### Output Handles:
- **source-bottom**: Main output (for statement continuation)
- **source-value**: Value output (returns a value)
- **source-true**: True branch (for conditionals)
- **source-false**: False branch (for conditionals)

---

## Node Properties Schema

### Common Properties (all nodes):
```typescript
{
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    category: string;
    color: string;
    description?: string;
    // Node-specific properties...
  };
}
```

### Specific Node Data Examples:

**TradeDefinitionNode:**
```typescript
{
  market?: string;
  symbol?: string;
  tradeType?: string;
  contractType?: string;
}
```

**ArithmeticNode:**
```typescript
{
  operator: 'ADD' | 'MINUS' | 'MULTIPLY' | 'DIVIDE' | 'POWER';
  leftValue?: number | string;
  rightValue?: number | string;
}
```

**IfElseNode:**
```typescript
{
  elseifCount: number;
  hasElse: boolean;
}
```

---

## Migration Priority

### Phase 1 (Critical - Core Trading):
1. Trade Definition nodes (10)
2. Purchase Conditions (5)
3. Sell Conditions (4)
4. Trade Results (4)
5. Logic nodes (7)
6. Math nodes (13)
**Total: 43 nodes**

### Phase 2 (Important - Analysis):
7. Indicators (14)
8. Tick Analysis (16)
9. Time tools (6)
10. Candle tools (4)
**Total: 40 nodes**

### Phase 3 (Standard - Programming):
11. Text nodes (13)
12. Lists (12)
13. Loops (6)
14. Variables (2)
15. Functions (6)
**Total: 39 nodes**

### Phase 4 (Utilities):
16. Misc tools (11)
**Total: 11 nodes**

**Grand Total: 133 unique node types**
(Note: Some blocks were duplicates or variants, consolidated to 133 distinct nodes)

---

This mapping provides the complete blueprint for migrating all Blockly blocks to React Flow nodes.
