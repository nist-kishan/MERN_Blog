import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const Stepper = forwardRef(({ currentPage, isSuccess }, ref) => {
  const steps = ["1", "2", "3", "P"];

  return (
    <div ref={ref} className="flex justify-between items-center px-6 relative">
      {steps.map((label, index) => {
        const isActive = currentPage === index + 1;
        const isCompleted = currentPage > index + 1;

        const renderLabel = () => {
          if (label === "P" && isSuccess !== null) {
            return isSuccess ? <Check size={20} /> : <X size={20} />;
          }
          return isCompleted ? <Check size={20} /> : label;
        };

        return (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 text-sm transition-all duration-300
                ${
                  isCompleted || (label === "P" && isSuccess)
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-white text-blue-600 dark:bg-gray-900 dark:text-blue-400 shadow-md ring-2 ring-blue-500"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: isActive ? "0 0 10px 4px rgba(59,130,246,0.5)" : undefined,
              }}
              whileHover={{ scale: 1.1 }}
            >
              {renderLabel()}
            </motion.div>

            {index !== steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-1 -z-10">
                <div
                  className={`h-full ${
                    currentPage > index + 1
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-400"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default Stepper;
