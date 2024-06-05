import { faker } from "@faker-js/faker";
import { RestartButton } from "./components/speed_typing/RestartButton";
import { Results } from "./components/speed_typing/Results";
import { UserTypings } from "./components/speed_typing/UserTypings";
import { Caret } from "./components/speed_typing/Caret";
import useEngine from "./hooks/speed_typing/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";
import cn from "classnames";
import Navbar from "./components/shared/Navbar";
import { HashRouter, Route, Routes } from "react-router-dom";
import SpeedTypePage from "./pages/SpeedTypePage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import WordlePage from "./pages/WordlePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/speedtype" element={<SpeedTypePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/wordle" element={<WordlePage />} />
      </Routes>
    </>
  );
};
export default App;
