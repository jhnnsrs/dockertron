



export const runPython = () => {

    const fs = window.require('fs');
    const path = window.require('path');

    const root = fs.readdirSync('/')
    const app = window.require('electron').remote.app

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
    console.log(root)
    console.log(path)
    console.log()
    const basepath = app.getAppPath()
    const joinedPath = path.join(basepath,'python')

    console.log(joinedPath)
    const city = 'XYZ';
    var options = {
        scriptPath : joinedPath,
        args : [city]
    }

    const {PythonShell} = window.require("python-shell");

    var shell = new PythonShell('run.py', options); //executes python script on python3

    shell.on('message', function(message) {
        console.log(message); //message is STD output of python script
    })

}

export const runDocker = () => {
    const fs = window.require('fs');
    const path = window.require('path');

    const app = window.require('electron').remote.app

    const basepath = app.getAppPath()
    const exec = window.require('child_process').exec;

    function execute(command, callback) {
        exec(command, (error, stdout, stderr) => {
            callback(stdout);
        });
    };


    const joinedPath = path.join(basepath,'python')

// call the function
    execute('cd "' + joinedPath +'" && docker-compose up', (output) => {
        console.log(output);
    });

}
