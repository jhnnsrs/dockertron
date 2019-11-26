import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "reactstrap"
import {killDocker, runDocker, runPython} from "./Docker";

function App() {

  const [runEnv, setRunEnv] = useState(null)
  const [killEnv, setKillEnv] = useState(null)

  const run = () => {
      const runEnv = runDocker()
      console.log("executed")
      setRunEnv(runEnv)

  }

  const kill = () => {
    if (runEnv) {
      runEnv.kill("SIGINT")
      setRunEnv(null)
      const killEnv = killDocker()
    }

  }


  console.log(runEnv)

  return (
    <div className="App">
      <header className="App-header">
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
          {runEnv && "Running"}
        </a>
        <Button onClick={() => runPython()}>Button</Button>
        {!runEnv ? <Button onClick={() => run()}>Run</Button> : <Button onClick={() => kill() }>Kill</Button> }
      </header>
    </div>
  );
}

export default App;
