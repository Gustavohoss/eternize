// src/components/create-note/FormStepper.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface FormStepperProps {
  steps: React.ReactNode[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLastStep: boolean;
  onSubmit: () => void;
  onNext: () => void;
  onPrevious: () => void;
  renderLastStepButton?: React.ReactNode;
}

const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  isLastStep,
  onSubmit,
  onNext,
  onPrevious,
  renderLastStepButton,
}) => {
  return (
    <div className="space-y-8">
      {steps[currentStep]}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
        {isLastStep ? (
          <div className="flex justify-center w-full">
            {renderLastStepButton || (
              <Button
                onClick={onSubmit}
                className="bg-love-red/80 hover:bg-love-red text-white px-8 py-4 text-lg font-medium shadow-lg backdrop-blur-md font-Poppins"
                size="lg"
              >
                <Crown className="mr-2" size={20} />
                Escolher Plano
              </Button>
            )}
          </div>
        ) : (
          <>
            <Button
              onClick={onPrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-800"
            >
              Anterior
            </Button>
            <span className="text-white text-sm">
              {currentStep + 1} / {steps.length}
            </span>
            <Button
              onClick={onNext}
              className="bg-love-red hover:bg-love-red/90 text-white"
            >
              Próximo
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormStepper;
