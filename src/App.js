import Gamescreen from "./components/Gamescreen";
import Header from "./components/Header";
import StartModal from "./components/StartModal";
import './App.css';
import { useState } from "react";

function App() {
  const [unfoundCharacters, setUnfoundCharacters] = useState(null);
  return (
    <div className="App">
      <Header/>
      <StartModal setUnfoundCharacters={setUnfoundCharacters}/>
      <Gamescreen unfoundCharacters={unfoundCharacters} setUnfoundCharacters={setUnfoundCharacters}/>
    </div>
  );
}

export default App;
