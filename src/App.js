import React from "react";
import "./App.css";
import { ChatScreen } from "./components/ChatScreen/index.ts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatScreen />
      </header>
    </div>
  );
}

export default App;
