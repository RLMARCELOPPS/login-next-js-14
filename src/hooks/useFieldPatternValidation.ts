import { useState } from "react";

export type PatternType = boolean | undefined;

interface PatternValidation {
  [pattern: string]: PatternType;
}

export const useFieldPatternValidation = (initialPatterns: string[]) => {
  const [patternState, setPatternState] = useState<PatternValidation>(
    initialPatterns.reduce(
      (acc, pattern) => ({ ...acc, [pattern]: undefined }),
      {}
    )
  );

  //To only validate the field after it moved out of focus
  const [fieldTouched, setFieldTouched] = useState(false);

  const updateFieldRequirements = (
    value: string,
    patterns: { [key: string]: RegExp }
  ) => {
    const newState = { ...patternState };
    for (const patternKey of Object.keys(patterns)) {
      newState[patternKey] = patterns[patternKey].test(value);
    }
    setPatternState(newState);
  };

  return {
    patternState,
    setFieldTouched,
    fieldTouched,
    updateFieldRequirements,
  } as const;
};
