"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CitySearch } from "./components/CitySearch/CitySearch";
import { StatusDisplay } from "./components/common/StatusDisplay";
import { WeatherDisplay } from "./components/WeatherDisplay/WeatherDisplay";
import { useWeather } from "./hooks/useWeather";

export default function WeatherPage() {
  const { weather, isLoading, isError, error, fetchForCity } = useWeather();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6">
      <motion.div
        className="flex w-full flex-col items-center gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            Weathrly
          </h1>
          <p className="mt-2 text-base text-gray-600 md:text-lg">
            Your instantaneous weather guide
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full max-w-md">
          <CitySearch onCitySelect={fetchForCity} />
        </motion.div>

        <div className="flex items-center justify-center mt-4 w-full max-w-md min-h-[250px] rounded-2xl border border-white/30 bg-white/50 p-6 shadow-xl backdrop-blur-lg">
          <AnimatePresence mode="wait">
            {weather && !isLoading ? (
              <WeatherDisplay key="weather" data={weather} />
            ) : (
              <StatusDisplay
                key="status"
                isLoading={isLoading}
                isError={isError}
                error={error}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
}
