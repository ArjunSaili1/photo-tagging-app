import Gamescreen from "./components/Gamescreen";
import StartModal from "./components/StartModal";
import Header from "./components/Header";
import { CharactersContext } from "./context/CharactersContext";
import { UserContext } from "./context/UserContext";
import './App.css';
import { useState } from "react";

function App() {
  const [unfoundCharacters, setUnfoundCharacters] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  return (
    <div className="App">
      <CharactersContext.Provider value={{unfoundCharacters, setUnfoundCharacters}}>
        <Header/>
        <UserContext.Provider value={{userDoc, setUserDoc}}>
          <StartModal/>
          <Gamescreen userDoc={userDoc}/>
        </UserContext.Provider>
      </CharactersContext.Provider>
    </div>
  );
}

export default App;
