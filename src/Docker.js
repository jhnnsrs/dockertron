

export const runDockerOld = (logFunction, errorFunction) => {
    const fs = window.require('fs');
    const path = window.require('path');

    const dirname = window.__dirname


    const app = window.require('electron').remote.app

    const basepath = app.getAppPath()
    const spawn = window.require('child_process').spawn;

    function execute(command, args,callback, exit, error) {
        const runEnvironment = spawn("cmd", ['/c', ...command]);

        runEnvironment.stdout.on("data", (data) => callback(data))
        runEnvironment.stderr.on("data", (data) => error(data))
        runEnvironment.on("exit", (data) => exit(data))

        return runEnvironment
    };


    const joinedPath = path.join(basepath,'python')

// call the function
    const env = execute(['cd', joinedPath, "&&", "docker-compose", "up"], ["."], (output) => {
        console.log(output.toString());
        if (logFunction) logFunction(output.toString())
    }, (data) => {
        console.log("Start Docker Exited with" + data)
    }, data => {
        console.error(data.toString())
        if (errorFunction) errorFunction(data.toString())
    })

    console.log("REACHED HERE")

    return env
}

export const runDocker = (dir, logFunction, errorFunction) => {

    const dirname = dir

    const spawn = window.require('child_process').spawn;

    function execute(command, args,callback, exit, error) {
        const runEnvironment = spawn("cmd", ['/c', ...command]);

        runEnvironment.stdout.on("data", (data) => callback(data))
        runEnvironment.stderr.on("data", (data) => error(data))
        runEnvironment.on("exit", (data) => exit(data))

        return runEnvironment
    };


    const joinedPath = dirname

// call the function
    const env = execute(['cd', joinedPath, "&&", "docker-compose", "up"], ["."], (output) => {
        console.log(output.toString());
        if (logFunction) logFunction(output.toString())
    }, (data) => {
        console.log("Start Docker Exited with" + data)
    }, data => {
        console.error(data.toString())
        if (errorFunction) errorFunction(data.toString())
    })

    console.log("REACHED HERE")

    return env
}

export const checkDir = (dirFunc, dirLogFunc) => {
    const fs = window.require('fs');
    const path = window.require('path');

    const app = window.require('electron').remote.app

    const basepath = app.getAppPath()
    const spawn = window.require('child_process').spawn;

    function execute(command, args,callback, exit, error) {
        const runEnvironment = spawn("cmd", ['/c', ...command]);

        runEnvironment.stdout.on("data", (data) => callback(data))
        runEnvironment.stderr.on("data", (data) => error(data))
        runEnvironment.on("exit", (data) => exit(data))

        return runEnvironment
    };


    const joinedPath = path.join(basepath,'python')
    dirFunc(joinedPath)
// call the function
    const env = execute(['cd', joinedPath, "&&", "dir"], ["."], (output) => {
        console.log(output.toString());
        if (dirLogFunc) dirLogFunc(output.toString())
    }, (data) => {
        console.log("Start Docker Exited with" + data)
    }, data => {
        console.error(data.toString())
        if (dirLogFunc) dirLogFunc(data.toString())
    })

    console.log("REACHED HERE")

    return env
}


export const killDocker = (dir) => {

    const dirname = dir
    const spawn = window.require('child_process').spawn;

    function execute(command, args,callback, exit, error) {
        const runEnvironment = spawn("cmd", ['/c', ...command]);

        runEnvironment.stdout.on("data", (data) => callback(data))
        runEnvironment.stderr.on("data", (data) => error(data))
        runEnvironment.on("exit", (data) => exit(data))

        return runEnvironment
    };


    const joinedPath = dirname

// call the function
    const env = execute(['cd', joinedPath, "&&", "docker-compose", "kill"], ["."], (output) => {
        console.log(output.toString());
    }, (data) => {
        console.log("Kill Docker Exited with" + data)
    }, data => console.error(data.toString()))

    console.log("REACHED HERE")

    return env
}
