/**
 * Node Palette - Replaces Blockly Toolbox
 * Categorized drag-and-drop node library
 */

import React, { useState, useMemo, useCallback } from 'react';
import { NodeDefinition, NodeCategory, searchNodes, getNodesByCategory } from '../config/nodeDefinitions';
import './NodePalette.scss';

interface NodePaletteProps {
  onNodeSelect: (definition: NodeDefinition) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CATEGORY_LABELS: Record<NodeCategory, string> = {
  trade_parameters: '📊 Trade Parameters',
  purchase_conditions: '🔍 Purchase Conditions',
  sell_conditions: '⏱️ Sell Conditions',
  trade_results: '✅ Trade Results',
  indicators: '📈 Indicators',
  tick_analysis: '📉 Tick Analysis',
  logic: '🔀 Logic',
  math: '🔢 Math',
  text: '📝 Text',
  lists: '📋 Lists',
  loops: '🔁 Loops',
  variables: '📦 Variables',
  functions: '⚙️ Functions',
  time: '⏰ Time',
  candle: '🕯️ Candles',
  misc: '🛠️ Miscellaneous',
};

const CATEGORY_ORDER: NodeCategory[] = [
  'trade_parameters',
  'purchase_conditions',
  'sell_conditions',
  'trade_results',
  'indicators',
  'tick_analysis',
  'logic',
  'math',
  'text',
  'lists',
  'loops',
  'variables',
  'functions',
  'time',
  'candle',
  'misc',
];

const NodePalette: React.FC<NodePaletteProps> = ({ onNodeSelect, isOpen, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<NodeCategory>>(
    new Set(['trade_parameters', 'purchase_conditions'])
  );

  const filteredNodes = useMemo(() => {
    if (searchQuery.trim()) {
      return searchNodes(searchQuery);
    }
    return null;
  }, [searchQuery]);

  const toggleCategory = useCallback((category: NodeCategory) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const handleNodeDragStart = useCallback((event: React.DragEvent, definition: NodeDefinition) => {
    event.dataTransfer.setData('application/reactflow-node', JSON.stringify(definition));
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleNodeClick = useCallback((definition: NodeDefinition) => {
    onNodeSelect(definition);
  }, [onNodeSelect]);

  if (!isOpen) {
    return (
      <button onClick={onToggle} className="node-palette-toggle node-palette-toggle--closed">
        ≫ Show Blocks
      </button>
    );
  }

  return (
    <div className="node-palette">
      {/* Header */}
      <div className="node-palette__header">
        <h3 className="node-palette__title">Blocks</h3>
        <button onClick={onToggle} className="node-palette__close">
          ✕
        </button>
      </div>

      {/* Search */}
      <div className="node-palette__search">
        <input
          type="text"
          placeholder="Search blocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="node-palette__search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="node-palette__search-clear"
          >
            ✕
          </button>
        )}
      </div>

      {/* Content */}
      <div className="node-palette__content">
        {filteredNodes ? (
          // Search results
          <div className="node-palette__search-results">
            <div className="node-palette__category-title">
              {filteredNodes.length} result{filteredNodes.length !== 1 ? 's' : ''} found
            </div>
            {filteredNodes.map((node) => (
              <NodePaletteItem
                key={node.id}
                definition={node}
                onDragStart={handleNodeDragStart}
                onClick={handleNodeClick}
              />
            ))}
          </div>
        ) : (
          // Category view
          <>
            {CATEGORY_ORDER.map((category) => {
              const nodes = getNodesByCategory(category);
              if (nodes.length === 0) return null;

              const isExpanded = expandedCategories.has(category);

              return (
                <div key={category} className="node-palette__category">
                  <button
                    className="node-palette__category-header"
                    onClick={() => toggleCategory(category)}
                  >
                    <span className="node-palette__category-icon">
                      {isExpanded ? '▼' : '▶'}
                    </span>
                    <span className="node-palette__category-label">
                      {CATEGORY_LABELS[category]}
                    </span>
                    <span className="node-palette__category-count">
                      ({nodes.length})
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="node-palette__category-items">
                      {nodes.map((node) => (
                        <NodePaletteItem
                          key={node.id}
                          definition={node}
                          onDragStart={handleNodeDragStart}
                          onClick={handleNodeClick}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

interface NodePaletteItemProps {
  definition: NodeDefinition;
  onDragStart: (event: React.DragEvent, definition: NodeDefinition) => void;
  onClick: (definition: NodeDefinition) => void;
}

const NodePaletteItem: React.FC<NodePaletteItemProps> = ({ definition, onDragStart, onClick }) => {
  return (
    <div
      className="node-palette-item"
      draggable
      onDragStart={(e) => onDragStart(e, definition)}
      onClick={() => onClick(definition)}
      style={{
        borderLeft: `4px solid ${definition.color}`,
      }}
    >
      <div className="node-palette-item__content">
        <div className="node-palette-item__header">
          {definition.icon && (
            <span className="node-palette-item__icon">{definition.icon}</span>
          )}
          <span className="node-palette-item__label">{definition.label}</span>
        </div>
        {definition.description && (
          <div className="node-palette-item__description">{definition.description}</div>
        )}
        {definition.isMandatory && (
          <span className="node-palette-item__badge node-palette-item__badge--required">
            REQUIRED
          </span>
        )}
        {definition.singleInstance && (
          <span className="node-palette-item__badge node-palette-item__badge--single">
            SINGLE
          </span>
        )}
      </div>
    </div>
  );
};

export default NodePalette;
