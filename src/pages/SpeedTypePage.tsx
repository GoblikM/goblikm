import { RestartButton } from "../components/speed_typing/RestartButton";
import { Results } from "../components/speed_typing/Results";
import { UserTypings } from "../components/speed_typing/UserTypings";
import useEngine from "../hooks/speed_typing/useEngine";
import { calculateAccuracyPercentage } from "../utils/helpers";
import cn from "classnames";
import Layout from "./Layout";
import { finished } from "stream";
import { MdTimelapse, MdTimer, MdTimer3 } from "react-icons/md";
import { RiDoubleQuotesL } from "react-icons/ri";
import { VscWholeWord } from "react-icons/vsc";

const SpeedTypePage = () => {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <>
      <Layout title="Speed typing game " className="tracking-wider">
        <div>
          <p className="mt-3 text-lg text-slate-500 text-center">
            Type the words as fast as you can.
          </p>
        </div>
        <div className="border rounded-lg  m-5 p-3">
          <ul className="flex flex-row justify-around">
            <li className="flex gap-3 text-primary-400">
              <MdTimer className="text-2xl" />
              <button className="hover:underline">30s</button>
              <button className="hover:underline">60s</button>
              <button className="hover:underline">120s</button>
            </li>
            <li className="flex gap-3 text-primary-400">
              <button className="hover:underline">
                <VscWholeWord className="inline-block mx-3 text-2xl" />
                Words
              </button>
              <button className="hover:underline">
                <RiDoubleQuotesL className="inline-block mx-3 text-2xl" />
                Quote
              </button>
            </li>
            <li className="flex gap-3 text-primary-400">
              <button className="hover:underline">30</button>
              <button className="hover:underline">60</button>
              <button className="hover:underline">120</button>
            </li>
          </ul>
        </div>

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
          <RestartButton
            className={"mx-auto mt-10 text-slate-500"}
            onRestart={restart}
          />
          <Results
            state={state}
            errors={errors}
            accurancyPercentage={calculateAccuracyPercentage(
              totalTyped,
              errors
            )}
            total={totalTyped}
            className={"mt-10"}
          />
        </div>
      </Layout>
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
        "relative max-w-4xl mt-3 text-3xl leading-relaxed break-all": true,
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

export default SpeedTypePage;
