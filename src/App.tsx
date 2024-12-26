import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Moving from "./components/Moving";
import About from "./components/About";

import Projects from "./components/Projects";
import CanIBreathAgain from "./components/CanIBreathAgain";
import Overexposed from "./components/Overexposed";
import StrangerTourist from "./components/StrangerTourist";
import TheReturnOfTheProdigalSon from "./components/TheReturnOfTheProdigalSon";
import PainOfOthers from "./components/PainOfOthers";
import IveBeenThere from "./components/IveBeenThere";
import IFoundHome from "./components/IFoundHome";

import { DirectionProvider } from "../src/assets/DirectionContext";
import ReactGA from "react-ga4";

ReactGA.initialize("G-GKPZ9CHJYL");
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Fares Zaitoon | Cairo, Egypt";
  }, []);

  return (
    <DirectionProvider>
      <Router>
        <Flex direction="column" minHeight="100vh">
          <NavBar />

          {/* Main content */}
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/moving" element={<Moving />} />
              <Route path="/canibreath~" element={<CanIBreathAgain />} />
              <Route path="/ivebeenthere" element={<IveBeenThere />} />
              <Route path="/ifoundahome" element={<IFoundHome />} />
              <Route path="/overexposed" element={<Overexposed />} />
              <Route path="/painofothers" element={<PainOfOthers />} />
              <Route
                path="/thereturnof~"
                element={<TheReturnOfTheProdigalSon />}
              />
              <Route path="/strangertourist" element={<StrangerTourist />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </DirectionProvider>
  );
};

export default App;
