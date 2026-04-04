import test from 'node:test';
import assert from 'node:assert/strict';
import {
  completeAiSimulationProgress,
  nextAiSimulationProgress,
  resolveAiSimulationDelay,
  startAiSimulationProgress
} from '../src/aiSimulation.js';
import type {AiSimulation} from '../src/types.js';

test('resolveAiSimulationDelay honors explicit per-step delays', () => {
  const simulation: AiSimulation = {
    intervalMinMs: 3000,
    intervalMaxMs: 5000,
    steps: [{content: 'Step 1', delayMs: 1200}, {content: 'Step 2'}],
    finalContent: 'Done'
  };

  assert.equal(resolveAiSimulationDelay(simulation, 0, 0.9), 1200);
});

test('resolveAiSimulationDelay uses the configured random interval range', () => {
  const simulation: AiSimulation = {
    intervalMinMs: 3000,
    intervalMaxMs: 5000,
    steps: [{content: 'Step 1'}],
    finalContent: 'Done'
  };

  assert.equal(resolveAiSimulationDelay(simulation, 0, 0), 3000);
  assert.equal(resolveAiSimulationDelay(simulation, 0, 0.5), 4000);
  assert.equal(resolveAiSimulationDelay(simulation, 0, 0.999999), 5000);
});

test('ai simulation progress completes after the last step', () => {
  const simulation: AiSimulation = {
    intervalMinMs: 3000,
    intervalMaxMs: 5000,
    steps: [{content: 'Step 1'}, {content: 'Step 2'}],
    finalContent: 'Done'
  };

  const started = startAiSimulationProgress();
  const first = nextAiSimulationProgress(started, simulation);
  const second = nextAiSimulationProgress(first, simulation);

  assert.deepEqual(started, {emittedStepCount: 0, isComplete: false});
  assert.deepEqual(first, {emittedStepCount: 1, isComplete: false});
  assert.deepEqual(second, {emittedStepCount: 2, isComplete: true});
});

test('completeAiSimulationProgress reveals all steps immediately', () => {
  const simulation: AiSimulation = {
    intervalMinMs: 3000,
    intervalMaxMs: 5000,
    steps: [{content: 'Step 1'}, {content: 'Step 2'}, {content: 'Step 3'}],
    finalContent: 'Done'
  };

  assert.deepEqual(completeAiSimulationProgress(simulation), {
    emittedStepCount: 3,
    isComplete: true
  });
});
