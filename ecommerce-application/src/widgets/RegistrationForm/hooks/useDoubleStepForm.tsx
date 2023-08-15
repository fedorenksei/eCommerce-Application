import { ReactElement, useState } from 'react';

export const useDoubleStepForm = (steps: ReactElement[]) => {
  const [currStepIndex, setCurrStepIndex] = useState(0);

  const nextStep = () => {
    if (currStepIndex < steps.length - 1) {
      setCurrStepIndex((step) => step + 1);
    }
  };

  const prevStep = () => {
    if (currStepIndex > 0) {
      setCurrStepIndex((step) => step - 1);
    }
  };

  return {
    currStepIndex,
    currStepElem: steps[currStepIndex],
    nextStep,
    prevStep,
  };
};
