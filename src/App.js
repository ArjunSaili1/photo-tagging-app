import Gamescreen from "./components/Gamescreen";
import StartModal from "./components/StartModal";
import './App.css';
import { useState } from "react";

function App() {
  const [unfoundCharacters, setUnfoundCharacters] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  return (
    <div className="App">
      <StartModal setUnfoundCharacters={setUnfoundCharacters} setUserDoc={setUserDoc}/>
      <Gamescreen unfoundCharacters={unfoundCharacters} userDoc={userDoc} setUnfoundCharacters={setUnfoundCharacters}/>
    </div>
  );
}

export default App;
