import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

let isAdmin = true;

const person = {
  id: 1,
  name: "Piyush Garg",
  age: 22,
  balance: 100,
};

const personProxy = new Proxy(person, {
  set: (obj, prop, value) => {
    if (prop === "name") {
      obj[prop] = value;
    } else {
      throw new Error("You can only change name property");
    }
  },
  get: (obj, prop) => {
    if (prop === "balance" && isAdmin) return obj[prop];
  },
});

function App() {
  const [state, setState] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{personProxy.id}</h1>
        <h1>{personProxy.name}</h1>
        <h1>{personProxy.balance}</h1>
        <button
          onClick={(e) => {
            personProxy.id = 2;
            setState((s) => s + 1);
          }}
        >
          Change
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
