import Image from "next/image";
import { motion } from "framer-motion";
import { WeatherData } from "@/app/types";

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay = ({ data }: WeatherDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
        {data.name}
      </h2>
      <p className="text-6xl font-light text-gray-900 md:text-7xl">
        {Math.round(data.main.temp)}
        <span className="text-3xl align-super">°C</span>
      </p>

      <div className="flex items-center justify-center gap-3 rounded-full bg-blue-500/10 px-4 py-2">
        <Image
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          width={40}
          height={40}
        />
        <span className="text-base font-medium capitalize text-gray-700 md:text-lg">
          {data.weather[0].description}
        </span>
      </div>
    </motion.div>
  );
};
