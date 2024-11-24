import React, { useState, useEffect } from "react";

type TextSliderProps = {
  words: string[];
  interval?: number;
};

const TextSlider: React.FC<TextSliderProps> = ({ words, interval = 3000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordChange = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(wordChange);
  }, [words.length, interval]);

  return (
    <div className="relative h-[64px] overflow-hidden">
      <div
        className="absolute transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentWordIndex * 35}%)` }}
      >
        {words.map((word, index) => (
          <div
            key={index}
            className="h-[64px] flex items-center justify-start text-5xl font-bold from-blue-600 to-white bg-gradient-to-tr bg-clip-text text-transparent"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;
