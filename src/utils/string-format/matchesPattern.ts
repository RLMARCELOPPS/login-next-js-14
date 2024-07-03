export function matchesPattern(
  value: string | undefined,
  pattern: RegExp
): boolean {
  return value ? pattern.test(value) : false;
}
