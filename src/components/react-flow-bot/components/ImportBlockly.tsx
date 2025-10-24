/**
 * Import Blockly Component
 * Allows users to import existing Blockly XML files
 */

import React, { useState, useRef } from 'react';
import {
  convertBlocklyToReactFlow,
  loadBlocklyXMLFromFile,
  exportConversion,
  validateConversion,
} from '../utils/BlocklyConverter';
import { Node, Edge } from 'reactflow';
import './ImportBlockly.scss';

interface ImportBlocklyProps {
  onImport: (nodes: Node[], edges: Edge[]) => void;
  onClose: () => void;
}

const ImportBlockly: React.FC<ImportBlocklyProps> = ({ onImport, onClose }) => {
  const [xmlContent, setXmlContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const content = await loadBlocklyXMLFromFile(file);
      setXmlContent(content);
      handleConvert(content);
    } catch (error) {
      alert(`Error reading file: ${(error as Error).message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvert = (xml?: string) => {
    const content = xml || xmlContent;
    if (!content.trim()) {
      alert('Please provide Blockly XML content');
      return;
    }

    setIsProcessing(true);
    try {
      const result = convertBlocklyToReactFlow(content);
      setConversionResult(result);
      setShowPreview(true);

      if (result.errors.length > 0) {
        console.error('Conversion errors:', result.errors);
      }
      if (result.warnings.length > 0) {
        console.warn('Conversion warnings:', result.warnings);
      }
    } catch (error) {
      alert(`Conversion error: ${(error as Error).message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = () => {
    if (!conversionResult) return;

    if (!validateConversion(conversionResult)) {
      alert('Conversion failed. Please check the errors and try again.');
      return;
    }

    if (
      !confirm(
        `Import ${conversionResult.nodes.length} blocks? This will replace your current workspace.`
      )
    ) {
      return;
    }

    onImport(conversionResult.nodes, conversionResult.edges);
    onClose();
  };

  const handleDownloadJSON = () => {
    if (!conversionResult) return;

    const json = exportConversion(conversionResult);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reactflow-strategy.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="import-blockly">
      <div className="import-blockly__overlay" onClick={onClose} />
      <div className="import-blockly__modal">
        {/* Header */}
        <div className="import-blockly__header">
          <h2>Import Blockly Strategy</h2>
          <button className="import-blockly__close" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="import-blockly__content">
          {!showPreview ? (
            <>
              {/* Upload Section */}
              <div className="import-blockly__upload">
                <div className="import-blockly__upload-area">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xml"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="btn btn--large btn--primary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                  >
                    📁 Choose Blockly XML File
                  </button>
                  <p>or</p>
                  <textarea
                    className="import-blockly__textarea"
                    placeholder="Paste Blockly XML content here..."
                    value={xmlContent}
                    onChange={(e) => setXmlContent(e.target.value)}
                    rows={12}
                    disabled={isProcessing}
                  />
                </div>

                <div className="import-blockly__actions">
                  <button
                    className="btn btn--primary"
                    onClick={() => handleConvert()}
                    disabled={isProcessing || !xmlContent.trim()}
                  >
                    {isProcessing ? '⏳ Converting...' : '🔄 Convert to React Flow'}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="import-blockly__info">
                <h3>How to export Blockly XML:</h3>
                <ol>
                  <li>Open your Blockly-based bot in the old builder</li>
                  <li>Click "Save" or "Export" to download the strategy</li>
                  <li>The file should be in XML format</li>
                  <li>Upload it here to convert to React Flow</li>
                </ol>
              </div>
            </>
          ) : (
            <>
              {/* Preview Section */}
              <div className="import-blockly__preview">
                <h3>Conversion Result</h3>

                <div className="import-blockly__stats">
                  <div className="import-blockly__stat">
                    <span className="import-blockly__stat-value">
                      {conversionResult.nodes.length}
                    </span>
                    <span className="import-blockly__stat-label">Blocks</span>
                  </div>
                  <div className="import-blockly__stat">
                    <span className="import-blockly__stat-value">
                      {conversionResult.edges.length}
                    </span>
                    <span className="import-blockly__stat-label">Connections</span>
                  </div>
                  <div className="import-blockly__stat">
                    <span className="import-blockly__stat-value">
                      {conversionResult.warnings.length}
                    </span>
                    <span className="import-blockly__stat-label">Warnings</span>
                  </div>
                  <div className="import-blockly__stat">
                    <span className="import-blockly__stat-value">
                      {conversionResult.errors.length}
                    </span>
                    <span className="import-blockly__stat-label">Errors</span>
                  </div>
                </div>

                {conversionResult.errors.length > 0 && (
                  <div className="import-blockly__errors">
                    <h4>❌ Errors:</h4>
                    <ul>
                      {conversionResult.errors.map((error: string, idx: number) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {conversionResult.warnings.length > 0 && (
                  <div className="import-blockly__warnings">
                    <h4>⚠️ Warnings:</h4>
                    <ul>
                      {conversionResult.warnings.map((warning: string, idx: number) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {conversionResult.errors.length === 0 && (
                  <div className="import-blockly__success">
                    <p>✅ Conversion successful! Ready to import.</p>
                  </div>
                )}
              </div>

              <div className="import-blockly__actions">
                <button className="btn btn--secondary" onClick={() => setShowPreview(false)}>
                  ← Back
                </button>
                <button className="btn btn--info" onClick={handleDownloadJSON}>
                  📥 Download JSON
                </button>
                <button
                  className="btn btn--success"
                  onClick={handleImport}
                  disabled={conversionResult.errors.length > 0}
                >
                  ✓ Import to Workspace
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportBlockly;
