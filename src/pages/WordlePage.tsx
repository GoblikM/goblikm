import { useEffect, useState } from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import Modal from "../components/shared/Modal";
import { time } from "console";

const MAX_ATTEMPTS = 5;

const WordlePage = () => {
  const [guesses, setGuesses] = useState(["", "", "", "", ""]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [word, setWord] = useState("APPLE");
  const [canType, setCanType] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  /**
   * Handles the keydown event for the Wordle game.
   *
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (currentRow >= MAX_ATTEMPTS || !canType) {
      return;
    }

    if (e.key === "Enter" && currentGuess.length === 5) {
      const newGuesses = [...guesses];
      newGuesses[currentRow] = currentGuess.toUpperCase();
      setGuesses(newGuesses);
      if (currentGuess === word) {
        setCanType(false);
        setTimeout(() => {
          setIsModalVisible(true);
        }, 1500);
      }
      setCurrentGuess("");
      setCurrentRow(currentRow + 1);
    } else if (e.key === "Backspace") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + e.key.toUpperCase());
      console.log(guesses);
      console.log(currentRow);
      console.log(currentGuess);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, currentRow]);

  return (
    <>
      <Layout title="Wordle">
        <div className="flex flex-col items-center">
          <p className="mt-3 text-base sm:text-lg text-slate-500 text-center max-w-80">
            <span className="italic text-sm">
              Wordle is a web-based word game created and developed by Welsh
              software engineer Josh Wardle.
            </span>
            <p className="pt-3">
              {" "}
              <strong>Guess the word in 5 attempts.</strong>
            </p>
          </p>
          <div className="mt-10">
            {guesses.map((guess, index) => (
              <Row
                key={index}
                guess={index === currentRow ? currentGuess : guess}
                word={word}
                isActiveRow={index === currentRow}
                isEvaluated={index < currentRow}
              />
            ))}
          </div>
          <Modal
            onClose={() => setIsModalVisible(false)}
            isVisible={isModalVisible}
          >
            <Results />
          </Modal>
        </div>
      </Layout>
    </>
  );
};

export default WordlePage;

const Row = ({
  guess,
  word,
  isActiveRow,
  isEvaluated,
}: {
  guess: string;
  word: string;
  isActiveRow: boolean;
  isEvaluated: boolean;
}) => {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    const char = guess[i] || "";
    let className =
      "tile border w-16 h-16 flex items-center justify-center text-2xl font-bold";
    if (char) className += " border-white";

    if (isEvaluated) {
      // Evaluate only if the guess is complete
      if (char === word[i]) {
        className += " bg-green-500 text-white border-0"; // Correct letter in correct place
      } else if (word.includes(char)) {
        className += " bg-yellow-500 text-white border-0"; // Correct letter in wrong place
      } else {
        className += " bg-gray-500 text-white border-0"; // Incorrect letter
      }

      tiles.push(
        // Animate the evaluation of the guess
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
          className={className}
        >
          {char}
        </motion.div>
      );
    }
    // Display the current guess as it is being typed out by the user
    if (!isEvaluated) {
      tiles.push(
        <div key={i} className={className}>
          {char}
        </div>
      );
    }
    console.log(tiles);
  }
  return <div className="grid grid-cols-5 gap-3">{tiles}</div>;
};

const Results = ({ className }: { className?: string }) => {
  return (
    <>
      <motion.ul
        className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
      >
        <motion.li className="text-xl font-semibold">Results</motion.li>
        <motion.li>Accurancy:</motion.li>
        <motion.li className="text-red-500">Errors:</motion.li>
        <motion.li>Typed:</motion.li>
      </motion.ul>
    </>
  );
};
