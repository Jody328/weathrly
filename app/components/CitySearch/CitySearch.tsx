"use client";

import { useAutocomplete } from "@/app/hooks/useAutocomplete";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface CitySearchProps {
  onCitySelect: (city: string) => void;
}

export const CitySearch = ({ onCitySelect }: CitySearchProps) => {
  const {
    inputValue,
    suggestions,
    isSuggestionsVisible,
    activeIndex,
    suggestionsTitle,
    rootRef,
    setInputValue,
    setActiveIndex,
    updateSuggestions,
    reset,
    showPopularCities,
  } = useAutocomplete();

  const handleSelect = (city: string) => {
    setInputValue(city);
    onCitySelect(city);
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && activeIndex > -1) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex].city);
      return;
    }
    if (!isSuggestionsVisible) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Escape":
        reset();
        break;
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={rootRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => updateSuggestions(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={showPopularCities}
          placeholder="Search for a city..."
          autoComplete="off"
          className="w-full rounded-full border border-gray-200 bg-white/80 py-3 pl-12 pr-6 text-gray-800 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {isSuggestionsVisible && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full z-10 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white/80 shadow-lg backdrop-blur-sm"
        >
          <li className="px-4 pt-2 pb-1 text-xs font-semibold uppercase text-gray-400">
            {suggestionsTitle}
          </li>

          {suggestions.map((city, index) => (
            <li
              key={`${city.city}-${index}`}
              onClick={() => handleSelect(city.city)}
              className={clsx(
                "cursor-pointer px-4 py-2 text-gray-700 transition-colors duration-150",
                { "bg-blue-500/10": index === activeIndex },
                "hover:bg-blue-500/10"
              )}
            >
              {city.city},{" "}
              <span className="font-light text-gray-500">{city.country}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};
