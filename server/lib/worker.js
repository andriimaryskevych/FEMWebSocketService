const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const FEM_DLL = path.resolve(__dirname, '../../../', 'FEM/FEM/bin/Debug/netcoreapp2.0/FEM.dll');

function task(socket, params){
    var femProcess = spawn(
        'dotnet',
        [
            FEM_DLL,
            ...params
        ]
    );

    femProcess.stdout.on('data', (data) => {
        console.log(data.toString());

        if (data.toString().indexOf('start.txt') != -1) {
            fs.readFile('./start.txt', 'utf8', (err, data) => {
                if (!err) {
                    socket.emit('start.txt', data);
                } else {
                    console.log('Error reading file start.txt');
                }
            });
        }

        if (data.toString().indexOf('points.txt') != -1) {
            fs.readFile('./points.txt', 'utf8', (err, data) => {
                if (!err) {
                    socket.emit('points.txt', data);
                } else {
                    console.log('Error reading file points.txt');
                }
            });
        }
    });

    femProcess.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    femProcess.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
}

module.exports = task;
