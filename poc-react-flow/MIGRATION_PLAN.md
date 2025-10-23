# Migration Plan: Blockly to React Flow

## Executive Summary

This document outlines a phased approach to migrating from **Blockly** to **React Flow** for the trading bot's visual programming interface. The migration strategy prioritizes **minimal risk**, **user continuity**, and **incremental value delivery**.

**Timeline:** 6-12 months
**Risk Level:** Low-Medium (phased approach)
**Budget:** ~3-4 months of development effort

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Migration Options](#migration-options)
3. [Recommended Approach](#recommended-approach)
4. [Phase-by-Phase Plan](#phase-by-phase-plan)
5. [Technical Implementation](#technical-implementation)
6. [Risk Management](#risk-management)
7. [Success Metrics](#success-metrics)
8. [Resource Requirements](#resource-requirements)
9. [Timeline & Milestones](#timeline--milestones)
10. [Rollback Strategy](#rollback-strategy)

---

## Current State Analysis

### Existing Blockly Implementation

**Location:** `src/external/bot-skeleton/scratch/`

**Code Statistics:**
- Core implementation: ~5,000 lines
- Custom blocks: ~3,000 lines
- Code generation: ~2,000 lines
- UI/Styling: ~1,500 lines
- **Total:** ~11,500 lines

**Key Components:**
- `dbot.js` - Main Blockly controller
- `hooks/block.js` - Block manipulation methods
- `hooks/block_svg.js` - Visual block management
- `blocks/` - Custom block definitions
- `utils/` - Helper utilities

**Dependencies:**
- Google Blockly (~210KB gzipped)
- Closure Library (indirect)
- jQuery (for some integrations)

### User Base Analysis

**Estimated Users:**
- Active users: ~1,000+
- Daily strategies created: ~100+
- Existing saved strategies: ~10,000+

**User Skill Levels:**
- Beginners (40%): Use simple linear strategies
- Intermediate (40%): Use some conditional logic
- Advanced (20%): Complex multi-branch strategies

### Pain Points with Current System

1. **Performance:** Slow with large strategies (>50 blocks)
2. **Mobile:** Poor mobile/tablet experience
3. **Maintenance:** Complex codebase, hard to extend
4. **TypeScript:** Limited type safety
5. **Bundle Size:** Large initial download
6. **Customization:** Difficult to style/theme

---

## Migration Options

### Option 1: Big Bang Migration
**Replace Blockly entirely in one release**

**Pros:**
- Clean break, no dual maintenance
- Immediate benefits of React Flow
- Simpler codebase post-migration

**Cons:**
- ❌ High risk
- ❌ Potential user backlash
- ❌ All legacy strategies need conversion
- ❌ No fallback option
- ❌ Long testing period

**Timeline:** 3-4 months
**Risk:** 🔴 High

### Option 2: Gradual Migration (Recommended)
**Run both systems in parallel, migrate users gradually**

**Pros:**
- ✅ Low risk
- ✅ User choice
- ✅ Incremental value delivery
- ✅ Easy rollback
- ✅ Learn from user feedback

**Cons:**
- ⚠️ Dual maintenance (temporary)
- ⚠️ Slightly more complex deployment

**Timeline:** 6-12 months
**Risk:** 🟡 Medium

### Option 3: Hybrid Approach
**Use both systems for different use cases**

**Pros:**
- ✅ Best tool for each job
- ✅ Preserve existing investment
- ✅ Gradual learning curve

**Cons:**
- ⚠️ Long-term dual maintenance
- ⚠️ More complex architecture
- ⚠️ Potential user confusion

**Timeline:** 4-6 months
**Risk:** 🟡 Medium

### Option 4: Status Quo
**Keep Blockly, optimize it**

**Pros:**
- ✅ No migration risk
- ✅ Familiar to users
- ✅ No development cost

**Cons:**
- ❌ Technical debt remains
- ❌ No long-term benefits
- ❌ Maintenance burden continues

**Timeline:** N/A
**Risk:** 🟢 Low (but no improvement)

---

## Recommended Approach

**Option 2: Gradual Migration**

We recommend a **phased, gradual migration** that allows both systems to coexist while users transition at their own pace.

### Why This Approach?

1. **Risk Mitigation:** Fallback to Blockly if issues arise
2. **User Continuity:** No forced disruption
3. **Feedback Loop:** Learn from early adopters
4. **Value Delivery:** Ship benefits incrementally
5. **Team Learning:** Developers learn React Flow progressively

---

## Phase-by-Phase Plan

### Phase 0: Preparation (Weeks 1-2)

**Goals:**
- Finalize POC
- Get stakeholder buy-in
- Set up project infrastructure

**Deliverables:**
- ✅ POC reviewed and approved
- ✅ Migration plan approved
- ✅ Project kickoff meeting
- ✅ Development environment setup
- ✅ Feature flags configured

**Success Criteria:**
- All stakeholders aligned
- Budget and resources allocated
- Technical approach validated

---

### Phase 1: Foundation (Weeks 3-8)

**Goals:**
- Build core React Flow infrastructure
- Implement all node types
- Create code generation engine
- Set up A/B testing framework

**Deliverables:**

#### 1.1 Core Node Library (Weeks 3-4)
- [ ] Implement all Blockly blocks as React Flow nodes
  - Trade Definition nodes
  - Before/During/After Purchase nodes
  - Control flow nodes (conditions, loops)
  - Data nodes (variables, lists)
  - Math and logic nodes
  - Text manipulation nodes
  - Analysis nodes (tick analysis, statistics)
  - Custom nodes (notifications, etc.)

#### 1.2 Code Generator (Week 5)
- [ ] Build comprehensive code generator
- [ ] Map node graphs to executable JavaScript
- [ ] Support all Blockly features
- [ ] Add validation engine
- [ ] Create test suite (100+ test cases)

#### 1.3 Node Property Editor (Week 6)
- [ ] Click node to edit properties
- [ ] Form validation
- [ ] Real-time preview
- [ ] Save/cancel actions

#### 1.4 Node Palette (Week 7)
- [ ] Categorized node library
- [ ] Search functionality
- [ ] Drag-and-drop from palette
- [ ] Node descriptions/help

#### 1.5 Integration Layer (Week 8)
- [ ] Integrate with existing execution engine
- [ ] Share state management
- [ ] Add feature flags
- [ ] Set up analytics

**Success Criteria:**
- All Blockly blocks have React Flow equivalents
- Code generation produces identical output
- 95%+ test coverage
- Performance benchmarks met

---

### Phase 2: Alpha Release (Weeks 9-12)

**Goals:**
- Internal testing
- Fix critical bugs
- Gather initial feedback

**Deliverables:**

#### 2.1 Beta Feature Flag (Week 9)
- [ ] Add "Try New Editor" toggle in UI
- [ ] Implement editor switcher
- [ ] Add telemetry tracking
- [ ] Create feedback form

#### 2.2 Strategy Conversion (Week 10)
- [ ] Build Blockly XML → React Flow JSON converter
- [ ] Convert existing strategies on-demand
- [ ] Validate converted strategies
- [ ] Handle edge cases

#### 2.3 Internal Alpha (Week 11-12)
- [ ] Release to internal team (10-20 users)
- [ ] Daily standup reviews
- [ ] Bug fixing
- [ ] UX refinements
- [ ] Documentation updates

**Success Criteria:**
- 0 critical bugs
- Internal team satisfaction: 8+/10
- Strategy conversion success rate: 98%+
- Performance acceptable

---

### Phase 3: Public Beta (Weeks 13-20)

**Goals:**
- Release to early adopters
- Gather user feedback
- Refine UX based on real usage
- Build confidence

**Deliverables:**

#### 3.1 Limited Beta (Weeks 13-14)
- [ ] Invite 50 power users
- [ ] Provide onboarding materials
- [ ] Set up support channel
- [ ] Monitor usage closely

#### 3.2 Expanded Beta (Weeks 15-18)
- [ ] Expand to 500 users
- [ ] A/B test: 50% Blockly, 50% React Flow (for new users)
- [ ] Collect metrics:
  - Strategy creation time
  - Error rates
  - User satisfaction
  - Bug reports

#### 3.3 Refinement (Weeks 19-20)
- [ ] Address top user pain points
- [ ] Polish UI/UX
- [ ] Add requested features
- [ ] Performance optimizations

**Success Criteria:**
- User satisfaction: 8+/10
- Strategy creation time: ≤ Blockly
- Bug report rate: < 5% of sessions
- Conversion rate: 60%+ of testers prefer React Flow

---

### Phase 4: General Availability (Weeks 21-28)

**Goals:**
- Release to all users
- Make React Flow the default for new users
- Maintain Blockly for existing users

**Deliverables:**

#### 4.1 Soft Launch (Weeks 21-22)
- [ ] React Flow as default for new users
- [ ] Blockly remains available via toggle
- [ ] In-app announcement
- [ ] Updated documentation

#### 4.2 Migration Campaign (Weeks 23-26)
- [ ] Email campaign to existing users
- [ ] In-app prompts to try React Flow
- [ ] Migration incentives (badges, features)
- [ ] Video tutorials and guides

#### 4.3 Optimization (Weeks 27-28)
- [ ] Performance tuning based on real usage
- [ ] Cache optimization
- [ ] Bundle size optimization
- [ ] Mobile UX polish

**Success Criteria:**
- 50%+ of new strategies use React Flow
- 30%+ of existing users migrated
- System stability: 99.9%+
- User satisfaction: 8+/10

---

### Phase 5: Consolidation (Weeks 29-40)

**Goals:**
- Increase React Flow adoption
- Prepare for Blockly deprecation
- Ensure all features migrated

**Deliverables:**

#### 5.1 Feature Parity Verification (Weeks 29-30)
- [ ] Audit: Ensure 100% feature parity
- [ ] Fill any gaps
- [ ] Advanced features (if any missed)

#### 5.2 Advanced Features (Weeks 31-34)
- [ ] Debugging mode (breakpoints, step-through)
- [ ] Live execution visualization
- [ ] Performance profiler
- [ ] Strategy templates library

#### 5.3 Migration Push (Weeks 35-38)
- [ ] Stronger prompts for Blockly users
- [ ] Assisted migration tool
- [ ] Support for manual conversions
- [ ] Deprecation warnings

#### 5.4 Monitoring & Optimization (Weeks 39-40)
- [ ] Monitor adoption metrics
- [ ] Optimize based on usage patterns
- [ ] Address long-tail bugs
- [ ] Performance benchmarking

**Success Criteria:**
- 80%+ of new strategies use React Flow
- 60%+ of existing users migrated
- Feature parity: 100%
- Performance: Better than Blockly

---

### Phase 6: Deprecation (Weeks 41-48)

**Goals:**
- Deprecate Blockly
- Complete migration
- Remove technical debt

**Deliverables:**

#### 6.1 Deprecation Notice (Week 41)
- [ ] Announce Blockly deprecation (3-month notice)
- [ ] Communication plan (email, in-app, blog)
- [ ] Migration assistance program
- [ ] FAQ and support resources

#### 6.2 Final Migration Push (Weeks 42-45)
- [ ] Active outreach to remaining Blockly users
- [ ] Offer 1-on-1 migration assistance
- [ ] Automated batch conversion tool
- [ ] Incentives for migration

#### 6.3 Blockly Sunset (Week 46)
- [ ] Remove Blockly from UI (keep backend)
- [ ] Redirect all users to React Flow
- [ ] Keep Blockly available via legacy URL (for 6 months)

#### 6.4 Code Cleanup (Weeks 47-48)
- [ ] Remove Blockly dependencies
- [ ] Clean up dead code
- [ ] Update documentation
- [ ] Final performance audit

**Success Criteria:**
- 95%+ of strategies use React Flow
- < 5% users on legacy Blockly
- Blockly code removed from main bundle
- Bundle size reduced by ~110KB

---

## Technical Implementation

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│         Trading Bot UI (Main App)               │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │   Blockly    │         │   React Flow    │  │
│  │   Editor     │ ◄────► │    Editor       │  │
│  │  (Legacy)    │         │     (New)       │  │
│  └──────┬───────┘         └────────┬────────┘  │
│         │                          │           │
│         └──────────┬───────────────┘           │
│                    │                           │
│         ┌──────────▼──────────┐                │
│         │  Strategy Converter │                │
│         │  (Bidirectional)    │                │
│         └──────────┬──────────┘                │
│                    │                           │
│         ┌──────────▼──────────┐                │
│         │   Execution Engine  │                │
│         │     (Shared)        │                │
│         └─────────────────────┘                │
└─────────────────────────────────────────────────┘
```

### Feature Flags

Use feature flags for gradual rollout:

```typescript
// Feature flag configuration
const features = {
  reactFlowEditor: {
    enabled: true,
    rolloutPercentage: 50, // 50% of new users
    allowToggle: true,      // Users can switch back
  },
  blocklyDeprecation: {
    enabled: false,
    deprecationDate: '2025-06-01',
  },
};
```

### Strategy Format

**Blockly Format (Current):**
```xml
<xml>
  <block type="trade_definition" id="...">
    <field name="TRADETYPE">CALL</field>
    <!-- ... -->
  </block>
</xml>
```

**React Flow Format (New):**
```json
{
  "version": "1.0",
  "nodes": [
    {
      "id": "1",
      "type": "tradeDefinition",
      "data": { "tradeType": "CALL", ... }
    }
  ],
  "edges": [...]
}
```

**Unified Storage:**
```json
{
  "strategyId": "uuid",
  "name": "My Strategy",
  "format": "reactflow", // or "blockly"
  "content": { /* format-specific data */ },
  "metadata": { /* timestamps, version, etc. */ }
}
```

### Code Generation

Both editors generate to the same execution format:

```javascript
// Common execution interface
interface TradingStrategy {
  getTradeConfig(): TradeConfig;
  beforePurchase(): Promise<boolean>;
  duringPurchase(contract: Contract): Promise<void>;
  afterPurchase(contract: Contract): Promise<void>;
}
```

### Database Schema Updates

```sql
-- Add format column to strategies table
ALTER TABLE strategies
ADD COLUMN editor_format VARCHAR(20) DEFAULT 'blockly';

-- Add index for format filtering
CREATE INDEX idx_strategies_format ON strategies(editor_format);

-- Track user preferences
ALTER TABLE users
ADD COLUMN preferred_editor VARCHAR(20) DEFAULT 'blockly';
```

---

## Risk Management

### Risk Assessment Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| User resistance to change | High | High | Gradual migration, user choice |
| Bugs in React Flow editor | Medium | High | Extensive testing, rollback plan |
| Performance issues | Low | Medium | Performance testing, optimization |
| Strategy conversion failures | Medium | High | Fallback to original, manual review |
| Bundle size increase (temp) | High | Low | Code splitting, lazy loading |
| Development delays | Medium | Medium | Buffer time, phased approach |
| Loss of Blockly features | Low | High | Feature parity verification |
| Data loss during conversion | Low | Critical | Backups, validation, rollback |

### Mitigation Strategies

#### For User Resistance:
1. **Education:** Video tutorials, guides, in-app help
2. **Choice:** Allow users to stay on Blockly
3. **Incentives:** Badges, early access to features
4. **Support:** Dedicated support channel

#### For Technical Risks:
1. **Testing:** Comprehensive test suites (unit, integration, E2E)
2. **Monitoring:** Real-time error tracking, usage analytics
3. **Rollback:** Feature flags for instant rollback
4. **Backups:** Automatic strategy backups before conversion

#### For Performance:
1. **Benchmarking:** Regular performance tests
2. **Optimization:** Lazy loading, code splitting
3. **Caching:** Aggressive caching strategies
4. **CDN:** Static assets on CDN

---

## Success Metrics

### Key Performance Indicators (KPIs)

#### Adoption Metrics
- **New User Adoption:** % of new users choosing React Flow
  - Target: 80%+ by Phase 4
- **Migration Rate:** % of existing users migrated
  - Target: 60%+ by Phase 5
- **Daily Active Users (DAU):** React Flow vs Blockly
  - Target: React Flow > Blockly by Phase 4

#### User Experience Metrics
- **Strategy Creation Time:** Average time to create a strategy
  - Target: ≤ Blockly baseline
- **Error Rate:** % of sessions with errors
  - Target: < 3%
- **User Satisfaction:** NPS or CSAT score
  - Target: 8+/10

#### Technical Metrics
- **Page Load Time:** Initial load time
  - Target: < 2s (vs 3s+ for Blockly)
- **Bundle Size:** JavaScript bundle size
  - Target: -50KB gzipped
- **Crash Rate:** % of sessions with crashes
  - Target: < 0.1%

#### Business Metrics
- **Strategy Quality:** % of strategies that execute successfully
  - Target: ≥ Blockly baseline
- **Support Tickets:** Editor-related support volume
  - Target: < Blockly baseline after stabilization
- **Retention Rate:** User retention
  - Target: ≥ Blockly baseline

### Monitoring Dashboard

Set up real-time dashboard tracking:
- Editor usage split (Blockly vs React Flow)
- Strategy creation rates
- Error rates and types
- Performance metrics
- User feedback scores

---

## Resource Requirements

### Team Structure

**Core Team:**
- **1 Tech Lead:** Overall architecture, code review
- **2 Frontend Developers:** React Flow implementation
- **1 Backend Developer:** API changes, data migration
- **1 QA Engineer:** Testing, automation
- **1 Product Manager:** Coordination, user research
- **0.5 Designer:** UI/UX refinements

**Total:** 5.5 FTE for 6 months

### External Resources

- **User Research:** 5-10 user interviews per phase
- **Beta Testers:** 50-500 users
- **Documentation Writer:** Technical writing
- **Video Producer:** Tutorial videos

### Budget Estimate

**Development:**
- Core team (5.5 FTE × 6 months): ~$180k-240k

**Tools & Services:**
- Feature flags platform: $200/month
- Analytics/monitoring: $500/month
- Testing tools: $300/month

**User Research:**
- User interviews: $5k
- Beta incentives: $2k

**Total Estimated Budget:** $190k-250k

---

## Timeline & Milestones

### High-Level Timeline

```
Weeks 1-2:   Phase 0 - Preparation
Weeks 3-8:   Phase 1 - Foundation
Weeks 9-12:  Phase 2 - Alpha Release
Weeks 13-20: Phase 3 - Public Beta
Weeks 21-28: Phase 4 - General Availability
Weeks 29-40: Phase 5 - Consolidation
Weeks 41-48: Phase 6 - Deprecation

Total: 48 weeks (12 months)
```

### Key Milestones

| Milestone | Week | Description |
|-----------|------|-------------|
| **M1: POC Approved** | 2 | Stakeholder approval, project kickoff |
| **M2: Foundation Complete** | 8 | All nodes implemented, code generator ready |
| **M3: Alpha Release** | 12 | Internal testing complete, ready for beta |
| **M4: Beta Launch** | 14 | First external users on React Flow |
| **M5: General Availability** | 22 | React Flow default for new users |
| **M6: 50% Migration** | 30 | Half of active users on React Flow |
| **M7: Feature Parity** | 34 | 100% Blockly features in React Flow |
| **M8: Deprecation Notice** | 41 | Announce Blockly sunset |
| **M9: Blockly Sunset** | 46 | Remove Blockly from primary UI |
| **M10: Project Complete** | 48 | Code cleanup done, migration complete |

### Critical Path

```
POC → Foundation → Code Generator → Alpha → Beta → GA → Consolidation → Deprecation
```

Any delays in Foundation or Alpha phases will push entire timeline.

---

## Rollback Strategy

### When to Rollback

Trigger rollback if:
- Critical bug affecting >10% of users
- Data loss incidents
- Performance degradation >50%
- User satisfaction drops below 6/10
- Adoption stalls at <20%

### Rollback Procedures

#### Level 1: Feature Flag Rollback (Immediate)
```typescript
// Disable React Flow instantly
setFeatureFlag('reactFlowEditor', false);
```
- Takes effect immediately
- All users revert to Blockly
- No data loss
- **Rollback time:** < 5 minutes

#### Level 2: Code Rollback (1-2 hours)
```bash
# Revert to previous deployment
git revert HEAD
npm run build
npm run deploy
```
- Rollback full deployment
- Requires rebuild
- **Rollback time:** 1-2 hours

#### Level 3: Data Rollback (4-6 hours)
```sql
-- Restore from backup
RESTORE DATABASE strategies FROM backup_file;
```
- Only if data corruption
- Restore from last backup
- May lose recent changes
- **Rollback time:** 4-6 hours

### Post-Rollback Actions

1. **Incident Report:** Document what happened
2. **Root Cause Analysis:** Identify cause
3. **Fix & Test:** Resolve issue in dev
4. **Communication:** Inform users
5. **Re-deploy:** When ready, with extra monitoring

---

## Appendices

### Appendix A: Technology Stack

**React Flow:**
- Version: 11.10.4
- License: MIT
- Docs: https://reactflow.dev/

**Supporting Libraries:**
- React: 18.2+
- TypeScript: 5.3+
- Zustand: 4.5+ (state management)
- Vite: 5.0+ (bundler)

### Appendix B: Testing Strategy

**Unit Tests:**
- Node components: 100% coverage
- Code generator: 100% coverage
- Utilities: 100% coverage

**Integration Tests:**
- Editor interactions
- Strategy conversion
- Code execution

**E2E Tests:**
- User flows (create, save, load, execute)
- Cross-browser testing
- Mobile testing

**Performance Tests:**
- Load time benchmarks
- Large strategy handling (100+ nodes)
- Memory usage monitoring

### Appendix C: Communication Plan

**Internal:**
- Weekly status emails
- Biweekly demo sessions
- Slack channel for updates

**External:**
- Blog post announcing beta
- Email campaigns to users
- In-app announcements
- Tutorial videos

### Appendix D: Training Materials

Create:
- **Video Tutorials:** 5-10 short videos
- **Documentation:** Updated user guide
- **FAQ:** Common questions and answers
- **Migration Guide:** Step-by-step for existing users

---

## Conclusion

This migration plan provides a **low-risk, phased approach** to transitioning from Blockly to React Flow. By allowing both systems to coexist and giving users choice, we minimize disruption while delivering the benefits of a modern, performant visual programming interface.

**Key Success Factors:**
1. Excellent user communication
2. Comprehensive testing at each phase
3. Real-time monitoring and quick response
4. Flexibility to adjust based on feedback
5. Clear rollback procedures

**Expected Outcomes:**
- 80%+ user adoption of React Flow
- 50%+ reduction in bundle size
- Improved performance and mobile experience
- Cleaner, more maintainable codebase
- Higher user satisfaction

---

**Document Version:** 1.0
**Last Updated:** October 2024
**Owner:** Trading Bot Development Team
**Review Date:** Quarterly
