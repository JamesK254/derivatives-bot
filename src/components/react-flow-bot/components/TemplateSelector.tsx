/**
 * Template Selector Component
 * Allows users to browse and load pre-built strategy templates
 */

import React, { useState, useMemo } from 'react';
import { STRATEGY_TEMPLATES, StrategyTemplate } from '../config/templates';
import './TemplateSelector.scss';

interface TemplateSelectorProps {
  onSelectTemplate: (template: StrategyTemplate) => void;
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    let templates = STRATEGY_TEMPLATES;

    // Filter by category
    if (selectedCategory !== 'all') {
      templates = templates.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      templates = templates.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return templates;
  }, [searchQuery, selectedCategory]);

  const handleTemplateClick = (template: StrategyTemplate) => {
    if (
      template.nodes.length > 0 &&
      !confirm(`Load "${template.name}"? This will replace your current workspace.`)
    ) {
      return;
    }
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div className="template-selector">
      <div className="template-selector__overlay" onClick={onClose} />
      <div className="template-selector__modal">
        {/* Header */}
        <div className="template-selector__header">
          <h2>Strategy Templates</h2>
          <button className="template-selector__close" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* Search and Filter */}
        <div className="template-selector__controls">
          <input
            type="text"
            className="template-selector__search"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="template-selector__filters">
            <button
              className={`template-selector__filter ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button
              className={`template-selector__filter ${selectedCategory === 'beginner' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('beginner')}
            >
              Beginner
            </button>
            <button
              className={`template-selector__filter ${selectedCategory === 'intermediate' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('intermediate')}
            >
              Intermediate
            </button>
            <button
              className={`template-selector__filter ${selectedCategory === 'advanced' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('advanced')}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Template Grid */}
        <div className="template-selector__grid">
          {filteredTemplates.length === 0 ? (
            <div className="template-selector__empty">
              <p>No templates found matching your criteria.</p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`template-selector__card template-selector__card--${template.category}`}
                onClick={() => handleTemplateClick(template)}
              >
                <div className="template-selector__card-header">
                  <h3>{template.name}</h3>
                  <span className={`template-selector__badge template-selector__badge--${template.category}`}>
                    {template.category}
                  </span>
                </div>
                <p className="template-selector__description">{template.description}</p>
                <div className="template-selector__tags">
                  {template.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="template-selector__tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="template-selector__stats">
                  <span>{template.nodes.length} blocks</span>
                  <span>{template.edges.length} connections</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="template-selector__footer">
          <p>
            Select a template to get started quickly. You can customize it after loading.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
