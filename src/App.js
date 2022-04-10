import Gamescreen from "./components/Gamescreen";
import StartModal from "./components/StartModal";
import Header from "./components/Header";
import WinScreen from "./components/WinScreen";
import Leaderboard from "./components/Leaderboard";
import { CharactersContext } from "./context/CharactersContext";
import { UserContext } from "./context/UserContext";
import { ShowLeaderboardContext } from "./context/ShowLeaderboardContext";
import './App.css';
import { useState } from "react";

function App() {
  const [unfoundCharacters, setUnfoundCharacters] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(null);
  const [showWinScreen, setShowWinScreen] = useState(false);

  return (
    <div className="App">
      <CharactersContext.Provider value={{unfoundCharacters, setUnfoundCharacters}}>
        <Header/>
        <UserContext.Provider value={{userDoc, setUserDoc}}>
          <ShowLeaderboardContext.Provider value={{setShowLeaderboard}}>
            <StartModal/>
            {showWinScreen ? <WinScreen setShowWinScreen={setShowWinScreen}/> : null}
          </ShowLeaderboardContext.Provider>
          <Gamescreen setShowWinScreen={setShowWinScreen}/>
          {showLeaderboard ? <Leaderboard/> : null}
        </UserContext.Provider>
      </CharactersContext.Provider>
    </div>
  );
}

export default App;
