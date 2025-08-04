import { motion } from "framer-motion";
import { LoaderCircle, AlertTriangle } from "lucide-react";

interface StatusDisplayProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const StatusDisplay = ({
  isLoading,
  isError,
  error,
}: StatusDisplayProps) => {
  let content;

  if (isLoading) {
    content = (
      <>
        <LoaderCircle className="h-6 w-6 animate-spin text-gray-500" />
        <span className="text-gray-500">Fetching weather...</span>
      </>
    );
  } else if (isError) {
    content = (
      <>
        <AlertTriangle className="h-6 w-6 text-red-500" />
        <span className="text-red-500">{`Error: ${error?.message}`}</span>
      </>
    );
  } else {
    content = (
      <span className="text-gray-500">
        Search for a city to see the weather.
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-4 font-medium"
    >
      {content}
    </motion.div>
  );
};
