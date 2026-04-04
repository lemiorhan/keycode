import type {AiSimulation, AiSimulationStep} from './types.js';

const AI_SIM_TAG_PATTERN = /<ai-sim\b([^>]*)>([\s\S]*?)<\/ai-sim>/i;
const AI_STEP_TAG_PATTERN = /<ai-step\b([^>]*)>\s*([\s\S]*?)\s*<\/ai-step>/gi;
const AI_FINAL_TAG_PATTERN = /<ai-final>\s*([\s\S]*?)\s*<\/ai-final>/i;
const DEFAULT_INTERVAL_MIN_MS = 3000;
const DEFAULT_INTERVAL_MAX_MS = 5000;
const MIN_INTERVAL_MS = 50;

function clampInterval(value: number, fallback: number): number {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(Math.round(value), MIN_INTERVAL_MS);
}

function parseInterval(attributesText: string, attributeName: string, fallback: number): number {
  const match = attributesText.match(
    new RegExp(`\\b${attributeName}=(?:"|')?(\\d+)(?:"|')?`, 'i')
  );

  return clampInterval(Number(match?.[1] ?? fallback), fallback);
}

export function extractAiSimulation(content: string): {body: string; aiSimulation?: AiSimulation} {
  const match = content.match(AI_SIM_TAG_PATTERN);

  if (!match) {
    return {
      body: content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').trimEnd()
    };
  }

  const attributesText = match[1] ?? '';
  const simulationBody = match[2] ?? '';
  const intervalMinMs = parseInterval(attributesText, 'interval-min', DEFAULT_INTERVAL_MIN_MS);
  const intervalMaxMs = Math.max(
    parseInterval(attributesText, 'interval-max', DEFAULT_INTERVAL_MAX_MS),
    intervalMinMs
  );
  const steps: AiSimulationStep[] = [];

  for (const stepMatch of simulationBody.matchAll(AI_STEP_TAG_PATTERN)) {
    const stepAttributesText = stepMatch[1] ?? '';
    const stepContent = (stepMatch[2] ?? '').trim();

    if (!stepContent) {
      continue;
    }

    const delayMatch = stepAttributesText.match(/\bdelay-ms=(?:"|')?(\d+)(?:"|')?/i);
    const delayMs = delayMatch ? clampInterval(Number(delayMatch[1]), intervalMinMs) : undefined;

    steps.push({
      content: stepContent,
      ...(delayMs !== undefined ? {delayMs} : {})
    });
  }

  const finalMatch = simulationBody.match(AI_FINAL_TAG_PATTERN);
  const finalContent = finalMatch?.[1]?.trim();
  const body = content
    .replace(AI_SIM_TAG_PATTERN, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trimEnd();

  if (steps.length === 0 && !finalContent) {
    return {body};
  }

  return {
    body,
    aiSimulation: {
      intervalMinMs,
      intervalMaxMs,
      steps,
      finalContent: finalContent?.length ? finalContent : undefined
    }
  };
}
