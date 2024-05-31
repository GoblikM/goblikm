import { faker } from "@faker-js/faker";
import { RestartButton } from "./components/speed_typing/RestartButton";
import { Results } from "./components/speed_typing/Results";
import { UserTypings } from "./components/speed_typing/UserTypings";
import { Caret } from "./components/speed_typing/Caret";
import useEngine from "./hooks/speed_typing/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";
import cn from "classnames";

const App = () => {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div>
          <CountDownTimer timeLeft={timeLeft} />
          <WordsContainer state={state}>
            <GeneratedWords words={words} />
            <UserTypings
              className="absolute inset-0"
              words={words}
              userInput={typed}
            />
          </WordsContainer>
        </div>
        <RestartButton
          className={"mx-auto mt-10 text-slate-500"}
          onRestart={restart}
        />
        <Results
          state={state}
          errors={errors}
          accurancyPercentage={calculateAccuracyPercentage(totalTyped, errors)}
          total={totalTyped}
          className={"mt-10"}
        />
      </div>
    </>
  );
};

export const WordsContainer = ({
  children,
  state,
}: {
  children: React.ReactNode;
  state: string;
}) => {
  return (
    <div
      className={cn({
        "relative max-w-3xl mt-3 text-3xl leading-relaxed break-all": true,
        "blur-sm": state === "finish",
      })}
    >
      {children}
    </div>
  );
};

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className="text-slate-500">{words}</div>;
};

const CountDownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}s</h2>;
};

export default App;
