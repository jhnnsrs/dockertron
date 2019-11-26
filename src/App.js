import React, {useState} from 'react';
import neuron from './neuron.svg';
import './App.css';
import {Button, Col, Jumbotron, Row, Container, ButtonGroup, Alert} from "reactstrap"
import {checkDir, killDocker, runDocker, runDockerFromDirectory, runPython} from "./Docker";
import Titlebar from "react-electron-titlebar";

function App() {

    const localdir = localStorage.getItem("dir")
    const [runEnv, setRunEnv] = useState(null)
    const [logOpen, setLogOpen] = useState(null)
    const [dir, setDir] = useState(localdir)
    const [dirLog, setDirLog] = useState(null)
    const [killEnv, setKillEnv] = useState(null)
    const [logOut, setLogOut] = useState(null)
    const [errorOut, setErrorOut] = useState(null)

  const runningLog = "The Jupyter Notebook is running at"

  const run = () => {
      const runEnv = runDocker(dir, setLogOut,setErrorOut)
      console.log("executed")
      setRunEnv(runEnv)

  }



  const kill = () => {
    if (runEnv) {
          runEnv.kill("SIGINT")
          setRunEnv(null)
            const killEnv = killDocker(dir)
            setKillEnv(killEnv)
    }

  }

    const handleInputChange = (files) => {
        console.log(files)
        const path = window.require('path');
        const dirname = path.dirname(files[0].path)
        localStorage.setItem("dir",dirname)
        setDir(dirname)
    }

    const openJupyter = () => {
        window.open("http://localhost:200", '_blank', 'nodeIntegration=no,frame=true,width=800,height=600')
    }


  return (<>
        <Titlebar/>
        <div className="App-header">
            <Row className="justify-content-center">
              <Col>
                <h2 className="text-white">NEURAL</h2>
              </Col>
            </Row>
            <Jumbotron className="wrap">
              <Row className="justify-content-center">
                <Col className="col-auto">
                  <img src={neuron} className="App-logo" alt="logo" />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="col-auto text-center ">
                    {runEnv && <>
                    Neural Instance is Running<br/>
                    </>}
                    {logOut && logOut.search(runningLog) && <>
                        <Button outline onClick={() => openJupyter()} color="warning"> Open Jupyter </Button>
                    </>
                    }

                </Col>
              </Row>
            </Jumbotron>
            {dir && <>
            {!runEnv ?
                <Button outline color="success" onClick={() => run()}>Run</Button> :
                <Button outline color="danger" onClick={() => kill() }>Kill</Button> }
                </>}
            {!dir && <>
                <div className="upload-btn-wrapper">
                    <Button outline>Open Module</Button>
                    <input id="myFile" name="myfile" type="file" webkitdirectory="true" onChange={(e) => handleInputChange(e.target.files)}/>
                </div>
            </>}
            <br/>
            <Row className="justify-content-center">
                <Col className="col-auto align-items-center">
                    {dir && <div className="text-center">
                        <p className="smalltext text-white">Serving from <br/> {dir}</p>
                        <ButtonGroup>
                        <Button outline size={"sm"} onClick={() => setDir(null)}> Swap </Button>
                        <Button  outline size={"sm"} onClick={() => setLogOpen(!logOpen)}>Toggle Log</Button>
                        </ButtonGroup>
                    </div>}

                </Col>
            </Row>
            { logOpen && <>
            {errorOut && <Alert color="danger">{errorOut}</Alert>}
                <h3> Logs </h3>
            {logOut && <span>{logOut}</span>}
            </>}

        </div>
    </>
  );
}

export default App;
