import type {AiSimulation} from './types.js';

export interface AiSimulationProgress {
  emittedStepCount: number;
  isComplete: boolean;
}

export function resolveAiSimulationDelay(
  simulation: AiSimulation,
  stepIndex: number,
  randomValue: number = Math.random()
): number {
  const step = simulation.steps[stepIndex];

  if (step?.delayMs !== undefined) {
    return step.delayMs;
  }

  const min = simulation.intervalMinMs;
  const max = Math.max(simulation.intervalMaxMs, min);
  const normalizedRandom = Math.min(Math.max(randomValue, 0), 0.999999999999);

  return min + Math.floor(normalizedRandom * (max - min + 1));
}

export function nextAiSimulationProgress(
  progress: AiSimulationProgress | undefined,
  simulation: AiSimulation
): AiSimulationProgress {
  const emittedStepCount = Math.min(
    (progress?.emittedStepCount ?? 0) + 1,
    simulation.steps.length
  );

  return {
    emittedStepCount,
    isComplete: emittedStepCount >= simulation.steps.length
  };
}

export function startAiSimulationProgress(): AiSimulationProgress {
  return {
    emittedStepCount: 0,
    isComplete: false
  };
}

export function completeAiSimulationProgress(simulation: AiSimulation): AiSimulationProgress {
  return {
    emittedStepCount: simulation.steps.length,
    isComplete: true
  };
}
