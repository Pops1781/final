import { useLocation } from "react-router-dom";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className="bg-white px-5 py-4 mt-2">
      <div className="flex items-center justify-between w-full">
        {steps.map((label, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;
          const isUpcoming = currentStep < index + 1;
          return (
            <div key={label} className="flex items-center flex-1 min-w-0">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm transition-all
                  ${isCurrent 
                    ? "bg-[#5ec401] text-white border-2 border-[#5ec401]"
                    : isCompleted 
                      ? "bg-[#5ec401] text-white border-2 border-[#5ec401]" 
                      : "bg-white text-gray-400 border-2 border-gray-300"}
                `}
              >
                {index + 1}
              </div>
              {/* Step Label */}
              <span
                className={`ml-1 text-sm font-medium transition-all
                  ${isCurrent ? "text-[#5ec401]" : isCompleted ? "text-[#5ec401]" : "text-gray-400"}
                `}
              >
                {label}
              </span>
              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all
                    ${isCompleted ? "bg-[#5ec401]" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 