/**
 * useUndoRedo Hook
 * Provides undo/redo functionality for React Flow nodes and edges
 */

import { useState, useCallback, useRef } from 'react';
import { Node, Edge } from 'reactflow';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

interface UseUndoRedoReturn {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  takeSnapshot: () => void;
  clear: () => void;
}

const MAX_HISTORY_SIZE = 50;

export const useUndoRedo = (
  nodes: Node[],
  edges: Edge[],
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void
): UseUndoRedoReturn => {
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isUndoRedoAction = useRef(false);

  // Take a snapshot of current state
  const takeSnapshot = useCallback(() => {
    if (isUndoRedoAction.current) {
      return;
    }

    setHistory((prev) => {
      // Remove any states after current index (when user made changes after undo)
      const newHistory = prev.slice(0, currentIndex + 1);

      // Add new snapshot
      const newSnapshot = {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
      };

      newHistory.push(newSnapshot);

      // Limit history size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift();
        setCurrentIndex(MAX_HISTORY_SIZE - 1);
        return newHistory;
      }

      setCurrentIndex(newHistory.length - 1);
      return newHistory;
    });
  }, [nodes, edges, currentIndex]);

  // Undo to previous state
  const undo = useCallback(() => {
    if (currentIndex <= 0) return;

    const previousIndex = currentIndex - 1;
    const previousState = history[previousIndex];

    isUndoRedoAction.current = true;
    setNodes(JSON.parse(JSON.stringify(previousState.nodes)));
    setEdges(JSON.parse(JSON.stringify(previousState.edges)));
    setCurrentIndex(previousIndex);

    // Reset flag after state updates
    setTimeout(() => {
      isUndoRedoAction.current = false;
    }, 0);
  }, [currentIndex, history, setNodes, setEdges]);

  // Redo to next state
  const redo = useCallback(() => {
    if (currentIndex >= history.length - 1) return;

    const nextIndex = currentIndex + 1;
    const nextState = history[nextIndex];

    isUndoRedoAction.current = true;
    setNodes(JSON.parse(JSON.stringify(nextState.nodes)));
    setEdges(JSON.parse(JSON.stringify(nextState.edges)));
    setCurrentIndex(nextIndex);

    // Reset flag after state updates
    setTimeout(() => {
      isUndoRedoAction.current = false;
    }, 0);
  }, [currentIndex, history, setNodes, setEdges]);

  // Clear history
  const clear = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  return {
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    takeSnapshot,
    clear,
  };
};
