import { Caret } from "./Caret";
import cn from "classnames";

type Props = {
  className?: string;
  userInput: string;
  words: string;
};
export const UserTypings = ({ userInput, className, words }: Props) => {
  const typedCharacters = userInput.split("");
  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
          <Character
            key={`${char}_${index}`}
            actual={char}
            expected={words[index]}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhitespace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhitespace,
        "text-primary-400": isCorrect && !isWhitespace,
        "bg-red-500/50": !isCorrect && isWhitespace,
      })}
    >
      {expected}
    </span>
  );
};
