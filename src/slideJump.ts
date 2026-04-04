export function parseSlideJumpTarget(input: string, slideCount: number): number | undefined {
  if (!/^\d+$/.test(input)) {
    return undefined;
  }

  const slideNumber = Number.parseInt(input, 10);

  if (!Number.isFinite(slideNumber) || slideNumber < 1 || slideNumber > slideCount) {
    return undefined;
  }

  return slideNumber - 1;
}
