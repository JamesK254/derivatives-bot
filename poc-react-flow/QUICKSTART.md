# Quick Start Guide

Get the React Flow POC running in 3 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn

## Steps

### 1. Install Dependencies

```bash
cd poc-react-flow
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:3001`

### 3. Try It Out

**Basic Usage:**
1. You'll see a pre-configured trading strategy flow
2. Drag nodes to rearrange them
3. Click "Generate Code" to see the JavaScript output
4. Click "Save Strategy" to download the flow as JSON

**Create Connections:**
1. Click and drag from a small circle (handle) on one node
2. Drop onto a circle on another node
3. The edge will be created with animation

**View Code:**
1. Click the "Generate Code" button in the top-right
2. A panel opens showing the generated JavaScript
3. Click "Download" to save the code
4. Click "Close" to hide the panel

## Keyboard Shortcuts

- **Delete**: Remove selected node/edge
- **Cmd/Ctrl + Z**: Undo (coming soon)
- **Cmd/Ctrl + C**: Copy (coming soon)
- **Cmd/Ctrl + V**: Paste (coming soon)

## Loading Example Strategies

To load the advanced examples:

1. Edit `src/components/TradingFlow.tsx`
2. Replace the imports:
```typescript
import {
  advancedStrategyNodes,
  advancedStrategyEdges
} from '../examples/advancedStrategy';
```

3. Replace `initialNodes` and `initialEdges`:
```typescript
const initialNodes = advancedStrategyNodes;
const initialEdges = advancedStrategyEdges;
```

4. Save and the app will hot-reload

## Available Examples

In `src/examples/advancedStrategy.ts`:

- **advancedStrategy** - Complex flow with conditional logic
- **martingaleStrategy** - Martingale betting system with loops

## Building for Production

```bash
npm run build
```

Output will be in `dist/` directory.

Preview the build:
```bash
npm run preview
```

## Troubleshooting

### Port 3001 already in use
Edit `vite.config.ts` and change the port:
```typescript
server: {
  port: 3002, // Change this
}
```

### Dependencies won't install
Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hot reload not working
Restart the dev server:
```bash
# Stop with Ctrl+C
npm run dev
```

## Next Steps

1. Read the main [README.md](./README.md) for full documentation
2. Explore the code in `src/`
3. Try creating custom nodes
4. Experiment with the code generator

## Need Help?

- Check React Flow docs: https://reactflow.dev/
- Review the code comments
- Compare with Blockly implementation in `../src/external/bot-skeleton/scratch/`

Happy coding! 🚀
